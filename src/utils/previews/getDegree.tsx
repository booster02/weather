export function getDegreeHour(hourlyDegree: number[], weatherIndex: number) {
    return hourlyDegree[weatherIndex];
}

export function getDegreeDay(dailyDegreeMin: number[], dailyDegreeMax: number[], weatherIndex: number) {
    let degree = (dailyDegreeMin[weatherIndex] + dailyDegreeMax[weatherIndex])/2
    return parseFloat(degree.toFixed(1));
}