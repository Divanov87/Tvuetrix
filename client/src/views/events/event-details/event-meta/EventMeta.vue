<script setup>
import { computed, onMounted, ref } from 'vue';
import FilterList from '../../../../components/FilterList.vue';
import Loader from '../../../../components/Loader.vue';
import { getAllEvents } from '../../../../dataProvider/event.js';
import EventCard from '../../components/event-card/EventCard.vue';

const isLoading = ref(true);
const latestEvents = ref([]);
const filteredEvents = ref([]);
const selectedCity = ref('');
const error = ref(null);

const displayCity = computed(() => {
  if (selectedCity.value) return selectedCity.value;
  return 'your city';
});

async function fetchEvents() {
  try {
    const events = await getAllEvents();
    latestEvents.value = events;
    filteredEvents.value = events;
  }
  catch (err) {
    error.value = err.message || 'An error occurred while fetching events.';
  }
  finally {
    isLoading.value = false;
  }
}

function handleCityFilter(city) {
  selectedCity.value = city;
  filteredEvents.value = city
    ? latestEvents.value.filter(event =>
      event.location.toLowerCase() === city.toLowerCase(),
    )
    : latestEvents.value;
}

onMounted(fetchEvents);
</script>

<template>
  <section class="upcoming">
    <div class="container">
      <div class="flex-wrapper">
        <div class="title-wrapper">
          <p class="section-subtitle">
            Discover latest in {{ displayCity }}
          </p>
          <h2 class="h2 section-title">
            Theater & Music <strong>Performances</strong>
          </h2>
        </div>
        <FilterList @filter-city="handleCityFilter" />
      </div>

      <Loader v-if="isLoading" />

      <div v-else-if="error">
        <h2 class="h2 section-title">
          {{ error }}
        </h2>
      </div>

      <div v-else-if="latestEvents.length === 0">
        <h2 class="h2 section-title">
          There are no upcoming Theater events!
        </h2>
      </div>

      <div v-else-if="filteredEvents.length === 0">
        <h2 class="h2 section-title">
          There are no upcoming events in {{ displayCity }}!
        </h2>
      </div>

      <ul v-else class="movies-list has-scrollbar">
        <EventCard v-for="event in filteredEvents" :key="event._id" v-bind="event" />
      </ul>
    </div>
  </section>
</template>

<style scoped>
@import './EventMeta.css';
</style>
