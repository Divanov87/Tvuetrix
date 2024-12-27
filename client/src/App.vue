<script setup>
import AppHeader from './components/layout/AppHeader/AppHeader.vue';
import AppFooter from './components/layout/AppFooter/AppFooter.vue';

import PWABanner from './components/pwa-banner/PWABanner.vue';
import PWABadge from './components/PWABadge.vue';
import ScrollToTop from './components/ScrollToTop.vue';
</script>

<template>
  <AppHeader />
  <RouterView />
  <PWABadge />
  <PWABanner />
  <ScrollToTop />
  <AppFooter />
</template>

<style scoped>

</style>
