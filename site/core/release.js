export function isReleased(unlockAt, now = new Date()) {
  return now.valueOf() >= new Date(unlockAt).valueOf();
}

export function releasedIds(missions, now = new Date()) {
  return missions.filter((mission) => isReleased(mission.unlockAt, now)).map((mission) => mission.id);
}
