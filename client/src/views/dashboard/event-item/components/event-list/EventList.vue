<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import FilterList from '../../../../../components/FilterList.vue';
import { useLocation } from '../../../../../libs/useLocation';
import { useAuthStore } from '../../../../../store/authStore';
import EventCard from '../../../../events/components/event-card/EventCard.vue';

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const filteredEvents = ref([]);
const selectedCity = ref('');
const { user, isLogged } = useAuthStore();
const { city: cityFromLocation } = useLocation();


const displayCity = computed(() => {
  if (isLogged) return user?.location
  if (isLogged && cityFromLocation) return cityFromLocation

  if (selectedCity.value) {
    return selectedCity.value;
  }
  if (cityFromLocation) cityFromLocation
  return 'your city';
});


watch(
  [() => props.events, selectedCity],
  ([events]) => {
    if (selectedCity.value) {
      filteredEvents.value = events.filter(event =>
        event.location.toLowerCase() === selectedCity.value.toLowerCase(),
      );
    } else {
      filteredEvents.value = events;
    }
  },
  { immediate: true },
);


watch(cityFromLocation, (newCity) => {
  if (!isLogged && !selectedCity.value && newCity) {
    selectedCity.value = newCity;
  }
});


function handleCityFilter(city) {
  selectedCity.value = city;
}
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
            Latest <strong>{{ title }}</strong>
          </h2>
        </div>
        <FilterList v-if="!isLogged && !cityFromLocation" @filter-city="handleCityFilter" />
      </div>

      <ul v-if="filteredEvents.length" class="movies-list has-scrollbar">
        <EventCard v-for="event in filteredEvents" :key="event._id" v-bind="event" />
      </ul>

      <h2 v-else class="h2 section-title">
        There are no upcoming events in
        <b style="text-transform: capitalize;">{{ displayCity }}</b>!
      </h2>
    </div>
  </section>
</template>

<style scoped>
@import './EventList.css';
</style>
