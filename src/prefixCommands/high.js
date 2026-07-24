export default {
  name: "high",

  async execute(message) {
    await message.reply(`⬆️ ${message.author} is feeling high!`);
  }
};
