<!-- eslint-disable vue/prop-name-casing -->
<script setup>
import { formatDate } from '../../../../libs/dateFormatter';

defineProps({
  _id: String,
  imageUrl: String,
  name: String,
  location: String,
  date: String,
  duration: Number,
  rating: Number,
});
</script>

<template>
  <li>
    <div class="movie-card">
      <router-link :to="`/events/${_id}/details`">
        <figure class="card-banner">
          <img :src="imageUrl" :alt="name">
        </figure>
      </router-link>
      <div class="title-wrapper">
        <router-link :to="`/events/${_id}/details`">
          <h3 class="card-title">
            {{ name.toUpperCase() }}
          </h3>
        </router-link>
        <div class="location-badge" style="text-transform: capitalize;">
          <i class="bx bxs-map" />&nbsp;{{ location }}
        </div>
      </div>
      <div class="badge badge-outline">
        <div class="date-time">
          <div>
            <i class="bx bx-calendar" />
            <time :dateTime="date">{{ formatDate(date) }}</time>
          </div>
          <div class="duration">
            <i class="bx bx-time" />
            <time :dateTime="duration">{{ duration }} min</time>
          </div>
          <div class="rating">
            <i class="bx bxs-star" />
            <data>{{ rating }}</data>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
@import './EventCard.css';
</style>
