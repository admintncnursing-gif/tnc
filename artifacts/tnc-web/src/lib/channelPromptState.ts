export const CHANNEL_PROMPT_DAY_KEY = "tnc-channel-join-day";

export function getTodayDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function hasJoinedChannelToday(storage?: Storage | null): boolean {
  const store = storage ?? globalThis.localStorage;
  if (!store) return false;

  const joinedDay = store.getItem(CHANNEL_PROMPT_DAY_KEY);
  return joinedDay === getTodayDateKey();
}

export function markChannelJoinedToday(storage?: Storage | null): void {
  const store = storage ?? globalThis.localStorage;
  if (!store) return;

  store.setItem(CHANNEL_PROMPT_DAY_KEY, getTodayDateKey());
}
