import {useEffect, useRef, useState} from "react";

interface responseItem {
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    }
    hourly: {
        temperature_2m: number[];
        weathercode: number[];
        time: string[]
    }
}

export function useFetch(url: string | null) {
    const cache = useRef<responseItem | null>()
    const [data, setData] = useState<responseItem | null>(null);
    useEffect(() => {
        async function getData(): Promise<void> {
            if (!url) return;
            if (cache.current) {
                const response = cache.current;
                setData(response);
                return;
            }
            try {
                let response = await fetch(url);
                let data = await response.json();
                cache.current = data;
                setData(data);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }

        void getData();
        return () => {
            setData(null);
            cache.current = null;
        }
    }, [url]);
    return data;
}
export interface cityInformation {
    admin1: string,
    admin1_id: number,
    admin2?: string,
    admin2_id?: number,
    admin3?: string,
    admin3_id?: number,
    country: string,
    country_code: string,
    country_id: number,
    elevation: number,
    feature_code: string,
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    population: number
}
export interface locationResponse {
    results: [cityInformation],
    generationtime_ms: number
}

export function useFetchLocation(url: string) {
    const cache = useRef<locationResponse | null>()
    const [data, setData] = useState<locationResponse | null>(null);
    useEffect(() => {
        async function getData(): Promise<void> {
            if (!url) return;
            if (cache.current) {
                const response = cache.current;
                setData(response);
                return;
            }
            try {
                let response = await fetch(url);
                let data = await response.json();
                cache.current = data;
                setData(data);
            } catch (e) {
                console.log(e);
            }
        }

        void getData();
        return () => {
            setData(null);
            cache.current = null;
        }
    }, [url]);
    return data;
}
