<template>
  <div class="weather-card">
    <spin v-if="isLoading" size="large"/>
    <div v-else class="weather-card__content">
      <h2 class="weather-card__city">{{ title }}</h2>
      <div class="weather-card__temp-wrapper">
        <img :src="weather?.weatherIcon" class="weather-card__image" />
        <span class="weather-card__temperature">{{ temperature }}</span>
      </div>
      <div class="weather-card__desc">{{ description }}</div>
      <div class="weather-card__additional">
        <div class="weather-card__info-container">
          <div class="weather-card__item-container">
            <img :src="windDirectionIconUrl" class="weather-card__icon" />
            <span class="weather-card__wind-info">{{ windInfo }}</span>
          </div>
          <div class="weather-card__info-item">Humidity: {{ weather?.humidity }}%</div>
          <div class="weather-card__info-item">Visibility: {{ visibility }}</div>
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
  </div>
</template>

<script setup lang="ts">
import type { ClientWeatherData } from '@/types/clientNamespace'
import { getWeather } from '../../api/requests'
import { computed, onMounted, ref, type PropType } from 'vue'
import {
  capitalizeFirstLetter,
  ensureSentenceEndsWithDot,
  getWindDirection,
  metersToKilometers
} from '@/helpers/calculations'
import WindNorthIcon from '../icons/Wind/Wind-N.png'
import WindNorthEastIcon from '../icons/Wind/Wind-NE.png'
import WindNorthWestIcon from '../icons/Wind/Wind-NW.png'
import WindWestIcon from '../icons/Wind/Wind-W.png'
import WindSouthIcon from '../icons/Wind/Wind-S.png'
import WindSouthEastIcon from '../icons/Wind/Wind-SE.png'
import WindSouthWestIcon from '../icons/Wind/Wind-SW.png'
import WindEastIcon from '../icons/Wind/Wind-E.png'
import { Spin } from 'ant-design-vue'

// Props
const props = defineProps({
    city: {
    type: Object as PropType<{ name: string; lat: number; lon: number }>,
    required: true,
  },
})

const weather = ref<ClientWeatherData>();
const isLoading = ref(false)

// Weather data
onMounted(async () => {
  isLoading.value = true
  await getWeather(props.city.lat, props.city.lon).then((data) => (weather.value = data))
  console.log(weather.value)
  isLoading.value = false
})

// Computed properties
const visibility = computed(() =>
  weather.value ? metersToKilometers(weather.value.visibility) : ''
)
const hPa = computed(() => (weather.value ? `${weather.value.pressure}hPa` : ''))
const title = computed(() =>
  weather.value ? `${weather.value.name},${weather.value.country}` : ''
)
const temperature = computed(() => (weather.value ? `${weather.value.temp.toFixed(0)}°C` : ''))
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
const windInfo = computed(() =>
  weather.value ? `${weather.value.windSpeed} m/s ${windDirection.value}` : ''
)

// Wind direction and icon mapping
const windDirection = computed(() => (weather.value ? getWindDirection(weather.value.windDeg) : ''))

type WindDirectionIconMap = {
  [key: string]: string
}
const windDirectionIconMap: WindDirectionIconMap = {
  N: WindNorthIcon,
  NE: WindNorthEastIcon,
  NW: WindNorthWestIcon,
  W: WindWestIcon,
  SW: WindSouthWestIcon,
  S: WindSouthIcon,
  SE: WindSouthEastIcon,
  E: WindEastIcon
}

const windDirectionIconUrl = computed(() => {
  const iconUrl = windDirectionIconMap[windDirection.value]
  return iconUrl || undefined
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
  min-height: 308px;
  justify-content: center;

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
