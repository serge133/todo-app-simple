export function future(
  weeks: number = 0,
  days: number = 0,
  hours: number = 0,
  minutes: number = 0
): Date {
  const weekMs = 6.048e8;
  const dayMs = 86400000;
  const hourMs = 3.6e6;
  const minuteMs = 60000;
  let ts = weekMs * weeks + dayMs * days + hourMs * hours + minuteMs * minutes;
  let now = +new Date();
  let fts = now + ts;
  return new Date(fts);
}

// Careful this function may cause differences between client and server,
// next will throw an error
export function randomCatchphrase(): string {
  const phrases = [
    "Start the day strong",
    "Work harder, there's nothing here >:(",
    "PUT SOME TASKS ONTO HERE",
    '"The measure of intelligence is the ability to change" -Albert Einstein.',
    "“Learn as if you will live forever, live like you will die tomorrow.” — Mahatma Gandhi",
  ];

  const randIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randIndex];
}

export function calcDaysTillDue(dueMS: number): number {
  const todayMS: number = +new Date();
  return Math.ceil((dueMS - todayMS) / 86400000);
}
