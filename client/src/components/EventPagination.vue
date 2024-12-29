<script setup>
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['pageChange']);

const route = useRoute();
const router = useRouter();

function handlePageClick(pageNumber) {
  if (pageNumber !== props.currentPage) {
    emit('pageChange', pageNumber);

    router.push({
      path: route.path,
      query: { ...route.query, page: pageNumber.toString() },
    });
  }
}
</script>

<template>
  <div class="pagination">
    <button
      class="page-item"
      :disabled="currentPage === 1"
      @click="handlePageClick(currentPage - 1)"
    >
      &lt;&lt;
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      class="page-item"
      :class="{ active: page === currentPage }"
      @click="handlePageClick(page)"
    >
      {{ page }}
    </button>

    <button
      class="page-item"
      :disabled="currentPage === totalPages"
      @click="handlePageClick(currentPage + 1)"
    >
      &gt;&gt;
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.page-item {
  /* border: 1px solid #ccc; */
  background: rgb(0, 0, 0, 0.63);
  /* color: #000; */
  color: white;
  padding: 0px 10px;
  /* margin: 0 5px; */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}
.page-item:first-of-type {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px; 
}
 .page-item:last-of-type {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px; 
}

.page-item:hover {
  /* background-color: #f0f0f0; */
  /* background:  #e60a15; */
  background: white;
  color: black;
}

.page-item.active {
  background: #e60a15;
  color: #fff;
  font-size: 18px;
  /* transform: scale(1.1); */
  cursor: default;
}

.page-item:disabled {
  /* background-color: #e0e0e0;
    cursor: not-allowed; */
  display: none;
}
</style>
