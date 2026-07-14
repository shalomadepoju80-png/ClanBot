import { EmbedBuilder } from "discord.js";

const OWNER_ID = "1368313910943547413";

export default {
  name: "messageReactionAdd",

  async execute(reaction, user) {
    if (user.bot) return;

    if (
      reaction.emoji.name !== "👍" &&
      reaction.emoji.name !== "👎"
    ) return;

    const message = reaction.message;

    if (!message.embeds[0]) return;

    const embed = EmbedBuilder.from(message.embeds[0]);

    let upvotes = reaction.message.reactions.cache.get("👍")?.count - 1 || 0;
    let downvotes = reaction.message.reactions.cache.get("👎")?.count - 1 || 0;

    let ownerVote = "";

    if (user.id === OWNER_ID) {
      ownerVote = "\n\n👑 Owner Vote (×2)";
    }

    embed.spliceFields(1, 1, {
      name: "Votes",
      value: `👍 ${upvotes} | 👎 ${downvotes}${ownerVote}`
    });

    await message.edit({
      embeds: [embed]
    });
  }
};
