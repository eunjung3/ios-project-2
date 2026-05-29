import RoomImg from "../../assets/room3-clean.png";
import { WEATHER_BY_KEY } from "../../constants/weather";
import type { WeatherKey } from "../../types/weather";
import FurnitureBookshelf from "../../assets/furniture-modular/furniture-plant.png";
import FurnitureBook from "../../assets/furniture-modular/furniture-books.png";
import Furnitureframe from "../../assets/furniture-modular/furniture-frame.png";
import Weather from "../weathers/Weather";

type Props = {
  weatherKey: WeatherKey;
}

const ROOM_FILTER_BY_WEATHER: Record<WeatherKey, string> = {
  sunny: "saturate(1.08) brightness(1.04) contrast(1.02)",
  rain: "saturate(0.78) brightness(0.88) contrast(1.05)",
  cloud: "saturate(0.72) brightness(0.94) contrast(0.98)",
  sunset: "saturate(1.14) brightness(0.96) sepia(0.18) contrast(1.05)",
  night: "saturate(0.72) brightness(0.7) contrast(1.1) hue-rotate(8deg)",
  dawn: "saturate(0.9) brightness(0.9) sepia(0.08) contrast(1.02)",
};

const ROOM_TINT_OPACITY_BY_WEATHER: Record<WeatherKey, number> = {
  sunny: 0.18,
  rain: 0.34,
  cloud: 0.28,
  sunset: 0.36,
  night: 0.42,
  dawn: 0.3,
};

export default function Room({ weatherKey }: Props) {
  const weatherTone = WEATHER_BY_KEY[weatherKey];

  return (
    <div
      className="relative w-full h-full overflow-hidden transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, ${weatherTone.wallTop}, ${weatherTone.wall})`,
      }}
    >

      <Weather weather={weatherKey} />

      <img
        src={RoomImg}
        alt="room"
        className="absolute inset-0 w-full h-full object-cover object-left z-10 pointer-events-none transition-[filter] duration-500"
        style={{
          filter: ROOM_FILTER_BY_WEATHER[weatherKey],
        }}
      />

      <img
        src={FurnitureBookshelf}
        alt=""
        className="absolute bottom-[170px] right-[496px] z-[15] w-[80px] pointer-events-none transition-[filter] duration-500"
        style={{
          filter: ROOM_FILTER_BY_WEATHER[weatherKey],
        }}
      />

      <img
        src={FurnitureBook}
        alt=""
        className="absolute bottom-[170px] right-[766px] z-[15] w-[80px] pointer-events-none transition-[filter] duration-500"
        style={{
          filter: ROOM_FILTER_BY_WEATHER[weatherKey],
        }}
      />

      <img
        src={Furnitureframe}
        alt=""
        className="absolute bottom-[170px] right-[336px] z-[15] w-[80px] pointer-events-none transition-[filter] duration-500"
        style={{
          filter: ROOM_FILTER_BY_WEATHER[weatherKey],
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(circle at 58% 20%, ${weatherTone.accent}55, transparent 34%),
            linear-gradient(180deg, ${weatherTone.windowTop}55 0%, transparent 44%, ${weatherTone.floor}44 100%)
          `,
          mixBlendMode: "soft-light",
          opacity: ROOM_TINT_OPACITY_BY_WEATHER[weatherKey],
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
        style={{
          background: weatherTone.windowBottom,
          mixBlendMode: weatherKey === "sunny" || weatherKey === "dawn" ? "overlay" : "multiply",
          opacity: weatherKey === "sunny" ? 0.06 : weatherKey === "night" ? 0.18 : 0.12,
        }}
      />

    </div>
  );
}
