import React from "react";
import {WeatherStatus} from "../utils/GetWeatherType";

interface MainPreviewProps {
    degree: number;
    status: WeatherStatus;
}
export const MainPreview: React.FC<MainPreviewProps> = ({degree, status}) => {
    return (
        <div className="weather_now">
            <div className="degree">{degree}°</div>
            <div className="status">{status}°</div>
        </div>
    )
}