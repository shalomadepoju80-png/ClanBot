import {
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";

import { getFromDb, setInDb } from "../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("bugpoints-shop")
    .setDescription("Spend your Bug Points"),

  async execute(interaction) {

    const key = `bugpoints:${interaction.user.id}`;
    const points = await getFromDb(key, 0);

    const embed = new EmbedBuilder()
      .setTitle("🐛 Bug Points Shop")
      .setColor("Green")
      .setDescription(
        `You have **${points} Bug Points**\n\n` +
        "🎁 **Rewards**\n" +
        "1 BP → IQ / High / Cool\n" +
        "3 BP → Skip\n" +
        "4 BP → Eat\n" +
        "5 BP → Cat Eat"
      );

    await interaction.reply({
      embeds: [embed]
    });
  }
};
