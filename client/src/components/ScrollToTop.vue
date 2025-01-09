<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(
  () => route.path,
  (path) => {
    if (path.includes('/charts')) return;
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  },
);
</script>

