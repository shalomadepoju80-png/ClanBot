import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";
import fs from "fs";

const OWNER_ID = "1368313910943547413";
const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("bugpoints")
    .setDescription("Manage Bug Points")

    .addSubcommand(sub =>
      sub
        .setName("give")
        .setDescription("Give Bug Points to someone")
        .addUserOption(option =>
          option
            .setName("user")
            .setDescription("User to give points to")
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName("amount")
            .setDescription("Amount of Bug Points")
            .setRequired(true)
        )
    ),


  async execute(interaction) {

    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ Only the owner can use this command.",
        ephemeral: true
      });
    }


    const user =
      interaction.options.getUser("user");

    const amount =
      interaction.options.getInteger("amount");


    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(
        fs.readFileSync(DATA_FILE)
      );
    }


    data[user.id] =
      (data[user.id] || 0) + amount;


    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );


    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Points Awarded")
      .setColor("Green")
      .addFields(
        {
          name:"👤 User",
          value:`<@${user.id}>`
        },
        {
          name:"➕ Added",
          value:`${amount} Bug Points`
        },
        {
          name:"💰 New Balance",
          value:`${data[user.id]} Bug Points`
        },
        {
          name:"Given By",
          value:"👑 Owner"
        }
      );


    await interaction.reply({
      embeds:[embed]
    });

  }
};
