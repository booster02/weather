import React from "react";
import {MainHeadline} from "./main-headline";
import {MainPreview} from "./main-preview";
import {WeatherStatus} from "../utils/GetWeatherType";

interface MainPartProps {
    currentTime: string;
    hourly: {
        temperature_2m: number[]; weathercode: number[]; time: string[];
    }
    getWeatherStatus(weathercode: number): WeatherStatus;

    getIconURL(code: number): string
}

export const MainPart: React.FC<MainPartProps> = ({hourly, currentTime, getWeatherStatus, getIconURL}) => {
    let hourIndex = hourly.time.indexOf(currentTime.substring(0, 14) + "00");
    let formattedTime = currentTime.substring(8, 10) + "." + currentTime.substring(5, 7) + "., " + currentTime.substring(11, 16);
    return (<div className="firstPart">
        <MainHeadline getIconURL={getIconURL} index={hourly.weathercode[hourIndex]}/>
        <div className="date">{formattedTime}</div>
        <MainPreview degree={hourly.temperature_2m[hourIndex]}
                     status={getWeatherStatus(hourly.weathercode[hourIndex])}/>
    </div>)
}