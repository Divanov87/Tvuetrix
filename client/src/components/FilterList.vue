<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filterCity']);
const selectedCity = ref('All');
const cities = ['All', 'Varna', 'Bourgas', 'Plovdiv', 'Sofia', 'London'];


function handleButtonClick(city) {
  selectedCity.value = city;
  emit('filterCity', city === 'All' ? '' : city);
}
</script>

<template>
  <ul class="filter-list">
    <li v-for="city in cities" :key="city">
      <button class="filter-btn" :class="{ 'filter-btn-all': selectedCity === city }" @click="handleButtonClick(city)">
        {{ city }}
      </button>
    </li>
  </ul>
</template>

<style scoped>

.filter-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.filter-btn {
    color: var(--white);
    background: var(--raisin-black);
    font-size: var(--fs-11);
    font-weight: var(--fw-500);
    border: 2px solid var(--gunmetal-1);
    padding: 12px 26px;
    border-radius: 50px;
}
.filter-list > li {
    list-style: none !important;
  
  }

.filter-btn:hover {
    background: url("/assets/images/masks.png") no-repeat;
    background-size: cover;
}

.filter-btn:focus {
    background: var(--app-main-color);
    border: none;
}

.filter-btn-all {
    background: var(--app-main-color);
    border: initial;
}
</style>
