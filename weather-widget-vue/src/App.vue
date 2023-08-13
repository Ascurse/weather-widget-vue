<template>
  <div>
    <weather-widget />
  </div>
</template>

<script setup lang="ts">
import SearchPlaceVue from './components/SearchPlace/SearchPlace.vue';
import WeatherSettingsVue from './components/WeatherSettings/WeatherSettings.vue';
import WeatherCard from './components/WeatherCard/WeatherCard.vue';
import WeatherWidget from './components/WeatherWidget/WeatherWidget.vue'

</script>


<style>
@import './shared/designSystem/normalize.scss';
@import './shared/designSystem/fonts.scss';

.test-page {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

</style>
