export default {
  name: "skip",

  async execute(message, args) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("Mention someone to skip.");
    }

    await message.reply(`⏭️ ${user} was skipped!`);
  }
};
