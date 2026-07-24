import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  name: "cat-eat",

  async execute(message) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[message.author.id] || 0;

    if (points < 5) {
      return message.reply("❌ You need 5 Bug Points to use this!");
    }

    data[message.author.id] = points - 5;

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    const user = message.mentions.users.first() || message.author;

    message.reply(`🐱🍴 Cat ate ${user}! (-5 🐛 Bug Points)`);
  }
};
