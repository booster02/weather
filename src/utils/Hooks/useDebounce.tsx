import { useEffect, useState } from 'react'

function useDebounce(city: string, delay=500):[city: string, setCity: (newCity: string) => void]  {
    const [newCity, setCity] = useState<string>(city);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCity(city)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [city, delay])

    return [newCity, setCity];
}

export default useDebounce