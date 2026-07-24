import { getFromDb, setInDb } from "../utils/database.js";

export async function getBugPoints(userId) {
  return Number(await getFromDb(`bugpoints_${userId}`)) || 0;
}

export async function setBugPoints(userId, amount) {
  await setInDb(`bugpoints_${userId}`, amount);
}
