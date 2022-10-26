import {PreviewCard} from "./preview-card";
import React, {useEffect, useRef, useState} from "react";
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
    const containerRef = useRef<HTMLDivElement>(null);
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

    enum Directions {
        BACK,
        FORWARD
    }

    function scrollCards(direction: Directions) {
        if (!containerRef.current) return
        let left = direction === Directions.BACK ? -312: 312;
        if (castType === CastType.DAILY) {
            left = direction === Directions.BACK ? -162: 162;
        }
        containerRef.current.scrollBy({
            left: left,
            behavior: 'smooth'
        });
    }

    if (!previewData || !cards) {
        return null;
    }

    return (
        <>
            <h2>{headline}</h2>
            <div
                ref={containerRef}
                className={castType === CastType.HOURLY ? "nextHours" : castType === CastType.FULLDAY ? "fullDay" : "nextDays"}>
                {
                    cards.map((data, index) => <PreviewCard key={`nextDays ${index}`} degree={data.weatherData.degree}
                                                            time={data.weatherData.time}
                                                            status={data.weatherData.status} index={index}
                                                            onClick={onClick}
                                                            clicked={data.clicked}/>
                    )
                }
            </div>

                <div className="arrows">
                    <img width="10px" height="10px" alt="arrow left" src="./assets/icons/leftArrow.svg" className="navButton backward" onClick={() => scrollCards(Directions.BACK)}/>
                    <img width="10px" height="10px" alt="arrow right" src="./assets/icons/rightArrow.svg" className="navButton forward" onClick={() => scrollCards(Directions.FORWARD)} />
                </div>
        </>
    );
}
