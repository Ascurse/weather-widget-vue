export function calculateDewPoint(temperature: number, humidity: number): number {
    const a = 17.27;
    const b = 237.7;
    const alpha = (a * temperature) / (b + temperature) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint;
}

export function getWindDirection(deg: number) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index = Math.round(deg / 45) % 8;
    return directions[index];
}

export function metersToKilometers(meters: number): string {
    const kilometers = meters / 1000;
    return kilometers.toFixed(1) + 'km';
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ensureSentenceEndsWithDot(str: string): string {
    if (str.trim().endsWith(".")) {
        return str.trim();
    } else {
        return str.trim() + ".";
    }
}