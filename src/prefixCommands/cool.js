export default {
  name: "cool",

  async execute(message) {
    await message.reply(`😎 ${message.author} is cool!`);
  }
};
