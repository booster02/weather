import {PreviewCard} from "./preview-card";
import React, {useEffect, useState} from "react";
import {previewData} from "../utils/previews/hourPreviews";


interface nextHoursProps {
    previewData: previewData[] | null;
    castType: CastType;
    headline: string;
    changePreviewIndex: (day: string) => void;
}

export enum CastType {
    HOURLY = "hourly",
    DAILY = "daily",
    FULLDAY = "fullday"
}

export const ForeCast: React.FC<nextHoursProps> = ({
                                                       castType,
                                                       previewData,
                                                       changePreviewIndex,
                                                       headline
                                                   }) => {
    const [cards, setCards] = useState(previewData);
    useEffect(() => {
        setCards(previewData)
    }, [previewData])

    const onClick = castType === CastType.DAILY && cards ? (index: number) => {
        let newCards = [...cards]
        let unclick = false;
        newCards = newCards.map((card, i) => {
            if (index === i && card.clicked) {
                card.clicked = false;
                changePreviewIndex("1970-00-00");
                unclick = true;
            } else {
                card.clicked = index === i;
            }
            return card;
        })
        if (unclick) return;
        setCards(newCards);
        const day = "2022-" + cards[index].weatherData.time.substring(3, 5) + "-" + cards[index].weatherData.time.substring(0, 2) + "T00:00";
        changePreviewIndex(day);
    } : () => {
    }

    if (!previewData || !cards) {
        return null
    }
    return (
        <>
            <h2>{headline}</h2>
            <div
                className={castType === CastType.HOURLY ? "nextHours" : castType === CastType.FULLDAY ? "fullDay" : "nextDays"}>
                {
                    cards.map((data, index) => <PreviewCard key={`nextDays ${index}`} degree={data.weatherData.degree}
                                                            time={data.weatherData.time}
                                                            status={data.weatherData.status} index={index} onClick={onClick}
                                                            clicked={data.clicked}/>
                    )
                }
            </div>
        </>
    );
}