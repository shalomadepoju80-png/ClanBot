import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

const OWNER_ID = "1368313910943547413";


export default {
  name: "interactionCreate",

  async execute(interaction) {

    if (!interaction.isButton()) return;


    if (
      ![
        "suggest_set_channel",
        "suggest_set_role",
        "suggest_view_config"
      ].includes(interaction.customId)
    ) return;


    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ Owner only.",
        ephemeral: true
      });
    }


    if (interaction.customId === "suggest_set_channel") {

      const modal = new ModalBuilder()
        .setCustomId("suggest_channel_modal")
        .setTitle("Set Suggestion Channel");


      const input = new TextInputBuilder()
        .setCustomId("channel_id")
        .setLabel("Channel ID")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("Example: 123456789012345678")
        .setRequired(true);


      modal.addComponents(
        new ActionRowBuilder().addComponents(input)
      );


      return interaction.showModal(modal);
    }



    if (interaction.customId === "suggest_set_role") {

      const modal = new ModalBuilder()
        .setCustomId("suggest_role_modal")
        .setTitle("Set Moderator Role");


      const input = new TextInputBuilder()
        .setCustomId("role_id")
        .setLabel("Role ID")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("Example: 123456789012345678")
        .setRequired(true);


      modal.addComponents(
        new ActionRowBuilder().addComponents(input)
      );


      return interaction.showModal(modal);
    }



    if (interaction.customId === "suggest_view_config") {

      return interaction.reply({
        content:
        "📋 Config is saved in suggestionConfig.json",
        ephemeral:true
      });

    }

  }
};
