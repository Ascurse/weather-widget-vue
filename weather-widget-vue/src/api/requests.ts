import axios from "axios";
import * as converters from './converters'
import type { ServerWeatherData } from "@/types/apiNamespace";

const apiKey = '75674d149c6525307db937d6d8f583cc'

export async function getWeather(lat: number, lon: number) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        const response = await axios.get<ServerWeatherData>(url)
        const weather = converters.convertDataFromServer(response.data)
        return weather
    } catch (err) {
        console.log('Error: ', err)
    }
}

export async function getCityName(cityName: string) {
    try {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
        const response = await axios.get(url)
        return response.data
    } catch (err) {
        console.log('Error: ', err)
    }
}