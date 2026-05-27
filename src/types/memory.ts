// import type { ObjectSlotKey } from "./object";
// import type { MoodKey, WeatherKey } from "./weather";

import type { WeatherKey } from "./weather";

// 개인 방에 남기는 하루 기록입니다.
// 기록 하나가 날씨와 오브젝트 하나로 방 안에 표현됩니다.
// src/types/memory.ts
export type Memory = {
    id: string;
    memoryDate: string;
    createdAt: string;
    title?: string;   // ⭐ 중요
    content: string;
    weatherKey: WeatherKey;
};