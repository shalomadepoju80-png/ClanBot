import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

const OWNER_ID = "1368313910943547413";

export default {
  data: new SlashCommandBuilder()
    .setName("suggest-config")
    .setDescription("Configure the suggestion system"),

  async execute(interaction) {

    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ Only the bot owner can use this command.",
        ephemeral: true
      });
    }


    const embed = new EmbedBuilder()
      .setTitle("💡 Suggestion System Config")
      .setDescription(
        "Use the buttons below to manage the suggestion system."
      )
      .addFields(
        {
          name:"📌 Suggestion Channel",
          value:"Not set"
        },
        {
          name:"🛡️ Moderator Role",
          value:"Not set"
        }
      )
      .setColor("Blue");


    const buttons = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId("suggest_set_channel")
          .setLabel("Set Channel")
          .setEmoji("📌")
          .setStyle(ButtonStyle.Primary),


        new ButtonBuilder()
          .setCustomId("suggest_set_role")
          .setLabel("Set Mod Role")
          .setEmoji("🛡️")
          .setStyle(ButtonStyle.Primary),


        new ButtonBuilder()
          .setCustomId("suggest_view_config")
          .setLabel("View Config")
          .setEmoji("📋")
          .setStyle(ButtonStyle.Secondary)

      );


    await interaction.reply({
      embeds:[embed],
      components:[buttons],
      ephemeral:true
    });

  }
};
