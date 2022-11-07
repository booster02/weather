import React, {useEffect, useState} from 'react';
import './App.css';
import "./components/fore-cast"
import {MainPart} from "./components/main-part";
import {CastType, ForeCast} from "./components/fore-cast";
import {useFetch, useFetchLocation} from "./utils/Hooks/useFetch";
import useLocation from "./utils/Hooks/useLocation";
import {getBackgroundGradient, getWeatherStatus, getWeatherType, WeatherType} from "./utils/GetWeatherType";
import {useInterval} from "./utils/Hooks/useInterval"
import {timeZoneOffset} from "./utils/constant";
import {addHours} from "./utils/time/addHours";
import {getDayPreviews, getHourPreviews, previewData} from "./utils/previews/hourPreviews";
import {getDayFromDate, getDayFromString} from "./utils/time/formatTime";
import {LocationBar} from "./components/location-bar";
import useDebounce from "./utils/Hooks/useDebounce";

interface previewsData {
    previewData: previewData[];
    headline: string;
}

function App() {
    const [currentTimeExact, setCurrentTimeExact] = useState(addHours(timeZoneOffset).toISOString().substring(0, 19));
    const [previewIndex, setPreviewIndex] = useState<number>(-1);
    const [previewDataDay, setPreviewDataDay] = useState<previewsData | null>(null);
    const [previewDataWeek, setPreviewDataWeek] = useState<previewsData | null>();
    const currentTime = currentTimeExact.substring(0, 16);
    const [currentCoords, setCoords] = useLocation(["52.520008", "13.404954"]);
    const [currentCity, setCurrentCity] = useState<string | null>(null);
    const url = currentCoords && `https://api.open-meteo.com/v1/forecast?latitude=${currentCoords[0]}&longitude=${currentCoords[1]}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=Europe%2FBerlin`;
    const [inputCity, setInputCity] = useState("");
    const [locationURL] = useDebounce(`https://geocoding-api.open-meteo.com/v1/search?name=${inputCity}&count=5`, 300);
    const locations = useFetchLocation(locationURL);
    const allData = useFetch(url);

    useEffect(() => {
        if (previewIndex === -1 || allData === null) {
            setPreviewDataDay(null)
        } else if (allData != null) {
            const newPreviewData = getHourPreviews(allData.hourly, allData.hourly.time[previewIndex]);
            setPreviewDataDay({
                previewData: newPreviewData,
                headline: getDayFromString(allData.hourly.time[previewIndex]) + " - Ganzer Tag"
            });
        }
    }, [previewIndex, allData])

    useEffect(() => {
        if (previewIndex === -1 && allData != null) {
            setPreviewDataWeek({previewData: getDayPreviews(allData.daily), headline: "Diese Woche"})
        }
    }, [previewIndex, allData])

    useInterval(() => setCurrentTimeExact(addHours(timeZoneOffset + 1 / (60), new Date(currentTime)).toISOString().substring(0, 19)), 60000)


    function getIconURL(code: number) {
        let weatherType = getWeatherType(code);
        weatherType = weatherType === WeatherType.FREEZING_RAIN ? WeatherType.RAIN : weatherType;

        return `./assets/icons/${weatherType}.svg`;
    }

    function getBackgroundUrl(code: number) {
        let weatherType = getWeatherType(code)
        weatherType = weatherType === WeatherType.FREEZING_RAIN ? WeatherType.RAIN : weatherType;
        return `url(./assets/backgrounds/${weatherType}.webp)`;
        //return `url(./assets/backgrounds/stormy.webp)`;
    }

    function getBackgroundLayover(code: number) {
        let weatherType = getWeatherType(code);
        return getBackgroundGradient(weatherType);
        //return getBackgroundGradient(WeatherType.MIST);
    }

    function roundTime(currentTime: string) {
        return currentTime.substring(0, 14) + "00";
    }

    function changePreviewIndex(day: string) {
        let index = allData ? allData.hourly.time.indexOf(day) : 0;
        setPreviewIndex(index);
    }

    getDayFromDate(new Date(Date.now()))
    if (!allData) return <div className="loader-wrapper">
        <div className="loader"/>
    </div>
    const timeIndex = allData.hourly.time.indexOf(roundTime(currentTime));
    const backgroundUrl = getBackgroundUrl(allData.hourly.weathercode[timeIndex]);
    const backgroundGradient = getBackgroundLayover(allData.hourly.weathercode[timeIndex]);
    const backgroundColorArray = backgroundGradient.split(" ");
    const backgroundColor = backgroundColorArray[backgroundColorArray.length-1].slice(0, -1);

    return (<div className="app "
                 style={{backgroundImage: backgroundUrl}}>
        <div className="firstHalf">
            <MainPart currentTime={currentTime} getWeatherStatus={getWeatherStatus} hourly={allData.hourly}
                      getIconURL={getIconURL}/>
        </div>
        <div style={{backgroundImage: backgroundGradient}}>
            <LocationBar setLocationInput={setInputCity} cities={locations} setCurrentCoords={setCoords}
                         setCity={setCurrentCity} currentCity={currentCity}/>
        </div>
        <div className="secondHalf"
             style={{backgroundColor: backgroundColor}}>
            <ForeCast key="1" castType={CastType.HOURLY} previewData={getHourPreviews(allData.hourly)}
                      changePreviewIndex={changePreviewIndex} headline="Rest des Tages"/>
            <ForeCast key="2" castType={CastType.DAILY}
                      previewData={previewDataWeek ? previewDataWeek.previewData : null}
                      changePreviewIndex={changePreviewIndex}
                      headline={previewDataWeek ? previewDataWeek.headline : ""}/>
            <ForeCast key="3" previewData={previewDataDay ? previewDataDay.previewData : null}
                      castType={CastType.FULLDAY}
                      changePreviewIndex={changePreviewIndex} headline={previewDataDay ? previewDataDay.headline : ""}/>
            <footer className="footer">All icons created by asianson.design</footer>
        </div>
    </div>);
}

export default App;
