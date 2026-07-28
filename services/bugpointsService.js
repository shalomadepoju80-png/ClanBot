import fs from "fs";

const DATA_FILE = "./src/data/bugpoints.json";

function loadBugpoints() {
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveBugpoints(data) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(data, null, 2)
  );
}

export function getBugpoints(userId) {
  const data = loadBugpoints();
  return data[userId] || 0;
}

export function addBugpoints(userId, amount) {
  const data = loadBugpoints();

  data[userId] = (data[userId] || 0) + amount;

  saveBugpoints(data);

  return data[userId];
}

export function removeBugpoints(userId, amount) {
  const data = loadBugpoints();

  data[userId] = Math.max(
    0,
    (data[userId] || 0) - amount
  );

  saveBugpoints(data);

  return data[userId];
}
