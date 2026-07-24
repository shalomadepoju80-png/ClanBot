export default {
  name: "iq",

  async execute(message) {
    await message.reply(`🧠 ${message.author} has 100 IQ!`);
  }
};
