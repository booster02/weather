import {timeZoneOffset} from "../constant";

export function addHours(addedHours: number, date = new Date(Date.now())) {
    date.setTime(date.getTime() + addedHours * 60 * 60 * 1000);
    return date;
}

export function getCurrentTime(addedHours: number) {
    return addHours(addedHours + timeZoneOffset).toISOString().substring(0, 16);
}
