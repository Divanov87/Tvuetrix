<script setup>
import { onMounted, ref } from 'vue';
import Loader from '../../../components/Loader.vue';
import { getAllEventsData } from '../../../dataProvider/event';
import EventList from './components/event-list/EventList.vue';
import MainPinned from './components/main-pinned/MainPinned.vue';

const isLoading = ref(true);
const eventsData = ref({});
const error = ref(null);

onMounted(async () => {
  try {
    eventsData.value = await getAllEventsData();
  }
  catch (err) {
    error.value = err.message || 'An error occurred';
  }
  finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Loader v-if="isLoading" />
  <div v-else>
    <MainPinned :latest-pins="eventsData.latestPins" :is-loading="isLoading" />
    <EventList :events="eventsData.topRatedEvents" title="Top Rated" />
    <EventList :events="eventsData.theaterEvents" title="Performances" />
    <EventList :events="eventsData.concertEvents" title="Concerts" />
  </div>
</template>
