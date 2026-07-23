import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fs from "fs";

const SHOP_FILE = "./src/data/shop.json";

export default {
  data: new SlashCommandBuilder()
    .setName("bugshop")
    .setDescription("View the Bug Point shop"),

  async execute(interaction) {

    const shop = JSON.parse(
      fs.readFileSync(SHOP_FILE, "utf8")
    );

    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Point Shop")
      .setColor("Green")
      .setDescription(
        Object.entries(shop)
          .map(([name, item]) =>
            `**${name}** - ${item.cost} 🐛\n${item.description}`
          )
          .join("\n\n")
      );

    await interaction.reply({
      embeds: [embed]
    });
  }
};
