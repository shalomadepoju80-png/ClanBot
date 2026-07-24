import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

const BUG_CHANNEL = "1530293905755602955";
const OWNER_ID = "1300196895167217777";

export default {
  name: "interactionCreate",

  async execute(interaction) {

    // ==========================
    // BUG REPORT MODAL
    // ==========================
    if (interaction.isModalSubmit()) {

      if (interaction.customId !== "bug_report_modal")
        return;


      const title =
        interaction.fields.getTextInputValue("bug_title");

      const description =
        interaction.fields.getTextInputValue("bug_description");

      const steps =
        interaction.fields.getTextInputValue("bug_steps");

      const proof =
        interaction.fields.getTextInputValue("bug_proof") ||
        "No proof provided";


      const channel =
        interaction.guild.channels.cache.get(BUG_CHANNEL);


      if (!channel) {
        return interaction.reply({
          content: "❌ Bug report channel not found.",
          ephemeral: true
        });
      }


      const embed = new EmbedBuilder()
        .setTitle("🐛 New Bug Report")
        .setColor("Red")
        .addFields(
          {
            name: "👤 Reported By",
            value: `<@${interaction.user.id}>`
          },
          {
            name: "🐞 Bug",
            value: title
          },
          {
            name: "📝 Description",
            value: description
          },
          {
            name: "🔁 Steps",
            value: steps
          },
          {
            name: "📸 Proof",
            value: proof
          },
          {
            name: "📌 Status",
            value: "🟡 Pending"
          }
        )
        .setTimestamp();


      const buttons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("bug_approve")
            .setLabel("Approve")
            .setStyle(ButtonStyle.Success),

          new ButtonBuilder()
            .setCustomId("bug_deny")
            .setLabel("Deny")
            .setStyle(ButtonStyle.Danger)
        );


      await channel.send({
        embeds: [embed],
        components: [buttons]
      });


      return interaction.reply({
        content: "✅ Bug report submitted! Thanks for helping improve ClanBot 🐛",
        ephemeral: true
      });
    }


    // ==========================
    // APPROVE / DENY BUTTONS
    // ==========================
    if (interaction.isButton()) {

      if (
        interaction.customId !== "bug_approve" &&
        interaction.customId !== "bug_deny"
      ) return;


      // OWNER ONLY
      if (interaction.user.id !== OWNER_ID) {
        return interaction.reply({
          content: "❌ Only the owner can approve or deny bug reports.",
          ephemeral: true
        });
      }


      const embed =
        EmbedBuilder.from(interaction.message.embeds[0]);


      const statusIndex =
        embed.data.fields.findIndex(
          field => field.name === "📌 Status"
        );


      if (interaction.customId === "bug_approve") {

        embed.setColor("Green");

        if (statusIndex !== -1) {
          embed.data.fields[statusIndex] = {
            name: "📌 Status",
            value: `✅ Approved by <@${interaction.user.id}>`
          };
        }

      }


      if (interaction.customId === "bug_deny") {

        embed.setColor("Grey");

        if (statusIndex !== -1) {
          embed.data.fields[statusIndex] = {
            name: "📌 Status",
            value: `❌ Denied by <@${interaction.user.id}>`
          };
        }

      }


      await interaction.message.edit({
        embeds: [embed],
        components: []
      });


      return interaction.reply({
        content: "✅ Bug report updated.",
        ephemeral: true
      });
    }

  }
};
