import RoomImg from "../../assets/room3.png";
import Weather from "../weathers/Weather";

type Props = {
  weather: string
}

export default function Room({ weather }: Props) {
  return (
    <div className="relative w-full h-full overflow-hidden">

      <Weather weather={weather} />

      <img
        src={RoomImg}
        alt="room"
        className="absolute inset-0 w-full h-full object-cover object-left z-10 pointer-events-none"
      />

    </div>
  );
}