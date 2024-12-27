<script setup>
import usePWABanner from './usePWABanner';

const { isActive, addToHomeScreen, closeBlockInstall } = usePWABanner();
</script>

<template>
  <div v-if="isActive" id="BlockInstall" class="blockInstall">
    <div class="inner">
      <div id="BlockInstallClose" class="close" @click="closeBlockInstall">
        <span>
          <i class="bx bx-x" style="font-size: 38px" />
        </span>
      </div>
      <div class="logo">
        <img src="/assets/pwa/favicon-196.png" alt="PWA Icon" style="border-radius: 30%">
      </div>
      <div class="name">
        <span class="title">Theatrix.com</span>
        <span class="description">Theater & Concerts</span>
      </div>
      <div class="cta">
        <button id="install-btn" class="btn" @click="addToHomeScreen">
          Install
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './PWABanner.css';

/* .blockInstall {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 10px;
}

.inner {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 400px;
}

.close {
  margin-right: auto;
  cursor: pointer;
}

.logo img {
  width: 48px;
  height: 48px;
}

.name {
  margin-left: 10px;
}

.name .title {
  font-weight: bold;
}

.name .description {
  font-size: 0.9em;
  color: gray;
}

.cta .btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cta .btn:hover {
  background: #0056b3;
} */
</style>
