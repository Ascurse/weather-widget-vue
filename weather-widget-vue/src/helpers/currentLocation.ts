import { getWeather } from "@/api/requests";
import type { City } from "@/types/clientNamespace";

export interface Position {
    coords: {
        latitude: number,
        longitude: number,
    },

}

export const currentLocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export const getCurrentCity = async () => {
    try {
        const currentPos = await new Promise<Position>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, currentLocationOptions)
        })

        const latitude = currentPos.coords.latitude
        const longitude = currentPos.coords.longitude

        const data = await getWeather(latitude, longitude)
        const newCity: City = { name: data?.name || '', country: data?.country || '', lat: latitude, lon: longitude }
        return newCity
    } catch (error) {
        throw new Error('Error getting current position or weather')
    }
}