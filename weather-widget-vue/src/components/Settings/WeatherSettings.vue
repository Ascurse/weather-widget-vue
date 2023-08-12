<template>
  <div class="settings">
    <h2 class="settings__title">Settings</h2>
    <div class="settings__draggable-area" :list="cities">
      <TransitionGroup>
        <div
          class="settings__draggable-list"
          v-for="(element, index) in cities"
          :key="element.name"
        >
          <div
            class="settings__draggable-item"
            :class="{ 'settings__draggable-item_dragging': isDragging && index === draggingIndex }"
            @dragover="handleDragOver($event)"
            @drop="handleDrop($event, index)"
            @dragend="handleDragEnd"
          >
            <span
              class="settings__draggable-icon settings__draggable-drag"
              @dragstart="handleDragStart($event, index)"
              draggable="true"
            />
            {{ getPlaceName(element)}}
            <span
              class="settings__draggable-icon settings__draggable-remove"
              @click="handleRemove(index)"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
    <h3 class="settings__add-location-title">Add location</h3>
      <SearchPlace @selected="handleSelectedOption" />
  </div>
</template>

<script setup lang="ts">
import type { City } from '@/types/clientNamespace'
import SearchPlace from '../SearchPlace/SearchPlace.vue'
import { onMounted, ref, watch } from 'vue'

const cities = ref([])

onMounted(() => {
  const savedCities = localStorage.getItem('cities');
  if (!savedCities) {
    
  }
  if (savedCities) {
    cities.value = JSON.parse(savedCities);
  }
});

watch(cities, (newCities) => {
  localStorage.setItem('cities', JSON.stringify(newCities));
}, {deep: true});

const handleSelectedOption = (selectedOption: City) => {
  const isDuplicate = cities.value.some(city => city.name === selectedOption.name && city.country === selectedOption.country);
  if (!isDuplicate) {
    cities.value.push(selectedOption);
  }
}

const isDragging = ref(false)
const draggingIndex = ref(-1)

const handleDragStart = (event: DragEvent, index: number) => {
  // Check if the drag started from the draggable-drag icon
  if (
    event.target instanceof HTMLElement &&
    event.target.classList.contains('settings__draggable-drag')
  ) {
    isDragging.value = true
    draggingIndex.value = index
    event.dataTransfer!.setData('text/plain', index.toString())
  } else {
    event.preventDefault() // Prevent dragging if not from the draggable-drag icon
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const handleDrop = (event: DragEvent, toIndex: number) => {
  const fromIndex = parseInt(event.dataTransfer!.getData('text/plain'))
  if (fromIndex !== toIndex) {
    const [movedItem] = cities.value.splice(fromIndex, 1)
    cities.value.splice(toIndex, 0, movedItem)
  }
}

const handleDragEnd = () => {
  isDragging.value = false
  draggingIndex.value = -1
}

const handleRemove = (index: number) => {
  cities.value.splice(index, 1);
}

const getPlaceName = (elem: City) => {
  return `${elem.name}, ${elem.country}`
}
</script>

<style scoped lang="scss">
@import '../../shared/designSystem/fonts.scss';
.settings {
  &__title {
    font: $title-16;
    margin-bottom: 30px;
  }
  &__city-list {
    height: 100px;
  }

  &__draggable-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    font: $caption-14;
    height: 40px;
    border-radius: 10px;
    background-color: lightblue;
    margin-bottom: 15px;
    position: relative;
    padding: 0 15px;
    transition: transform 0.2s ease;

    &_dragging {
      transform: translateY(-5px);
    }
  }

  &__draggable-icon {
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  &__draggable-drag {
    background-image: url('../icons/drag.png');
    margin-right: 15px;
  }

  &__draggable-remove {
    background-image: url('../icons/trash-bin.png');
    position: absolute;
    right: 15px;
  }

  &__add-location-title {
    font: $caption-14;
  }
}
</style>
