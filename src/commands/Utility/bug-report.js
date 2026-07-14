import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

export default {
  prefix: false,

  data: new SlashCommandBuilder()
  
    .setName("bug-report")
    .setDescription("Report a bug with ClanBot"),
supportsPrefixExecution: false,
  async execute(interaction) {

  if (!interaction.isChatInputCommand()) return;

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

  modal.addComponents(
    new ActionRowBuilder().addComponents(title),
    new ActionRowBuilder().addComponents(description),
    new ActionRowBuilder().addComponents(steps)
  );

  await interaction.showModal(modal);
  }
