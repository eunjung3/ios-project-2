import Sunny from './SunnyWeather'
import Rain from './RainWeather'
import Cloud from './CloudWeather'
import Sunset from './SunsetWeather'

type Props = {
  weather: string
}

export default function Weather({ weather }: Props) {
  return (
    <div className="absolute inset-0 z-0">
      {weather === 'sunny' && <Sunny />}
      {weather === 'rain' && <Rain />}
      {weather === 'cloud' && <Cloud />}
      {weather === 'sunset' && <Sunset />}
    </div>
  )
}