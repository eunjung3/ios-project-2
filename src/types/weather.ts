export type WeatherKey = "sunny" | "rain" | "cloud" | "sunset";

export type MoodKey = WeatherKey;

// 날씨 하나가 화면 색감, 창밖 색, 안내 문구까지 함께 결정합니다.
export type WeatherTone = {
    key: WeatherKey;
    label: string;
    icon: string;
    description: string;
    wall: string;
    wallTop: string;
    floor: string;
    windowTop: string;
    windowBottom: string;
    accent: string;
    quietText: string;
};