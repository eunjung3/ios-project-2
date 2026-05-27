import RoomImg from "../../assets/room3.png";
import type { WeatherKey } from "../../types/weather";
import Weather from "../weathers/Weather";

type Props = {
  weatherKey: WeatherKey;
}

export default function Room({ weatherKey }: Props) {
  return (
    <div className="relative w-full h-full overflow-hidden">

      <Weather weather={weatherKey} />

      <img
        src={RoomImg}
        alt="room"
        className="absolute inset-0 w-full h-full object-cover object-left z-10 pointer-events-none"
      />

    </div>
  );
}