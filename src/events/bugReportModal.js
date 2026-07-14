import {
  EmbedBuilder
} from "discord.js";


const BUG_CHANNEL = "1526445006246908125";


export default {
  name: "interactionCreate",

  async execute(interaction) {

    if (!interaction.isModalSubmit()) return;

    if (interaction.customId !== "bug_report_modal")
      return;


    const title =
      interaction.fields.getTextInputValue(
        "bug_title"
      );

    const description =
      interaction.fields.getTextInputValue(
        "bug_description"
      );

    const steps =
      interaction.fields.getTextInputValue(
        "bug_steps"
      );

    const proof =
      interaction.fields.getTextInputValue(
        "bug_proof"
      ) || "No proof provided";


    const channel =
      interaction.guild.channels.cache.get(
        BUG_CHANNEL
      );


    if (!channel) {
      return interaction.reply({
        content:
        "❌ Bug report channel not found.",
        ephemeral:true
      });
    }


    const embed = new EmbedBuilder()
      .setTitle("🐛 New Bug Report")
      .setColor("Red")
      .addFields(
        {
          name:"👤 Reported By",
          value:`<@${interaction.user.id}>`
        },
        {
          name:"🐞 Bug",
          value:title
        },
        {
          name:"📝 Description",
          value:description
        },
        {
          name:"🔁 Steps",
          value:steps
        },
        {
          name:"📸 Proof",
          value:proof
        },
        {
          name:"Status",
          value:"🟡 Pending"
        }
      )
      .setTimestamp();


    await channel.send({
      embeds:[embed]
    });


    await interaction.reply({
      content:
      "✅ Bug report submitted! Thanks for helping improve ClanBot 🐛",
      ephemeral:true
    });

  }
};
