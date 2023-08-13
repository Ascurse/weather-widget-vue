<template>
  <div class="weather-widget">
    <WeatherSettings v-if="isSettingsOpen" />
    <div v-else>
      <WeatherCard class="weather-widget__card" v-for="city in cities" :key="city.name" :city="city" />
    </div>
    <img :src="settingsIcon" class="weather-widget__icon" @click="toggleSettings" />
  </div>
</template>

<script setup lang="ts">
import WeatherSettings from '../WeatherSettings/WeatherSettings.vue'
import WeatherCard from '../WeatherCard/WeatherCard.vue'
import { ref, computed, onMounted, onUpdated } from 'vue'
import { getCurrentCity } from '../../helpers/currentLocation'
import { useStore } from 'vuex'
import SettingsIcon from '../icons/settings-icon.png'
import CloseIcon from '../icons/close.png'

const store = useStore()
const isSettingsOpen = ref(false)
const cities = computed(() => store.state.cities)

const fetchCitiesFromLocalStorage = async () => {
  const savedCities = localStorage.getItem('cities')
  if (!savedCities || JSON.parse(savedCities).length < 1) {
    try {
      const newCity = await getCurrentCity()
      store.commit('setCities', [newCity])
    } catch (error) {
      console.error('Error getting current position or weather:', error)
    }
  } else {
    store.commit('setCities', JSON.parse(savedCities))
  }
}

const settingsIcon = computed(() => {
  return isSettingsOpen.value ? CloseIcon : SettingsIcon;
})

onMounted(async () => {
  await fetchCitiesFromLocalStorage()
})

onUpdated(async () => {
  await fetchCitiesFromLocalStorage()
})

const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value
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
