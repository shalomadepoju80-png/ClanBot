import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fs from "fs";
import { addClanPoints } from "../../services/clanPoints.js";
const OWNER_ID = "1368313910943547413";

const bossFile = "./src/data/boss.json";

const bosses = [
    "Shadow Titan",
    "Frost Dragon",
    "Void King",
    "Inferno Beast",
    "Clan Destroyer"
];

function getBoss() {
    return JSON.parse(fs.readFileSync(bossFile));
}

function saveBoss(data) {
    fs.writeFileSync(bossFile, JSON.stringify(data, null, 4));
}

export default {
    data: new SlashCommandBuilder()
        .setName("boss")
        .setDescription("Clan Boss system")

        .addSubcommand(sub =>
            sub
            .setName("spawn")
            .setDescription("Spawn a clan boss")
        )

        .addSubcommand(sub =>
            sub
            .setName("attack")
            .setDescription("Attack the clan boss")
        )

        .addSubcommand(sub =>
            sub
            .setName("status")
            .setDescription("Check boss status")
        ),

    async execute(interaction) {

        const sub = interaction.options.getSubcommand();

        let boss = getBoss();


        // SPAWN
        if (sub === "spawn") {

            if (interaction.user.id !== OWNER_ID) {
                return interaction.reply({
                    content: "❌ Only the owner can spawn bosses!",
                    ephemeral: true
                });
            }


            if (boss.active) {
                return interaction.reply(
                    "⚠️ A boss is already active!"
                );
            }


            const name = bosses[Math.floor(Math.random() * bosses.length)];

            boss = {
                active: true,
                name,
                hp: 1000,
                maxHp: 1000,
                reward: 300,
                damage: {}
            };


            saveBoss(boss);


            const embed = new EmbedBuilder()
                .setTitle("⚔️ CLAN BOSS SPAWNED!")
                .setDescription(
                    `👹 **${name}**\n\n` +
                    `❤️ HP: **1000/1000**\n` +
                    `🏆 Reward: **300 Clan Points**\n\n` +
                    `Use \`/boss attack\` to fight!`
                )
                .setColor("Red");


            return interaction.reply({
                embeds:[embed]
            });
        }



        // STATUS
        if (sub === "status") {

            if (!boss.active) {
                return interaction.reply(
                    "❌ No boss is currently active."
                );
            }


            return interaction.reply(
                `👹 **${boss.name}**\n❤️ HP: ${boss.hp}/${boss.maxHp}`
            );
        }



        // ATTACK
        if (sub === "attack") {


            if (!boss.active) {
                return interaction.reply(
                    "❌ There is no boss to fight!"
                );
            }


            const damage = Math.floor(Math.random() * 100) + 25;


            boss.hp -= damage;


            boss.damage[interaction.user.id] =
                (boss.damage[interaction.user.id] || 0) + damage;



            if (boss.hp <= 0) {
                const newPoints = addClanPoints(
    interaction.guild.id,
    boss.reward
);


                boss.active = false;


                saveBoss(boss);


                return interaction.reply(
                    `🎉 **THE CLAN DEFEATED ${boss.name}!**\n\n` +
                    `🏆 Everyone earned **${boss.reward} Clan Points!**`
                );
            }


            saveBoss(boss);


            return interaction.reply(
                `⚔️ You attacked **${boss.name}**!\n\n`+
                `💥 Damage: **${damage}**\n`+
                `❤️ Boss HP: **${boss.hp}/${boss.maxHp}**`
            );

        }

    }
};
