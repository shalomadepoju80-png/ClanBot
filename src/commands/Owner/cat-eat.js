import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("cat-eat")
    .setDescription("Spend 5 Bug Points for Cat Eat")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Who the cat eats")
        .setRequired(true)
    ),

  async execute(interaction) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[interaction.user.id] || 0;

    if (points < 5) {
      return interaction.reply({
        content: "❌ You need 5 Bug Points.",
        ephemeral: true
      });
    }

    const user = interaction.options.getUser("user");

    data[interaction.user.id] -= 5;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    await interaction.reply(
      `🐱 ${user} got cat eaten! Mmm this person tasted yummy! (-5 🐛 Bug Points)`
    );
  }
};
