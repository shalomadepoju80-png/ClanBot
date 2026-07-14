const OWNER_ID = "1368313910943547413";


export default {
  name:"interactionCreate",

  async execute(interaction){

    if(!interaction.isButton()) return;


    if(
      ![
        "suggest_set_channel",
        "suggest_set_role",
        "suggest_view_config"
      ].includes(interaction.customId)
    ) return;


    if(interaction.user.id !== OWNER_ID){
      return interaction.reply({
        content:"❌ Owner only.",
        ephemeral:true
      });
    }


    if(interaction.customId === "suggest_set_channel"){

      await interaction.reply({
        content:
        "📌 Send the channel ID you want suggestions sent to.",
        ephemeral:true
      });

    }


    if(interaction.customId === "suggest_set_role"){

      await interaction.reply({
        content:
        "🛡️ Send the moderator role ID.",
        ephemeral:true
      });

    }


    if(interaction.customId === "suggest_view_config"){

      await interaction.reply({
        content:
        "📋 Current config:\nChannel: Not saved yet\nRole: Not saved yet",
        ephemeral:true
      });

    }

  }
};
