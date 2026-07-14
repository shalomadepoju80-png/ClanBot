import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

import fs from "fs";

const config = JSON.parse(
  fs.readFileSync("./src/data/suggestionConfig.json")
);

const SUGGESTION_CHANNEL = config.channel;
export default {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Send a suggestion")
    .addStringOption(option =>
      option
        .setName("idea")
        .setDescription("Your suggestion")
        .setRequired(true)
    ),

  async execute(interaction) {
    const suggestion = interaction.options.getString("idea");

    const channel = interaction.guild.channels.cache.get(
      SUGGESTION_CHANNEL
    );

    if (!channel) {
      return interaction.reply({
        content: "Suggestion channel not found.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("💡 New Suggestion")
      .setDescription(suggestion)
      .addFields(
        {
          name: "Suggested By",
          value: `<@${interaction.user.id}>`
        },
        {
          name: "Status",
          value: "🟡 Pending"
        },
        {
          name: "Votes",
          value: "👍 0 | 👎 0"
        }
      )
      .setColor("Yellow")
      .setTimestamp();

    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("suggest_accept")
          .setLabel("Approve")
          .setEmoji("✅")
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId("suggest_deny")
          .setLabel("Deny")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Danger)
      );

    const msg = await channel.send({
      embeds: [embed],
      components: [buttons]
    });

    await msg.react("👍");
    await msg.react("👎");

    await interaction.reply({
      content: "✅ Suggestion submitted!",
      ephemeral: true
    });
  }
};
