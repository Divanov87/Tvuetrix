<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import Loader from '../../components/Loader.vue';
import { getAllCities, getAllEvents, searchEvents } from '../../dataProvider/event';
import EventCard from '../events/components/event-card/EventCard.vue';

const { t } = useI18n();

const router = useRouter();
const route = useRoute();

const events = ref([]);
const years = ref([]);
const isLoading = ref(true);
const cities = ref([]);
const searchResults = ref([]);
const displaySearchResults = ref(false);
const searchParams = ref({
  name: '',
  category: 'all',
  location: 'all',
  year: 'all',
});

const searchInputRef = ref(null);

onMounted(() => {
  generateYears();
  fetchInitialData();
  initializeSearchParamsFromURL();
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'instant' });
    }
  }
});

watch(
  () => route.query,
  () => {
    initializeSearchParamsFromURL();
  },
);

function generateYears() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 2;

  for (let year = startYear; year <= endYear; year++) {
    years.value.push(year);
  }
}

async function fetchInitialData() {
  try {
    const eventsData = await getAllEvents();
    events.value = Array.isArray(eventsData) ? eventsData : [];

    const citiesData = await getAllCities();
    cities.value = Array.isArray(citiesData) ? citiesData : [];
  }
  catch (error) {
    console.error('Error fetching initial data:', error);
  }
  finally {
    isLoading.value = false;
  }
}

function initializeSearchParamsFromURL() {
  const query = route.query;
  searchParams.value.name = query.name || '';
  searchParams.value.category = query.category || 'all';
  searchParams.value.location = query.location || 'all';
  searchParams.value.year = query.year || 'all';

  searchForEvents({
    name: searchParams.value.name.trim() || undefined,
    category: searchParams.value.category === 'all' ? undefined : searchParams.value.category,
    location: searchParams.value.location === 'all' ? undefined : searchParams.value.location,
    date: searchParams.value.year === 'all' ? undefined : searchParams.value.year,
  });
}

async function handleSearch(e) {
  e.preventDefault();
  isLoading.value = true;

  const queryParams = {
    name: searchParams.value.name.trim() || undefined,
    category: searchParams.value.category === 'all' ? undefined : searchParams.value.category,
    location: searchParams.value.location === 'all' ? undefined : searchParams.value.location,
    date: searchParams.value.year === 'all' ? undefined : searchParams.value.year,
  };

  Object.keys(queryParams).forEach((key) => {
    if (!queryParams[key])
      delete queryParams[key];
  });

  updateURLWithQueryParams(queryParams);
  searchForEvents(queryParams);
}

async function searchForEvents(queryParams) {
  try {
    const response = await searchEvents(queryParams);
    if (response && response.events) {
      searchResults.value = response.events;
      displaySearchResults.value = true;
    }
    else {
      searchResults.value = [];
      displaySearchResults.value = true;
    }
  }
  catch (error) {
    console.error('Error searching for events:', error);
    searchResults.value = [];
  }
  finally {
    isLoading.value = false;
  }
}

function updateURLWithQueryParams(params) {
  const queryParams = { ...params };

  if (queryParams.date) {
    queryParams.year = queryParams.date;
    delete queryParams.date;
  }

  if (!queryParams.category)
    queryParams.category = 'all';
  if (!queryParams.location)
    queryParams.location = 'all';
  if (!queryParams.year)
    queryParams.year = 'all';

  router.push({
    path: '/search',
    query: queryParams,
  });
}

const filteredEvents = computed(() => {
  return displaySearchResults.value
    ? searchResults.value
    : events.value;
});
</script>

<template>
  <article>
    <section class="top-rated">
      <div class="container">
        <p class="section-subtitle">
          {{ t('catalog.search') }}
        </p>
        <h2 class="h2 section-title" v-html="$t('catalog.looking_for')" />
        <form @submit="handleSearch">
          <div class="src">
            <input
              id="search-input"
              ref="searchInputRef"
              v-model="searchParams.name"
              type="search"
              :placeholder="$t('catalog.search_for')"
            >
            <button type="submit" class="search-btn vertical">
              &nbsp;&nbsp;<i class="bx bx-search" />
            </button>
          </div>
          <div class="filter-container">
            <select
              id="category"
              v-model="searchParams.category"
            >
              <option value="all">
                {{ t('Events') }}
              </option>
              <option value="theater">
                {{ t('Theater') }}
              </option>
              <option value="concert">
                {{ t('Concerts') }}
              </option>
            </select>
            <select
              id="location"
              v-model="searchParams.location"
            >
              <option value="all">
                {{ t('catalog.location') }}
              </option>
              <option
                v-for="city in cities"
                :key="city"
                :value="city"
              >
                {{ city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() }}
              </option>
            </select>
            <select
              id="year"
              v-model="searchParams.year"
            >
              <option value="all">
                {{ t('catalog.year') }}
              </option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </form>
      </div>

      <div class="container">
        <p class="section-subtitle">
          {{ t('catalog.latest') }}
        </p>
        <h2 id="city" class="h2 section-title" v-html="$t('catalog.theater_music_performances')" />
        <!-- find some workaround to avoid XSS -->
        <Loader v-if="isLoading" />
        <ul v-else class="movies-list">
          <EventCard
            v-for="event in filteredEvents"
            :key="event._id"
            v-bind="event"
          />
        </ul>
        <h2 v-if="!isLoading && filteredEvents.length === 0" class="h2 section-title">
          {{ displaySearchResults ? t('catalog.results') : t('catalog.events') }}

        </h2>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import './Search.css';
</style>
