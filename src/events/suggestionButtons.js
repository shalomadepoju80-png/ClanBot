import { EmbedBuilder } from "discord.js";

const MOD_ROLE = "1520638224987324456";
const OWNER_ID = "1368313910943547413";

export default {
  name: "interactionCreate",

  async execute(interaction) {

    if (!interaction.isButton()) return;

    if (
      interaction.customId !== "suggest_accept" &&
      interaction.customId !== "suggest_deny"
    ) return;


    const member = interaction.member;

    if (
      !member.roles.cache.has(MOD_ROLE) &&
      interaction.user.id !== OWNER_ID
    ) {
      return interaction.reply({
        content: "❌ You do not have permission to manage suggestions.",
        ephemeral: true
      });
    }


    const embed = EmbedBuilder.from(
      interaction.message.embeds[0]
    );


    if (interaction.customId === "suggest_accept") {

      embed
        .setColor("Green")
        .spliceFields(1,1,{
          name:"Status",
          value:"✅ Approved"
        });

    }


    if (interaction.customId === "suggest_deny") {

      embed
        .setColor("Red")
        .spliceFields(1,1,{
          name:"Status",
          value:"❌ Denied"
        });

    }


    await interaction.message.edit({
      embeds:[embed],
      components:[]
    });


    await interaction.reply({
      content:"Suggestion updated!",
      ephemeral:true
    });

  }
};
