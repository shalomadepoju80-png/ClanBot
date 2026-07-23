import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("iq")
    .setDescription("Check your IQ using Bug Points"),

  async execute(interaction) {

    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(
        fs.readFileSync(DATA_FILE, "utf8")
      );
    }

    const userId = interaction.user.id;
    const points = data[userId] || 0;

    const cost = 1;

    if (points < cost) {
      return interaction.reply({
        content: `❌ You need ${cost} 🐛 Bug Point to check your IQ. You have ${points}.`,
        ephemeral: true
      });
    }

    data[userId] = points - cost;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    const iq = Math.floor(Math.random() * 100) + 1;

    await interaction.reply(
      `🧠 Your IQ is **${iq}**!\n🐛 1 Bug Point was used.`
    );
  }
};
