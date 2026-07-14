import { SlashCommandBuilder } from "discord.js";
import { removeClanPoints, getClanPoints } from "../../services/clanPoints.js";
import { addClanPoints, removeClanPoints, getClanPoints } from "../../services/clanPoints.js";
const OWNER_ID = "1368313910943547413";

export default {
    data: new SlashCommandBuilder()
        .setName("clanpoints")
        .setDescription("Manage clan points")

        .addSubcommand(sub =>
            sub
                .setName("remove")
                .setDescription("Remove clan points (Owner only)")
                .addIntegerOption(option =>
                    option
                        .setName("amount")
                        .setDescription("Amount of points to remove")
                        .setRequired(true)
                )
        )

        .addSubcommand(sub =>
            sub
                .setName("check")
                .setDescription("Check clan points")
        ),

    async execute(interaction) {

        const sub = interaction.options.getSubcommand();

        if (sub === "remove") {

            if (interaction.user.id !== OWNER_ID) {
                return interaction.reply({
                    content: "❌ Only the owner can remove clan points!",
                    ephemeral: true
                });
            }

            const amount = interaction.options.getInteger("amount");

            const newPoints = removeClanPoints(
                interaction.guild.id,
                amount
            );

            return interaction.reply(
                `🗑️ Removed **${amount} Clan Points**!\n` +
                `💎 New Clan Points: **${newPoints}**`
            );
        }


        if (sub === "check") {

            const points = getClanPoints(
                interaction.guild.id
            );

            return interaction.reply(
                `🏆 Clan Points: **${points}**`
            );
        }
    }
};
.addSubcommand(sub =>
    sub
        .setName("add")
        .setDescription("Add clan points (Owner only)")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Amount of points to add")
                .setRequired(true)
        )
)
