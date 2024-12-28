<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../../store/authStore';
import { useLanguageStore } from '../../../store/languageStore';

const { t } = useI18n();
const authStore = useAuthStore();
authStore.setUserFromToken();

const languageStore = useLanguageStore();

const isNavbarActive = ref(false);
const isHeaderActive = ref(false);
const user = computed(() => authStore.user);
const isLogged = computed(() => authStore.isLogged);
const language = computed(() => languageStore.currentLanguage);

function toggleNavbar() {
  isNavbarActive.value = !isNavbarActive.value;
  document.body.classList.toggle('active');
}

function toggleLanguage() {
  languageStore.changeLanguage();
}

function handleScroll() {
  isHeaderActive.value = window.scrollY >= 10;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="header" :class="[isHeaderActive ? 'active' : '']" data-header>
    <div class="container">
      <div class="overlay" :class="[isNavbarActive ? 'active' : '']" data-overlay @click="toggleNavbar" />

      <router-link to="/" class="logo">
        <img src="/assets/images/theatrix.svg" alt="logo">
      </router-link>

      <div class="header-actions">
        <router-link v-if="!isLogged" to="/auth/login" class="navbar-link">
          <button class="btn btn-primary">
            {{ t('Sign_In') }}
          </button>
        </router-link>
      </div>

      <button class="language-switch menu-open-btn" @click="toggleLanguage">
        {{ language === 'en' ? 'БГ' : 'EN' }}
      </button>
      <button class="menu-open-btn" data-menu-open-btn @click="toggleNavbar">
        <i class="bx bxs-coupon icon1" /><i class="bx bxs-coupon icon2" />
      </button>

      <nav class="navbar" :class="[isNavbarActive ? 'active' : '']" data-navbar>
        <div class="navbar-top">
          <router-link to="/" class="logo">
            <img src="/assets/images/theatrix.svg" alt="logo">
          </router-link>
          <button class="menu-close-btn" data-menu-close-btn @click="toggleNavbar">
            <i class="bx bx-x menu" />
          </button>
        </div>

        <ul class="navbar-list">
          <li class="dropdown">
            <button class="dropbtn">
              <router-link to="/events/" class="navbar-link">
                {{ t('Events') }} <i class="bx bxs-chevron-down" />
              </router-link>
            </button>
            <div class="dropdown-content">
              <router-link to="/events/theater" class="navbar-link">
                {{ t('Theater') }}
              </router-link>
              <router-link to="/events/concerts" class="navbar-link">
                {{ t('Concerts') }}
              </router-link>
            </div>
          </li>

          <template v-if="isLogged">
            <router-link to="/search" class="navbar-link">
              {{ t('Search') }}
            </router-link>
            <li v-if="user?.role === 'user'">
              <router-link to="/profile" class="navbar-link">
                {{ t('Profile') }}
              </router-link>
            </li>

            <template v-if="user?.role === 'admin'">
              <li class="dropdown">
                <button class="dropbtn">
                  <router-link to="/admin-panel" class="navbar-link">
                    {{ t('Admin_Panel') }} <i class="bx bxs-chevron-down" />
                  </router-link>
                </button>
                <div class="dropdown-content">
                  <router-link to="/admin-panel/users" class="navbar-link">
                    {{ t('Users') }}
                  </router-link>
                  <router-link to="/admin-panel/messages" class="navbar-link">
                    {{ t('Messages') }}
                  </router-link>
                  <router-link to="/admin-panel/bulletin" class="navbar-link">
                    {{ t('Subscriptions') }}
                  </router-link>
                </div>
              </li>
              <li>
                <router-link to="/events/add" class="navbar-link">
                  {{ t('Add_Event') }}
                </router-link>
              </li>
            </template>

          </template>

          <template v-else>
            <li>
              <router-link to="/auth/register" class="navbar-link">
                {{ t('Register') }}
              </router-link>
            </li>
            <li>
              <router-link to="/auth/login" class="navbar-link">
                {{ t('Login') }}
              </router-link>
            </li>
          </template>

          <li>
            <router-link to="/gallery" class="navbar-link">
              {{ t('Gallery') }}
            </router-link>
          </li>
          <li>
            <router-link to="/blog" class="navbar-link">
              {{ t('Blog') }}
            </router-link>
          </li>
          <li>
            <router-link to="/contacts" class="navbar-link">
              {{ t('Contacts') }}
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="navbar-link">
              {{ t('About') }}
            </router-link>
          </li>
          <template v-if="isLogged">
          <li>
              <a class="navbar-link" style="cursor: pointer" @click="authStore.logout()">{{ t('Logout') }}</a>
            </li>
          </template>
        </ul>

        <ul class="navbar-social-list">
          <li>
            <router-link to="/" class="navbar-social-link">
              <i class="bx bxl-facebook-circle" />
            </router-link>
          </li>
          <li>
            <router-link to="/" class="navbar-social-link">
              <i class="bx bxl-instagram-alt" />
            </router-link>
          </li>
          <li>
            <router-link to="/" class="navbar-social-link">
              <i class="bx bxl-youtube" />
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import './AppHeader.css';
</style>