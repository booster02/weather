import {addHours, getCurrentTime} from "../time/addHours";
import {timeZoneOffset} from "../constant";

export function getTimeHourly(dateString: string, addedHours: number){
    let date = addHours(timeZoneOffset, new Date(dateString));
    return String(date.getHours() + addedHours).padStart(2, "0") + ":00";
}

export function getTimeDaily(addedDays: number){
    let usedDate = getCurrentTime(24 * (addedDays));
    let day = usedDate.substring(8, 10);
    let month = usedDate.substring(5, 7);
    return day + "." + month;
}