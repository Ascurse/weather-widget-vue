import { calculateDewPoint } from '@/helpers/calculations'
import * as serverTypes from '@/types/apiNamespace'
import * as clientTypes from '@/types/clientNamespace'

export function convertDataFromServer(data: serverTypes.ServerWeatherData): clientTypes.ClientWeatherData {
    return {
        name: data.name,
        country: data.sys.country,
        weatherCondition: data.weather[0].main,
        weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        feelsLike: data.main.feels_like,
        description: data.weather.map((weather) => weather.description),
        temp: data.main.temp,
        pressure: data.main.pressure,
        visibility: data.visibility,
        humidity: data.main.humidity,
        dewPoint: calculateDewPoint(data.main.temp, data.main.humidity).toFixed(1),
        windDeg: data.wind.deg,
        windSpeed: data.wind.speed,
    }
}