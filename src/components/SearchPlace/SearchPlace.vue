<template>
  <div class="search-place">
    <a-select
      v-model:value="value"
      show-search
      placeholder="Input city name"
      style="width: 100%"
      :default-active-first-option="true"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="
        data.map((suggestion, index) => ({
          key: `${suggestion.name}, ${suggestion.country}, ${index}`,
          label: `${suggestion.name}, ${suggestion.country}`,
          value: `${suggestion.name}, ${suggestion.country}`
        }))
      "
      @search="debouncedHandleSearch"
      @change="handleChange"
    ></a-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getCityName } from '@/api/requests'
import debounce from 'lodash/debounce'
import type { CityResult } from '@/types/apiNamespace'
import type { City } from '@/types/clientNamespace'

const value = ref('')
const data = ref<City[]>([])
const emit = defineEmits(['selected'])

const handleSearch = async (val: string) => {
  const cities = await getCityName(val)
  const convertedCities: City[] = cities.map((result: CityResult) => ({
    country: result.country,
    lat: result.lat,
    lon: result.lon,
    name: result.name
  }))
  
  // Remove duplicates and update data
  data.value = [...new Map(convertedCities.map(city => [`${city.name}, ${city.country}`, city])).values()]
}

// Create a debounced version of handleSearch
const debouncedHandleSearch = debounce(handleSearch, 300)

const handleChange = (selectedValue: string) => {
  const selectedOption = data.value.find(
    (option) => `${option.name}, ${option.country}` === selectedValue
  )
  if (selectedOption) {
    emit('selected', selectedOption)
    value.value = ''
  }
}
</script>

<style>
.search-place {
  display: block;
  width: 100%;
  color: #000;
}
</style>
