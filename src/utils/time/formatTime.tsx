export function getDayFromDate(date: Date){
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return day + "." + month;
}
export function getDayFromString(date: string){
    return getDayFromDate(new Date(date));
}