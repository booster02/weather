import {useEffect, useState} from "react";

export default function useLocation(base: string[]| null): [coords: string[] | null, setCoords: (coords: string[]) => void] {
    const [coords, setCoords] = useState<string[] | null>(null);
    useEffect(() => {
        function changeCoords(position: GeolocationPosition) {
            let {latitude, longitude} = position.coords;
            let lat = latitude.toString();
            let lng = longitude.toString();
            setCoords([lat, lng]);
        }

        try {
            navigator.geolocation.getCurrentPosition(changeCoords);
        } catch {
            console.log("can not get position");
        }
    }, [base])
    return [coords, setCoords];
}
