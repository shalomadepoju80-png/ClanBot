import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

export default {
  prefix: false,
supportsPrefixExecution: false,
  data: new SlashCommandBuilder()
    .setName("bugreport")
    .setDescription("Report a bug"),

  async execute(interaction) {

    const modal = new ModalBuilder()
      .setCustomId("bug_report_modal")
      .setTitle("🐛 Bug Report");

    const title = new TextInputBuilder()
      .setCustomId("bug_title")
      .setLabel("Bug Title")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const description = new TextInputBuilder()
      .setCustomId("bug_description")
      .setLabel("Describe the bug")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const steps = new TextInputBuilder()
      .setCustomId("bug_steps")
      .setLabel("Steps to reproduce")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const proof = new TextInputBuilder()
      .setCustomId("bug_proof")
      .setLabel("Proof (optional)")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    modal.addComponents(
      new ActionRowBuilder().addComponents(title),
      new ActionRowBuilder().addComponents(description),
      new ActionRowBuilder().addComponents(steps),
      new ActionRowBuilder().addComponents(proof)
    );

    await interaction.showModal(modal);
  }
};
