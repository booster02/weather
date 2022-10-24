export enum WeatherType{
    SUN="sun",
    CLOUDY = "cloudy",
    MIST = "mist",
    RAIN = "rain",
    FREEZING_RAIN = "freezing-rain",
    SNOW = "snow",
    STORM = "storm",
    NONE = ""
}

export function getWeatherType(code: number) {
    switch (code) {
        case 0:
            return WeatherType.SUN;
        case 1:
        case 2:
        case 3:
            return WeatherType.CLOUDY;
        case 45:
        case 48:
            return WeatherType.MIST;
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 80:
            return WeatherType.RAIN;
        case 56:
        case 57:
        case 66:
        case 67:
        case 77:
        case 85:
        case 86:
            return WeatherType.FREEZING_RAIN;
        case 71:
        case 73:
        case 75:
            return WeatherType.SNOW;
        case 95:
        case 96:
        case 99:
            return WeatherType.STORM;
        default:
            return WeatherType.NONE;
    }
}

export enum WeatherStatus{
    KLAR = "Klar",
    BEWOELKT = "Bewölkt",
    NEBEL = "Nebel",
    SPRUEHREGEN = "Sprühregen",
    GEFRIERENDER_SPRUEHREGEN = "Gefrierender-Sprühregen",
    REGEN = "Regen",
    GEFRIERENDER_REGEN = "Gefrierender-Regen",
    SCHNEE = "Schnee",
    GRIESEL = "Griesel",
    SCHAUER = "Schauer",
    SCHNEESCHAUER = "Schneeschauer",
    STURM = "Sturm",
    HAGELSTURM = "Hagelsturm",
    NONE = ""
}
export function getWeatherStatus(weatherCode: number) {
    switch (weatherCode) {
        case 0:
            return WeatherStatus.KLAR;
        case 1:
        case 2:
        case 3:
            return WeatherStatus.BEWOELKT;
        case 45:
        case 48:
            return WeatherStatus.NEBEL;
        case 51:
        case 53:
        case 55:
            return WeatherStatus.SPRUEHREGEN;
        case 56:
        case 57:
            return WeatherStatus.GEFRIERENDER_SPRUEHREGEN;
        case 61:
        case 63:
        case 65:
            return WeatherStatus.REGEN;
        case 66:
        case 67:
            return WeatherStatus.GEFRIERENDER_REGEN;
        case 71:
        case 73:
        case 75:
            return WeatherStatus.SCHNEE;
        case 77:
            return WeatherStatus.GRIESEL;
        case 80:
        case 81:
        case 82:
            return WeatherStatus.SCHAUER;
        case 85:
        case 86:
            return WeatherStatus.SCHNEESCHAUER;
        case 95:
            return WeatherStatus.STURM;
        case 96:
        case 99:
            return WeatherStatus.HAGELSTURM;
        default:
            return WeatherStatus.NONE;
    }
}