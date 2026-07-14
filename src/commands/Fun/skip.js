import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip someone using Bug Points")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Who gets skipped?")
        .setRequired(true)
    ),

  async execute(interaction) {

    const target =
      interaction.options.getUser("user");

    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(
        fs.readFileSync(DATA_FILE)
      );
    }

    const points =
      data[interaction.user.id] || 0;


    if (points < 3) {
      return interaction.reply({
        content:
          `❌ You need **3 Bug Points**!\nYou have **${points} 🐛**`,
        ephemeral: true
      });
    }


    data[interaction.user.id] -= 3;


    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );


    const embed = new EmbedBuilder()
      .setTitle("⏭️ SKIP ACTIVATED")
      .setDescription(
        `🏃 ${target} has been skipped!\n\n` +
        `Lucky escape 😭\n\n` +
        `Used by ${interaction.user}`
      )
      .setColor("Yellow")
      .addFields({
        name: "🐛 Bug Points Used",
        value: "3"
      });


    await interaction.reply({
      embeds: [embed]
    });

  }
};
