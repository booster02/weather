import React from "react";

export const useInterval = (callback: () => void, msDelay: number) => {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function useCallback() {
            savedCallback.current();
        }

        let id = setInterval(useCallback, msDelay);
        return () => clearInterval(id);
    }, [msDelay]);
};