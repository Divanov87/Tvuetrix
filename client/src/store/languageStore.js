import { ref } from 'vue';
import { defineStore } from 'pinia';
import { i18n, i18next } from '../i18n';

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref(i18next.language || 'en');

  function changeLanguage() {
    const newLang = currentLanguage.value === 'en' ? 'bg' : 'en';
    currentLanguage.value = newLang;

    i18next.changeLanguage(newLang);
    i18n.global.locale.value = newLang;
  }

  return {
    currentLanguage,
    changeLanguage,
  };
});

