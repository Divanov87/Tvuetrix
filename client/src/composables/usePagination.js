import { computed, ref } from 'vue';

export function usePagination(events, eventsPerPage, initialPage = 1) {
  const currentPage = ref(initialPage);

  const totalPages = computed(() => Math.ceil(events.value.length / eventsPerPage));

  const currentEvents = computed(() => {
    const start = (currentPage.value - 1) * eventsPerPage;
    return events.value.slice(start, start + eventsPerPage);
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages.value) {
      currentPage.value = pageNumber;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return {
    currentPage,
    totalPages,
    currentEvents,
    handlePageChange,
  };
}
