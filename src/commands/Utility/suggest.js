import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} from "discord.js";

const SUGGESTION_CHANNEL = "1526425747718144183";
const MOD_ROLE = "1520638224987324456";
const OWNER_ID = "1368313910943547413";

export default {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Send a suggestion to the server")
    .addStringOption(option =>
      option
        .setName("idea")
        .setDescription("Your suggestion")
        .setRequired(true)
    ),

  async execute(interaction) {
    const suggestion = interaction.options.getString("idea");

    const channel = interaction.guild.channels.cache.get(
      SUGGESTION_CHANNEL
    );

    if (!channel) {
      return interaction.reply({
        content: "Suggestion channel not found.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("💡 New Suggestion")
      .setDescription(suggestion)
      .addFields(
        {
          name: "Suggested By",
          value: `<@${interaction.user.id}>`
        },
        {
          name: "Votes",
          value: "👍 0 | 👎 0"
        }
      )
      .setColor("Blue")
      .setTimestamp();

    const msg = await channel.send({
      embeds: [embed]
    });

    await msg.react("👍");
    await msg.react("👎");

    await interaction.reply({
      content: "Your suggestion has been submitted!",
      ephemeral: true
    });
  }
};
