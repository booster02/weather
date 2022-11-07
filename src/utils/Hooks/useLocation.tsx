import {useEffect, useState} from "react";

export default function useLocation(base: string[]| null): [coords: string[] | null, setCoords: (coords: string[]) => void] {
    const [coords, setCoords] = useState<string[] | null>(base);
    useEffect(() => {
        function changeCoords(position: GeolocationPosition) {
            if (!position.coords){
                setCoords(["52.520008", "13.404954"]);
                return;
            }
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
    }, [])
    return [coords, setCoords];
}
