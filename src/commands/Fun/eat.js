import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("eat")
    .setDescription("Eat someone using Bug Points")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("Who gets eaten?")
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


    if (points < 4) {
      return interaction.reply({
        content:
        `❌ You need **4 Bug Points**!\nYou have **${points} 🐛**`,
        ephemeral: true
      });
    }


    data[interaction.user.id] -= 4;


    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );


    const embed = new EmbedBuilder()
      .setTitle("🍽️ EAT ACTIVATED")
      .setDescription(
        `🍴 *nom nom*\n\n` +
        `${target} was eaten by ${interaction.user}!\n\n` +
        `Enjoy your meal 😎`
      )
      .setColor("Red")
      .addFields({
        name: "🐛 Bug Points Used",
        value: "4"
      });


    await interaction.reply({
      embeds: [embed]
    });

  }
};
