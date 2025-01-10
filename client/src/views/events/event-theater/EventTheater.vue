<script setup>
import { useI18n } from 'vue-i18n';
import EventPagination from '../../../components/event-pagination/EventPagination.vue';
import Loader from '../../../components/Loader.vue';
import { useEvents } from '../../../composables/useEvents';
import { usePagination } from '../../../composables/usePagination';
import { usePaginationQuery } from '../../../composables/usePaginationQuery';
import { getTheaterEvents } from '../../../dataProvider/event';
import EventCard from '../components/event-card/EventCard.vue';

const { t } = useI18n();

const { events, isLoading } = useEvents(getTheaterEvents);
const eventsPerPage = 8;
const initialPage = usePaginationQuery(1);

const { currentPage, totalPages, currentEvents, handlePageChange } = usePagination(
  events,
  eventsPerPage,
  initialPage,
);
</script>

<template>
  <article>
    <section class="top-rated">
      <div class="container">
        <p class="section-subtitle">
          {{ t('catalog.latest') }}
        </p>
        <h2 class="h2 section-title" v-html="$t('catalog.theater_performances')" />
        <!-- find some workaround to avoid XSS -->

        <Loader v-if="isLoading" />

        <template v-else>
          <ul class="movies-list">
            <EventCard
              v-for="event in currentEvents"
              :key="`theater-${event._id}`"
              v-bind="event"
            />
            <h2 v-if="currentEvents.length === 0" class="h2 section-title">
              No events found!
            </h2>
          </ul>
          <EventPagination
            :total-pages="totalPages"
            :current-page="currentPage"
            @page-change="handlePageChange"
          />
        </template>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import '../../../views/search/Search.css';
</style>
