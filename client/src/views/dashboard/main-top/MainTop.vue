<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../../store/authStore';

const { t, locale } = useI18n();
const { user, isLogged } = useAuthStore();
// const APP_DOMAIN = import.meta.env.VITE_DOMAIN_NAME

const videoData = ref([
  {
    url: '/assets/videos/video1.mp4',
    titleKeys: [
      'main_top.testimonial_1_1',
      'main_top.testimonial_1_2',
      'main_top.testimonial_1_3',
      'main_top.testimonial_1_4',
    ],
  },
  {
    url: '/assets/videos/video2.mp4',
    titleKeys: [
      'main_top.testimonial_2_1',
      'main_top.testimonial_2_2',
      'main_top.testimonial_2_3',
      'main_top.testimonial_2_4',
    ],
  },
  {
    url: '/assets/videos/video3.mp4',
    titleKeys: [
      'main_top.testimonial_3_1',
      'main_top.testimonial_3_2',
      'main_top.testimonial_3_3',
      'main_top.testimonial_3_4',
    ],
  },
]);

const selectedVideo = computed(() => {
  const randomIndex = Math.floor(Math.random() * videoData.value.length);
  return videoData.value[randomIndex];
});

const translatedTitle = computed(() => {
  return selectedVideo.value.titleKeys.map(key => t(key)).join(' ');
});

watch(locale, () => {
  void translatedTitle.value;
});
</script>

<template>
  <div class="video-container">
    <video autoplay loop muted class="video">
      <source :src="selectedVideo.url" type="video/mp4">
      {{ t('main_top.video') }}
    </video>

    <a href="#service" class="circle-link">
      <div class="ripple-circle">
        <div class="arrow-down">
          <i class="bx bx-down-arrow-alt" />
        </div>
      </div>
    </a>
    <div class="mask" />
  </div>

  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <p v-if="isLogged" class="hero-subtitle">
          {{ t('main_top.welcome') }}, <b style="text-transform: capitalize">{{ user?.username }}</b>!
        </p>
        <!-- <p class="hero-subtitle" v-else>
            {{ APP_DOMAIN }}
          </p> -->
        <div class="meta-wrapper">
          <div class="badge-wrapper">
            <div class="badge badge-fill">
              {{ t('main_top.badge_1') }}
            </div>
            <div class="badge badge-outline">
              {{ t('main_top.badge_2') }}
            </div>
            <div class="badge badge-fill">
              {{ t('main_top.badge_3') }}
            </div>
            <div class="badge badge-outline">
              {{ t('main_top.badge_4') }}
            </div>
            <div class="badge badge-fill">
              {{ t('main_top.badge_5') }}
            </div>
            <div class="badge badge-outline">
              {{ t('main_top.badge_6') }}
            </div>
          </div>
        </div>

        <h1 class="h1 hero-title" v-html="translatedTitle" />

        <div class="meta-wrapper">
          <div class="ganre-wrapper">
            <i class="bx bxs-map" />
            <router-link to="/search?location=varna">
              {{ t('main_top.city.varna') }}
            </router-link> |
            <router-link to="/search?location=bourgas">
              {{ t('main_top.city.bourgas') }}
            </router-link> |
            <router-link to="/search?location=plovdiv">
              {{ t('main_top.city.plovdiv') }}
            </router-link> |
            <router-link to="/search?location=sofia">
              {{ t('main_top.city.sofia') }}
            </router-link> |
            <!-- <router-link to="/search?location=london">
              {{ t('main_top.city.london') }}
            </router-link> -->
            <router-link :to="{ path: '/search', query: { location: 'london' }, hash: '#city' }">
  {{ t('main_top.city.london') }}
</router-link>
          </div>
        </div>

        <router-link to="/events" class="navbar-link">
          <button class="btn">
            <i class="bx bxs-coupon ticket1" /><i class="bx bxs-coupon ticket2" />
            {{ t('main_top.tickets') }}
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import './MainTop.css';
</style>


<!-- <script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../../store/authStore';

const { t, locale } = useI18n();
const { user, isLogged } = useAuthStore();

const videoData = ref([
  {
    url: '/assets/videos/video11.mp4',
    titleKeys: [
      'main_top.testimonial_1_1',
      'main_top.testimonial_1_2',
      'main_top.testimonial_1_3',
      'main_top.testimonial_1_4',
    ],
  },
  {
    url: '/assets/videos/video44.mp4',
    titleKeys: [
      'main_top.testimonial_1_1',
      'main_top.testimonial_1_2',
      'main_top.testimonial_1_3',
      'main_top.testimonial_1_4',
    ],
  },
  {
    url: '/assets/videos/video55.mp4',
    titleKeys: [
      'main_top.testimonial_2_1',
      'main_top.testimonial_2_2',
      'main_top.testimonial_2_3',
      'main_top.testimonial_2_4',
    ],
  },
  {
    url: '/assets/videos/video66.mp4',
    titleKeys: [
      'main_top.testimonial_3_1',
      'main_top.testimonial_3_2',
      'main_top.testimonial_3_3',
      'main_top.testimonial_3_4',
    ],
  },
]);

const selectedVideo = computed(() => {
  const randomIndex = Math.floor(Math.random() * videoData.value.length);
  return videoData.value[randomIndex];
});

const translatedTitle = computed(() => {
  return selectedVideo.value.titleKeys.map(key => t(key)).join(' ');
});

watch(locale, () => {
  void translatedTitle.value;
});
</script>

<template>
  <div class="video-container">
    <video autoplay loop muted class="video">
      <source :src="selectedVideo.url" type="video/mp4">
      {{ t('main_top.video') }}
    </video>

    <a href="#service" class="circle-link">
      <div class="ripple-circle">
        <div class="arrow-down">
          <i class="bx bx-down-arrow-alt" />
        </div>
      </div>
    </a>
    <div class="mask" />
  </div>

  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <p v-if="isLogged" class="hero-subtitle">
          {{ t('main_top.welcome') }}, <b style="text-transform: capitalize">{{ user?.username }}</b>!
        </p>
        <div class="meta-wrapper">
          <div class="badge-wrapper">
            <div class="badge badge-fill">
              {{ t('main_top.badge_1') }}
            </div>
            <div class="badge badge-outline">
              {{ t('main_top.badge_2') }}
            </div>
            <div class="badge badge-fill">
              {{ t('main_top.badge_3') }}
            </div>
            <div class="badge badge-outline">
              {{ t('main_top.badge_4') }}
            </div>
            <div class="badge badge-fill">
              {{ t('main_top.badge_5') }}
            </div>
            <div class="badge badge-outline">
              {{ t('main_top.badge_6') }}
            </div>
          </div>
        </div>

        <h1 class="h1 hero-title">
          {{ translatedTitle }}
        </h1>

        <router-link to="/events" class="navbar-link">
          <button class="btn">
            <i class="bx bxs-coupon ticket1" /><i class="bx bxs-coupon ticket2" />
            {{ t('main_top.tickets') }}
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import './MainTop.css';
</style> -->
