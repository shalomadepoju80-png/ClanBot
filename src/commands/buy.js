import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";
const SHOP_FILE = "./src/data/shop.json";

export default {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy something with Bug Points")
    .addStringOption(option =>
      option
        .setName("item")
        .setDescription("Item to buy")
        .setRequired(true)
    ),

  async execute(interaction) {

    const itemName = interaction.options.getString("item");

    const shop = JSON.parse(
      fs.readFileSync(SHOP_FILE, "utf8")
    );

    if (!shop[itemName]) {
      return interaction.reply({
        content: "❌ That item does not exist!",
        ephemeral: true
      });
    }

    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(
        fs.readFileSync(DATA_FILE, "utf8")
      );
    }

    const userId = interaction.user.id;
    const points = data[userId] || 0;

    const cost = shop[itemName].cost;

    if (points < cost) {
      return interaction.reply({
        content: `❌ You need ${cost} 🐛 Bug Points. You have ${points}.`,
        ephemeral: true
      });
    }

    data[userId] = points - cost;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    await interaction.reply(
      `✅ You bought **${itemName}** for ${cost} 🐛 Bug Points!`
    );
  }
};
