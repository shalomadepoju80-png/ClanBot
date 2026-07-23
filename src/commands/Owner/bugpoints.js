
    import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";
import fs from "fs";

const OWNER_ID = "1300196895167217777";
const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("bugpoints-give")
    .setDescription("Give Bug Points to a user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to give points")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Amount of Bug Points")
        .setRequired(true)
        .setMinValue(1)
    ),

  async execute(interaction) {

    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ Owner only.",
        ephemeral: true
      });
    }

    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE));
    }

    data[user.id] = (data[user.id] || 0) + amount;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Points Added")
      .setColor("Green")
      .addFields(
        {
          name: "👤 User",
          value: `<@${user.id}>`
        },
        {
          name: "➕ Added",
          value: `${amount} BP`
        },
        {
          name: "💰 New Balance",
          value: `${data[user.id]} BP`
        }
      );

    interaction.reply({
      embeds: [embed]
    });
  }
};
