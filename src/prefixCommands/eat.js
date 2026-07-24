import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  name: "eat",

  async execute(message) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[message.author.id] || 0;

    if (points < 4) {
      return message.reply("❌ You need 4 Bug Points to use this!");
    }

    data[message.author.id] = points - 4;

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    const user = message.mentions.users.first() || message.author;

    message.reply(`🍽️ ${message.author} ate ${user}! (-4 🐛 Bug Points)`);
  }
};
