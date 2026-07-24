import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("eat")
    .setDescription("Spend 4 Bug Points to eat someone")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Who to eat")
        .setRequired(true)
    ),

  async execute(interaction) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[interaction.user.id] || 0;

    if (points < 4) {
      return interaction.reply({
        content: "❌ You need 4 Bug Points.",
        ephemeral: true
      });
    }

    const user = interaction.options.getUser("user");

    data[interaction.user.id] -= 4;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    await interaction.reply(
      `🍽️ ${interaction.user} ate ${user}! (-4 🐛 Bug Points)`
    );
  }
};
