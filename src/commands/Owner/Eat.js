import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const DATA_FILE = new URL("../../data/bugpoints.json", import.meta.url);

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
  JSON.stringify(data, null, 2),
  "utf8"
);
console.log("FILE LOCATION:", DATA_FILE);
console.log("NEW DATA:", data);
console.log("SAVED:", data);

    await interaction.reply(
      `🍽️ ${interaction.user} ate ${user}! (-4 🐛 Bug Points)`
    );
  }
};
