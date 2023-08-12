export interface ClientWeatherData {
    name: string;
    country: string;
    weatherCondition: string;
    feelsLike: number;
    description: string[];
    temp: number;
    pressure: number;
    visibility: number;
    humidity: number;
    dewPoint: string;
    windDeg: number;
    windSpeed: number;
}

export interface City {
    country: string;
    lat: number;
    lon: number;
    name: string;
}