import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("bugpoints")
    .setDescription("Check your Bug Points"),

  async execute(interaction) {

    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(
        fs.readFileSync(DATA_FILE)
      );
    }

    const points = data[interaction.user.id] || 0;


    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Points")
      .setColor("Green")
      .addFields(
        {
          name: "👤 User",
          value: `<@${interaction.user.id}>`
        },
        {
          name: "💰 Balance",
          value: `${points} Bug Points`
        },
        {
          name: "🎁 Rewards",
          value:
          "1 BP → IQ / High / Cool\n" +
          "3 BP → Skip\n" +
          "4 BP → Eat\n" +
          "5 BP → Cat Eat"
        }
      )
      .setTimestamp();


    await interaction.reply({
      embeds: [embed]
    });

  }
};
