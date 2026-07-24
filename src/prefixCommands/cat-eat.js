export default {
  name: "cat-eat",

  async execute(message, args) {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("Mention someone.");
    }

    await message.reply(`🐱 Cat ate ${user}! Mmm yummy!`);
  }
};
