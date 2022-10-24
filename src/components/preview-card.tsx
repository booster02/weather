import React from "react";
import {WeatherStatus} from "../utils/GetWeatherType";

export interface PreviewCardProps {
    degree: number;
    time: string;
    status?: WeatherStatus;
    onClick: (index: number) => void;
    clicked: boolean;
    index: number;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({degree, time, status = "", onClick, clicked, index}) => {
    return (
        <button className={clicked? "previewCard currentDay": "previewCard"} id={time} onClick={() => {
            onClick(index);
        }}>
            <span className="time">{time}</span>
            <span className="degreePreview">{degree}°</span>
            <span className="statusPreview">{status}</span>
        </button>)
}