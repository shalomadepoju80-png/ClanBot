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


    const title = new TextInputBuilder()
      .setCustomId("bug_title")
      .setLabel("Bug Title")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Example: /suggest is broken")
      .setRequired(true);


    const description = new TextInputBuilder()
      .setCustomId("bug_description")
      .setLabel("Describe the bug")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("What happened?")
      .setRequired(true);


    const steps = new TextInputBuilder()
      .setCustomId("bug_steps")
      .setLabel("Steps to reproduce")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("How can we recreate it?")
      .setRequired(true);


    const proof = new TextInputBuilder()
      .setCustomId("bug_proof")
      .setLabel("Proof (image/link)")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Optional")
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
