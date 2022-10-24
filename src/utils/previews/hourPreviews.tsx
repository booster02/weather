import {getCurrentTime} from "../time/addHours";
import {getDegreeDay, getDegreeHour} from "./getDegree";
import {getStatusHour} from "./getStatus";
import {getTimeDaily, getTimeHourly} from "./getTime";
import {WeatherStatus} from "../GetWeatherType";

export interface hourly {
    weathercode: number[];
    temperature_2m: number[];
    time: string[];
}

export interface previewData {
    weatherData: {
        degree: number
        status: WeatherStatus;
        time: string;
    };
    clicked: boolean;
}

export function getHourPreviews(hourly: hourly, date = getCurrentTime(0)) {

    let previewData: previewData[] = [];
    let currentTimeRounded = date.substring(0, 13) + ":00";
    let hours = parseInt(currentTimeRounded.substring(11, 13));
    let maxIterations = 23 - hours;
    for (let i = 0; i <= maxIterations; i++) {
        let temperatureIndex = hourly.time.indexOf(currentTimeRounded) + i;
        let degree = getDegreeHour(hourly.temperature_2m, temperatureIndex);
        let status = getStatusHour(hourly.weathercode, temperatureIndex);
        let time = getTimeHourly(date, i - 2);
        let weatherData = {degree, status, time};
        let clicked = false;
        previewData.push({weatherData, clicked})
    }
    return previewData;
}

interface daily {
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    time: string[];
}

export function getDayPreviews(daily: daily, clickedIndex = -1) {
    let previewData: previewData[] = [];
    let date = new Date(getCurrentTime(0));
    let currentTimeRounded = date.toISOString().substring(0, 14) + ":00";
    for (let i = 1; i <= 7; i++) {
        let temperatureIndex = daily.time.indexOf(currentTimeRounded) + i;
        let degree = getDegreeDay(daily.temperature_2m_min, daily.temperature_2m_max, temperatureIndex);
        let status = WeatherStatus.NONE;
        let time = getTimeDaily(i - 1);
        let weatherData = {degree, status, time};
        let clicked = (i - 1) === clickedIndex;
        previewData.push({weatherData, clicked})
    }
    return previewData;
}