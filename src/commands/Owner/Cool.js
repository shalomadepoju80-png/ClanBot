import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("cool")
    .setDescription("Spend 1 Bug Point to become cool"),

  async execute(interaction) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[interaction.user.id] || 0;

    if (points < 1) {
      return interaction.reply({
        content: "❌ You need 1 Bug Point.",
        ephemeral: true
      });
    }

    data[interaction.user.id] -= 1;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    await interaction.reply(
      `😎 ${interaction.user} is now cool! (-1 🐛 Bug Point)`
    );
  }
};
