<template>
  <div class="weather-card">
    <h2 class="weather-card__city">{{ title }}</h2>
    <div class="weather-card__temp-wrapper">
      <img src="../icons/Weather/sun.png" class="weather-card__image" />
      <span class="weather-card__temperature">{{ temperature }}</span>
    </div>
    <div class="weather-card__desc">{{description}}</div>
    <div class="weather-card__additional">
      <div class="weather-card__info-container">
        <div class="weather-card__item-container">
          <img src="../icons/Wind/Wind-SW.png" class="weather-card__icon" />
          <span class="weather-card__wind-info">3.0 m/s N</span>
        </div>
        <div class="weather-card__info-item">Humidity: {{ weather?.humidity }}%</div>
        <div v-if="visibility" class="weather-card__info-item">Visibility: {{ visibility }}</div>
      </div>
      <div class="weather-card__info-container">
        <div class="weather-card__item-container">
          <img src="../icons/hpa.svg" class="weather-card__icon" />
          <span class="weather-card__hpa-info">{{ hPa }}</span>
        </div>
        <div class="weather-card__info-item">Dew point: {{ weather?.dewPoint }}°C</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClientWeatherData } from '@/types/clientNamespace'
import { getWeather } from '../../api/requests.ts'
import { computed, onMounted, ref } from 'vue'
import {
  capitalizeFirstLetter,
  ensureSentenceEndsWithDot,
  metersToKilometers
} from '@/helpers/calculations'
const weather = ref<ClientWeatherData | undefined>(undefined)
onMounted(async () => {
  await getWeather(50, 45).then((data) => (weather.value = data))
  console.log(weather.value)
})
const visibility = computed(() => {
  if (weather.value) {
    return metersToKilometers(weather.value.visibility)
  }
  return ''
})
const hPa = computed(() => {
  if (weather.value) {
    return `${weather.value.pressure}hPa`
  }
  return ''
})
const title = computed(() => {
  if (weather.value) {
    return `${weather.value.name},${weather.value.country}`
  }
  return ''
})
const temperature = computed(() => {
  if (weather.value) {
    return `${weather.value.temp.toFixed(0)}°C`
  }
  return ''
})
const description = computed(() => {
  if (weather.value) {
    const processedDescriptions: string[] = weather.value.description.map((description) => {
      const sentences: string[] = description.split('.')

      const processedSentences: string[] = sentences
        .filter((sentence) => sentence.trim() !== '')
        .map((sentence) => ensureSentenceEndsWithDot(capitalizeFirstLetter(sentence)))

      return processedSentences.join(' ')
    })
    return `Feels like ${weather.value.feelsLike.toFixed(0)}°C. ${processedDescriptions}`
  }
  return ''
})
</script>

<style scoped lang="scss">
@import '../../shared/designSystem/fonts.scss';
.weather-card {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #fff;
  color: #000;

  &__city {
    font: $title-16;
    margin-bottom: 20px;
  }

  &__temp-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 25px;
  }

  &__image {
    width: 75px;
    height: 75px;
    margin-right: 80px;
    object-fit: contain;
  }

  &__temperature {
    font: $temperature;
  }

  &__desc {
    font: $caption-14;
    margin-bottom: 35px;
  }

  &__additional {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    font: $caption-14;
  }

  &__item-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 30px;
  }

  &__icon {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  &__info-item {
    margin-bottom: 15px;
  }
}
</style>
