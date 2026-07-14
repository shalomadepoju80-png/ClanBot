import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("bug-report")
    .setDescription("Report a bug with ClanBot"),

  async execute(interaction) {

    const modal = new ModalBuilder()
      .setCustomId("bug_report_modal")
      .setTitle("🐛 Bug Report");

    // your inputs here...

    await interaction.showModal(modal);
  }
};
