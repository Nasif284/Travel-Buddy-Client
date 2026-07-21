import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react";

export function WeatherIcon({ code, isDay }: { code: number; isDay: boolean }) {
  const className = "w-10 h-10 text-[#005440]";

  switch (code) {
    case 0:
      return isDay ? <Sun className={className} /> : <Moon className={className} />;

    case 1:
    case 2:
      return isDay ? <CloudSun className={className} /> : <CloudMoon className={className} />;

    case 3:
      return <Cloud className={className} />;

    case 45:
    case 48:
      return <CloudFog className={className} />;

    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return <CloudRain className={className} />;

    case 71:
    case 73:
    case 75:
      return <CloudSnow className={className} />;

    case 95:
    case 96:
    case 99:
      return <CloudLightning className={className} />;

    default:
      return isDay ? <CloudSun className={className} /> : <CloudMoon className={className} />;
  }
}
