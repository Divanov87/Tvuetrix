import { onMounted, ref } from 'vue';

export function useEvents(fetchEvents) {
  const events = ref([]);
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const data = await fetchEvents();
      if (Array.isArray(data)) {
        events.value = data;
      }
      else {
        console.error('Invalid events data:', data);
      }
    }
    catch (error) {
      console.error('Error fetching events:', error);
    }
    finally {
      isLoading.value = false;
    }
  });

  return { events, isLoading };
}
