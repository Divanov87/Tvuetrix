<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();
const isGoTopActive = ref(false);

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  isGoTopActive.value = window.scrollY > 100;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <footer class="footer">

    <div class="footer-top">
      <div class="container">
        <div class="footer-brand-wrapper">
          <router-link to="/" class="logo">
            <img src="/assets/images/theatrix-footer.svg" alt="logo">
          </router-link>
          <ul class="footer-list">
            <li>
              <router-link to="/events/theater" class="navbar-link">
                {{ t('footer.theater') }}
              </router-link>
            </li>
            <li>
              <router-link to="/events/concerts" class="navbar-link">
                {{ t('footer.concerts') }}
              </router-link>
            </li>
            <li>
              <router-link to="/contacts" class="navbar-link">
                {{ t('footer.contacts') }}
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="navbar-link">
                {{ t('footer.about') }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="divider" />
        <div class="quicklink-wrapper">
          <ul class="quicklink-list">
            <li>
              <router-link to="/" class="quicklink-link">
                {{ t('footer.faq') }}
              </router-link>
            </li>
            <li>
              <router-link to="/" class="quicklink-link">
                {{ t('footer.help_center') }}
              </router-link>
            </li>
            <li>
              <router-link to="/" class="quicklink-link">
                {{ t('footer.terms_of_use') }}
              </router-link>
            </li>
            <li>
              <router-link to="/" class="quicklink-link">
                {{ t('footer.privacy') }}
              </router-link>
            </li>
          </ul>
          <ul class="social-list">
            <li>
              <a href="https://fb.com/theatrix" class="navbar-social-link">
                <i class="bx bxl-facebook-circle" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/theatrix" class="navbar-social-link">
                <i class="bx bxl-instagram-alt" />
              </a>
            </li>
            <li>
              <a href="https://youtube.com/theatrix" class="navbar-social-link">
                <i class="bx bxl-youtube" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p class="copyright">
          &copy; 2024. A <strong>Dimitar.Ivanov87</strong> @ SoftUni, Project. All Rights Reserved
        </p>
      </div>
    </div>

    <a
      href="#top"
      class="go-top"
      :class="{ active: isGoTopActive }"
      @click="scrollTop"
    >
      <i class="bx bxs-chevron-up" />
    </a>
  </footer>
</template>

<style scoped>
@import './AppFooter.css';
</style>
