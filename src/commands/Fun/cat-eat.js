import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";
import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  data: new SlashCommandBuilder()
    .setName("cat-eat")
    .setDescription("Use a cat to eat someone with Bug Points")
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


    if (points < 5) {
      return interaction.reply({
        content:
        `❌ You need **5 Bug Points**!\nYou have **${points} 🐛**`,
        ephemeral:true
      });
    }


    data[interaction.user.id] -= 5;


    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data,null,2)
    );


    const embed = new EmbedBuilder()
      .setTitle("🐱 CAT EAT")
      .setDescription(
        `🐱 *munch munch*\n\n` +
        `"mmm this person tasted yummy!"\n\n` +
        `${target} was chosen by ${interaction.user}`
      )
      .setColor("Orange")
      .addFields({
        name:"🐛 Bug Points Used",
        value:"5"
      });


    await interaction.reply({
      embeds:[embed]
    });

  }
};
