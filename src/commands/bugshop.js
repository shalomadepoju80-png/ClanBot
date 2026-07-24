import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("bugshop")
    .setDescription("View the Bug Point shop"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Point Shop")
      .setColor("Green")
      .setDescription(
        "**1 🐛 BP** → IQ / High / Cool\n\n" +
        "**3 🐛 BP** → Skip\n\n" +
        "**4 🐛 BP** → Eat\n\n" +
        "**5 🐛 BP** → Cat Eat"
      )
      .setFooter({ text: "Use /buy to purchase rewards" });

    await interaction.reply({
      embeds: [embed]
    });
  }
};
