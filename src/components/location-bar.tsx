import React, {useEffect, useState} from "react";
import {cityInformation, locationResponse} from "../utils/Hooks/useFetch";

interface LocationBarProps {
    setLocationInput: (city: string) => void;
    cities: locationResponse | null;
    setCurrentCoords: (coords: string[]) => void;
    setCity: (city: string) => void;
    currentCity: string | null;
}

export const LocationBar: React.FC<LocationBarProps> = ({
                                                            setLocationInput,
                                                            cities,
                                                            setCurrentCoords,
                                                            setCity,
                                                            currentCity
                                                        }) => {
    const [input, setInput] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && cities?.results) {
            const inputArray = input.split(",");
            const admin3 = inputArray[inputArray.length - 1].trim();
            let city = cities.results.find((city) => city.admin3 === admin3);
            if (!city) city = cities.results[0];
            setInput(city.name);
            changeCoords(city);
        }
    }

    function changeCoords(city: cityInformation) {
        const lat = city.latitude.toString();
        const lng = city.longitude.toString();
        const coords = [lat, lng]
        setCurrentCoords(coords);
        setCity(city.name)
    }

    useEffect(() => {
        setLocationInput(input.replaceAll(" ", "%20"));
    }, [input, setLocationInput])


    const options: cityOption[] = new Array<cityOption>();
    cities?.results?.forEach(city => {
        const id = city.id;
        const name = city.name;
        const country = city.country;
        const admin1 = city.admin1;
        const admin3 = city.admin3 !== undefined ? city.admin3 : "";
        options.push({
            id, name, country, admin1, admin3
        })
    })
    return (<>
        <datalist id="cities">
            {options.map((city) => {
                const admin1 = city.admin1 ? ", " + city.admin1 : "";
                const admin3 = city.admin3 ? ", " + city.admin3 : "";
                return <option
                    key={city.id}>{city.name + ", " + city.country + admin1 + admin3}
                </option>
            })}
        </datalist>
        <input className="citySearch" name="citySearch" placeholder="Deine Stadt" onChange={onChange}
               list="cities" onKeyDown={onKeyDown} type="text" defaultValue={currentCity || ""}/>
    </>)
}

interface cityOption {
    id: number
    name: string,
    country: string,
    admin1: string,
    admin3: string | undefined
}
