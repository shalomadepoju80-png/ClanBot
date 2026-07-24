export default {
  name: "eat",

  async execute(message, args) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("Mention someone to eat.");
    }

    await message.reply(`🍽️ ${message.author} ate ${user}!`);
  }
};
