const clanPoints = new Map();

export function getClanPoints(guildId) {
    return clanPoints.get(guildId) || 0;
}

export function addClanPoints(guildId, amount) {
    const current = getClanPoints(guildId);
    const total = current + amount;

    clanPoints.set(guildId, total);

    return total;
}

export function removeClanPoints(guildId, amount) {
    const current = getClanPoints(guildId);
    const total = Math.max(0, current - amount);

    clanPoints.set(guildId, total);

    return total;
}
