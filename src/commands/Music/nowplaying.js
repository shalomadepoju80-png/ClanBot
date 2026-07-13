import { SlashCommandBuilder } from 'discord.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';
import { buildNowPlayingReply } from '../../services/music/musicActions.js';
import { deferMusicCommand } from '../../services/music/prefixSupport.js';

export default {
    category: 'Music',
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show the currently playing track'),

    async execute(interaction, config, client) {
    if (interaction.user.id !== "1368313910943547413") {
        return interaction.reply({
            content: "❌ Only the bot owner can pause music.",
            ephemeral: true
        });
    }

    await deferMusicCommand(interaction);
    const payload = buildNowPlayingReply(client, interaction.guild.id);
    await InteractionHelper.safeEditReply(interaction, payload);
},
