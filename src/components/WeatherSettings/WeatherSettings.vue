<template>
  <div class="settings">
    <h2 class="settings__title">Settings</h2>
    <div class="settings__draggable-area">
      <TransitionGroup>
        <div
          class="settings__draggable-list"
          v-for="(element, index) in cities"
          :key="element.name"
        >
          <div
            :class="['settings__draggable-item', {'settings__draggable-item_dragging': isDragging && index === draggingIndex }]"
            @dragover="handleDragOver($event)"
            @drop="handleDrop($event, index)"
            @dragend="handleDragEnd"
          >
            <span class="settings__draggable-icon settings__draggable-drag" @dragstart="handleDragStart($event, index)" draggable="true"/>
            {{ getPlaceName(element) }}
            <span class="settings__draggable-icon settings__draggable-remove" @click="handleRemove(index)" />
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
import { ref, watch, type PropType } from 'vue'

const props = defineProps({
  cities: {
    type: Array as PropType<City[]>,
    required: true,
  },
});
const emit = defineEmits(['updateCities']);
const localCities = ref<City[]>(props.cities)

const isDragging = ref(false)
const draggingIndex = ref(-1)

const handleSelectedOption = (selectedOption: City) => {
  const isDuplicate = localCities.value.some(
    (city) => city.name === selectedOption.name && city.country === selectedOption.country
  )
  if (!isDuplicate) {
    localCities.value = [...localCities.value, selectedOption];
    emit('updateCities', localCities.value)
  }
}

const handleDragStart = (event: DragEvent, index: number) => {
  const target = event.target as HTMLElement
  if (target.classList.contains('settings__draggable-drag')) {
    isDragging.value = true
    draggingIndex.value = index
    event.dataTransfer!.setData('text/plain', index.toString())
  } else {
    event.preventDefault()
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const handleDrop = (event: DragEvent, toIndex: number) => {
  const fromIndex = parseInt(event.dataTransfer!.getData('text/plain'))
  if (fromIndex !== toIndex) {
    const movedItem = localCities.value.splice(fromIndex, 1)[0]
    localCities.value.splice(toIndex, 0, movedItem)
    emit('updateCities', localCities.value)
  }
}

const handleDragEnd = () => {
  isDragging.value = false
  draggingIndex.value = -1
}

const handleRemove = (index: number) => {
  localCities.value.splice(index, 1)
  emit('updateCities', localCities.value)
}

const getPlaceName = (elem: City) => {
  return `${elem.name}, ${elem.country}`
}

watch(
  localCities,
  (newCities) => {
    localStorage.setItem('cities', JSON.stringify(newCities))
  },
  { deep: true }
)
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
