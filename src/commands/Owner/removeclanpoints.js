import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { removeClanPoints } from "../../services/clanPoints.js";

const OWNER_ID = "1300196895167217777";

export default {
    data: new SlashCommandBuilder()
        .setName("removeclanpoints")
        .setDescription("Remove ClanPoints from the server")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Amount of ClanPoints to remove")
                .setRequired(true)
        ),

    async execute(interaction) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ Only the ClanBot owner can use this command.",
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger("amount");

        const total = removeClanPoints(
            interaction.guild.id,
            amount
        );

        const embed = new EmbedBuilder()
            .setTitle("🏰 ClanPoints Removed")
            .setDescription(
                `Removed **${amount.toLocaleString()} CP**\n\n` +
                `Current Total:\n**${total.toLocaleString()} CP**`
            )
            .setColor("Red");

        await interaction.reply({
            embeds: [embed]
        });
    }
};
