<script setup>
import AppHeader from './components/layout/AppHeader/AppHeader.vue';
import AppFooter from './components/layout/AppFooter/AppFooter.vue';

import PWABanner from './components/pwa-banner/PWABanner.vue';
import PWABadge from './components/PWABadge.vue';
</script>

<template>
  <AppHeader />
  <RouterView />
  <PWABadge />
  <PWABanner />
  <AppFooter />
</template>

<style scoped>

</style>
