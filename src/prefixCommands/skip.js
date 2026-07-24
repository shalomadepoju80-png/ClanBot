import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  name: "skip",

  async execute(message) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[message.author.id] || 0;

    if (points < 3) {
      return message.reply("❌ You need 3 Bug Points to use this!");
    }

    data[message.author.id] = points - 3;

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    message.reply(`⏭️ ${message.author} skipped! (-3 🐛 Bug Points)`);
  }
};
