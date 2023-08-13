<template>
  <div class="weather-widget">
    <WeatherSettings v-if="isSettingsOpen" @update-cities="updateCities" :cities="cities"/>
    <WeatherCard v-else class="weather-widget__card" v-for="city in cities" :key="city.name + city.lat" :city="city" />
    <img :src="settingsIcon" class="weather-widget__icon" @click="toggleSettings" />
  </div>
</template>

<script setup lang="ts">
import WeatherSettings from '../WeatherSettings/WeatherSettings.vue'
import WeatherCard from '../WeatherCard/WeatherCard.vue'
import { ref, computed, onMounted } from 'vue'
import { getCurrentCity } from '../../helpers/currentLocation'
import SettingsIcon from '../icons/settings-icon.png'
import CloseIcon from '../icons/close.png'
import type { City } from '@/types/clientNamespace'

const isSettingsOpen = ref(false)
const cities = ref<City[]>([])

const fetchCitiesFromLocalStorage = async () => {
  const savedCities = localStorage.getItem('cities')
  if (!savedCities || JSON.parse(savedCities).length < 1) {
    try {
      const newCity = await getCurrentCity()
      cities.value = [newCity]
    } catch (error) {
      console.error('Error getting current position or weather:', error)
    }
  } else {
    cities.value = JSON.parse(savedCities)
  }
}

const settingsIcon = computed(() => {
  return isSettingsOpen.value ? CloseIcon : SettingsIcon;
})

onMounted(async () => {
  await fetchCitiesFromLocalStorage()
  console.log(cities.value)
})

const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value
}

const updateCities = (newCities: City[]) => {
  cities.value = newCities
}
</script>

<style scoped lang="scss">
.weather-widget {
  padding: 10px 35px;
  position: relative;

  &__icon {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 10px;
    right: 35px;
    cursor: pointer;
    transition: transform 0.5s ease;
    &:hover {
      transform: rotate(360deg);
    }
  }

  &__card {
    margin-bottom: 30px;
    &:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
