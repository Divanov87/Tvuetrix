import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function usePaginationQuery(initialPage = 1) {
  const route = useRoute();
  const router = useRouter();

  const currentPage = ref(Number.parseInt(route.query.page) || initialPage);

  watch(currentPage, (newPage) => {
    const query = { ...route.query, page: newPage.toString() };
    router.push({ path: route.path, query });
  });

  watch(() => route.query.page, (newPage) => {
    currentPage.value = Number.parseInt(newPage) || initialPage;
  });

  return currentPage;
}
