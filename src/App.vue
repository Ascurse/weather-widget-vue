<template>
  <div>
    <weather-widget />
  </div>
</template>

<script setup lang="ts">
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
