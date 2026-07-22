import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { addClanPoints } from "../../services/clanPoints.js";

const OWNER_ID = "1300196895167217777";

export default {
    data: new SlashCommandBuilder()
        .setName("addclanpoints")
        .setDescription("Add ClanPoints to the server")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Amount of points to add")
                .setRequired(true)
        ),

    async execute(interaction) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ Only the bot owner can use this command.",
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger("amount");

        const total = addClanPoints(
            interaction.guild.id,
            amount
        );

        const embed = new EmbedBuilder()
            .setTitle("🏰 ClanPoints Added")
            .setDescription(
                `Added **${amount.toLocaleString()} CP**\n\n` +
                `Current Total:\n**${total.toLocaleString()} CP**`
            )
            .setColor("Blue");

        await interaction.reply({
            embeds: [embed]
        });
    }
};
