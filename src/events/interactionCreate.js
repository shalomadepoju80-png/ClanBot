import { Events } from 'discord.js';
import { logger } from '../utils/logger.js';
import { handleInteractionError, createError, ErrorTypes } from '../utils/errorHandler.js';
import { InteractionHelper } from '../utils/interactionHelper.js';
import { createInteractionTraceContext, runWithTraceContext } from '../utils/logger.js';
import { isCollectorManagedComponent } from '../utils/collectorComponents.js';
import { ResponseCoordinator } from '../utils/responseCoordinator.js';

function withTraceContext(context = {}, traceContext = {}) {
  return {
    traceId: traceContext.traceId,
    guildId: context.guildId || traceContext.guildId,
    userId: context.userId || traceContext.userId,
    command: context.commandName || traceContext.command,
    ...context
  };
}

export default {
  name: Events.InteractionCreate,

  async execute(interaction, client) {
    const traceContext = createInteractionTraceContext(interaction);

    return runWithTraceContext(traceContext, async () => {
      try {
        InteractionHelper.patchInteractionResponses(interaction);
        ResponseCoordinator.attach(interaction);

        // Slash commands
        if (interaction.isChatInputCommand()) {
          const command = client.commands.get(interaction.commandName);

          if (!command) {
            throw createError(
              `Command not found: ${interaction.commandName}`,
              ErrorTypes.CONFIGURATION,
              'Command not found.'
            );
          }

          try {
            await command.execute(interaction, null, client);
          } catch (error) {
            await handleInteractionError(
              interaction,
              error,
              withTraceContext({
                type: 'command',
                commandName: interaction.commandName
              }, traceContext)
            );
          }

          return;
        }


        // Autocomplete
        if (interaction.isAutocomplete()) {
          const command = client.commands.get(interaction.commandName);

          if (command?.autocomplete) {
            try {
              await command.autocomplete(interaction, client);
            } catch (error) {
              logger.error('Autocomplete error:', error);
              await interaction.respond([]).catch(() => {});
            }
          }

          return;
        }


        // Buttons
        if (interaction.isButton()) {
          const [customId, ...args] = interaction.customId.split(':');

          const button = client.buttons.get(customId);

          if (!button) {
            if (isCollectorManagedComponent(customId)) return;

            throw createError(
              `Button missing: ${customId}`,
              ErrorTypes.CONFIGURATION,
              'Button unavailable.'
            );
          }

          try {
            await button.execute(interaction, client, args);
          } catch (error) {
            await handleInteractionError(
              interaction,
              error,
              withTraceContext({
                type: 'button',
                customId
              }, traceContext)
            );
          }

          return;
        }


        // Select menus
        if (interaction.isStringSelectMenu()) {
          const [customId, ...args] = interaction.customId.split(':');

          const menu = client.selectMenus.get(customId);

          if (!menu) {
            if (isCollectorManagedComponent(customId)) return;

            throw createError(
              `Select menu missing: ${customId}`,
              ErrorTypes.CONFIGURATION,
              'Menu unavailable.'
            );
          }

          try {
            await menu.execute(interaction, client, args);
          } catch (error) {
            await handleInteractionError(
              interaction,
              error,
              withTraceContext({
                type: 'select',
                customId
              }, traceContext)
            );
          }

          return;
        }


        // Modals
        if (interaction.isModalSubmit()) {
          const [customId, ...args] = interaction.customId.split(':');

          const modal = client.modals.get(customId);

          if (!modal) {
            return;
          }

          try {
            await modal.execute(interaction, client, args);
          } catch (error) {
            await handleInteractionError(
              interaction,
              error,
              withTraceContext({
                type: 'modal',
                customId
              }, traceContext)
            );
          }

          return;
        }


      } catch (error) {

        logger.error('Unhandled interaction error:', {
          error,
          interaction: interaction.id,
          customId: interaction.customId,
          command: interaction.commandName
        });

        try {
          await handleInteractionError(
            interaction,
            error,
            withTraceContext({
              type: 'interaction'
            }, traceContext)
          );
        } catch {}
      }
    });
  }
};
