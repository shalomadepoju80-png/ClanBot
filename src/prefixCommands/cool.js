import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

export default {
  name: "cool",

  async execute(message) {
    let data = {};

    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }

    const points = data[message.author.id] || 0;

    if (points < 1) {
      return message.reply("❌ You need 1 Bug Point to use this!");
    }

    data[message.author.id] = points - 1;

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(data, null, 2)
    );

    message.reply(`😎 ${message.author} is cool! (-1 🐛 Bug Point)`);
  }
};
