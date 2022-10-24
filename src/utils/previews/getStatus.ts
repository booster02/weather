import {getWeatherStatus} from "../GetWeatherType";

export function getStatusHour(weatherCodesHourly: number[], weatherIndex: number){
    return getWeatherStatus(weatherCodesHourly[weatherIndex]);
}
