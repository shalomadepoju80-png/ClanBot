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
import { EmbedBuilder } from "discord.js";

const BUG_CHANNEL = "1526445006246908125";

export default {
  name: "interactionCreate",

  async execute(interaction) {

    if (!interaction.isModalSubmit()) return;

    if (interaction.customId !== "bug_report_modal") return;


    const title = interaction.fields.getTextInputValue("bug_title");
    const description = interaction.fields.getTextInputValue("bug_description");
    const steps = interaction.fields.getTextInputValue("bug_steps");
    const proof = interaction.fields.getTextInputValue("bug_proof") || "None";


    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Report")
      .setColor("Red")
      .addFields(
        {
          name: "Title",
          value: title
        },
        {
          name: "Description",
          value: description
        },
        {
          name: "Steps",
          value: steps
        },
        {
          name: "Proof",
          value: proof
        },
        {
          name: "Reporter",
          value: `${interaction.user.tag}`
        }
      )
      .setTimestamp();


    const channel = interaction.guild.channels.cache.get(BUG_CHANNEL);

    if (!channel) {
      return interaction.reply({
        content: "❌ Bug channel not found.",
        ephemeral: true
      });
    }


    await channel.send({
      embeds: [embed]
    });


    await interaction.reply({
      content: "✅ Bug report submitted!",
      ephemeral: true
    });

  }
};
