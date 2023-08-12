<template>
  <div>
    <SearchPlaceVue />
  </div>
</template>

<script setup lang="ts">
import SearchPlaceVue from './components/SearchPlace/SearchPlace.vue';
import WeatherCard from './components/WeatherCard/WeatherCard.vue';

</script>


<style scoped>
@import './shared/designSystem/normalize.scss';
@import './shared/designSystem/fonts.scss';

.test-page {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

</style>
