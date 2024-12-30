<script setup>
import { jwtDecode } from 'jwt-decode';
import { onMounted, ref } from 'vue';
import Loader from '../../components/Loader.vue';
import { getEvent, getUserEvents } from '../../dataProvider/event';
import { useAuthStore } from '../../store/authStore';

const isLoading = ref(true);
const boughtEvents = ref([]);
const likedEvents = ref([]);

const authStore = useAuthStore();

const user = authStore.user;

async function fetchUserEvents() {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='))
      ?.split('=')[1];

    if (!token) {
      console.error('No token found.');
      isLoading.value = false;
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;
    console.log('User ID:', userId);

    const data = await getUserEvents(userId);
    await getEventDetails(data.likes, 'liked');
    await getEventDetails(data.boughts, 'bought');
  }
  catch (error) {
    console.error('Error fetching user\'s events:', error);
    isLoading.value = false;
  }
}

async function getEventDetails(eventIds, type) {
  if (!eventIds || eventIds.length === 0) {
    if (type === 'liked') {
      likedEvents.value = [];
    }
    else {
      boughtEvents.value = [];
    }
    isLoading.value = false;
    return;
  }

  const uniqueEventIds = [...new Set(eventIds)];
  try {
    const events = await Promise.all(
      uniqueEventIds.map(async (eventId) => {
        try {
          return await getEvent(eventId);
        }
        catch (error) {
          console.error('Error fetching event details:', error);
          return null;
        }
      }),
    );

    const filteredEvents = events.filter(event => event !== null);
    if (type === 'liked') {
      likedEvents.value = filteredEvents;
    }
    else {
      boughtEvents.value = filteredEvents;
    }
  }
  catch (error) {
    console.error('Error fetching event details:', error);
  }
  finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchUserEvents();
});
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        Profile
      </p>
      <h2 class="h2 section-title">
        <b style="text-transform: capitalize">{{ user?.username }}'s</b>
        <strong> Likes</strong>
      </h2>
      <Loader v-if="isLoading" />
      <div v-else>
        <div v-if="likedEvents.length > 0">
          <div v-for="event in likedEvents" :key="event._id" class="container">
            <div class="image-list">
              <div class="image-item">
                <img class="image" :src="event.imageUrl" :alt="event.name">
                <div class="content">
                  <h3 class="movie-title">
                    {{ event.name }}
                  </h3>
                  <div class="movie-description">
                    {{ event.description }}
                  </div>
                </div>
                <div class="button-container">
                  <button class="share">
                    <i :class="event?.isLiked ? 'bx bxs-heart' : 'bx bx-heart'" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 v-else class="h2 section-title">
          You didn't like any events, yet!
        </h2>
      </div>

      <p class="section-subtitle">
        Profile
      </p>
      <h2 class="h2 section-title">
        <b style="text-transform: capitalize">{{ user?.username }}'s</b>
        <strong> Purchases</strong>
      </h2>
      <Loader v-if="isLoading" />
      <div v-else>
        <div v-if="boughtEvents.length > 0">
          <div v-for="event in boughtEvents" :key="event._id" class="container">
            <div class="image-list">
              <div class="image-item">
                <img class="image" :src="event.imageUrl" alt="Image">
                <div class="content">
                  <h3 class="movie-title">
                    {{ event.name }}
                  </h3>
                  <div class="movie-description">
                    {{ event.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 v-else class="h2 section-title">
          You didn't make any purchases, yet!
        </h2>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import './Profile.css';
</style>
