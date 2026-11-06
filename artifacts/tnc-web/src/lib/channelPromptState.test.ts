import test from "node:test";
import assert from "node:assert/strict";

import {
  CHANNEL_PROMPT_DAY_KEY,
  getTodayDateKey,
  hasJoinedChannelToday,
  markChannelJoinedToday,
} from "./channelPromptState.ts";

test("channel prompt shows once per day and resets the next day", () => {
  const map = new Map<string, string>();
  const storage = {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => {
      map.clear();
    },
    key: (index: number) => Array.from(map.keys())[index] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;

  const today = getTodayDateKey();

  assert.equal(hasJoinedChannelToday(storage), false);
  markChannelJoinedToday(storage);
  assert.equal(map.get(CHANNEL_PROMPT_DAY_KEY), today);
  assert.equal(hasJoinedChannelToday(storage), true);

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  map.set(CHANNEL_PROMPT_DAY_KEY, tomorrow.toISOString().slice(0, 10));
  assert.equal(hasJoinedChannelToday(storage), false);
});
