import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getClanPoints } from "../../services/clanPoints.js";

export default {
    data: new SlashCommandBuilder()
        .setName("clanpoints")
        .setDescription("View your server ClanPoints"),

    async execute(interaction) {

        const points = getClanPoints(
            interaction.guild.id
        );

        const embed = new EmbedBuilder()
            .setTitle("🏰 ClanPoints")
            .setDescription(
                `Current ClanPoints:\n\n` +
                `⭐ **${points.toLocaleString()} CP**`
            )
            .setColor("Gold");

        await interaction.reply({
            embeds: [embed]
        });
    }
};
