<script setup>
import Loader from '../../../../../components/Loader.vue';
import EventCard from '../../../../events/components/event-card/EventCard.vue';

defineProps({
  latestPins: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="top-rated">
    <div class="container">
      <p class="section-subtitle">Latest</p>
      <h2 class="h2 section-title">Pinned <strong>Events</strong></h2>
      <div v-if="isLoading">
        <Loader />
      </div>
      <ul v-else class="movies-list">
        <template v-if="latestPins.length > 0">
          <EventCard v-for="event in latestPins" :key="event._id" v-bind="event" />
        </template>
        <h2 v-else class="h2 section-title">There are no pinned events!</h2>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@import './MainPinned.css';
</style>
