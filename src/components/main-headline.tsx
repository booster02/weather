import React from "react";

interface MainHeadlineProps {
    getIconURL(code: number): string;
    index: number;
}


export const MainHeadline:React.FC<MainHeadlineProps> = ({getIconURL, index}) => {
    let iconPath = getIconURL(index);
    return (
        <header className="header" id="header">
            <img src={iconPath} className="icon" id="weatherIcon" alt="weatherIcon"/>
            <h1 className="headline">Wetter</h1>
        </header>
    )
}