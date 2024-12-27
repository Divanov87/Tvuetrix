import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { createI18n } from 'vue-i18n';

const resources = {
  en: {
    Home: 'Home',
    Events: 'Events',
    Theater: 'Theater',
    Concerts: 'Concerts',
    Search: 'Search',
    Profile: 'Profile',
    Admin_Panel: 'Admin Panel',
    Users: 'Users',
    Messages: 'Messages',
    Subscriptions: 'Subscriptions',
    Add_Event: 'Add Event',
    Logout: 'Logout',
    Register: 'Register',
    Login: 'Login',
    Gallery: 'Gallery',
    Blog: 'Blog',
    Contacts: 'Contacts',
    About: 'About',
    Sign_In: 'Sign in',
    footer: {
      theater: 'Theater',
      concerts: 'Concerts',
      contacts: 'Contacts',
      about: 'About',
      faq: 'FAQ',
      help_center: 'Help Center',
      terms_of_use: 'Terms of Use',
      privacy: 'Privacy',
    },
  },
  bg: {
    Home: 'Начало',
    Events: 'Събития',
    Theater: 'Театър',
    Concerts: 'Концерти',
    Search: 'Търсене',
    Profile: 'Профил',
    Admin_Panel: 'Админ панел',
    Users: 'Потребители',
    Messages: 'Съобщения',
    Subscriptions: 'Абонаменти',
    Add_Event: 'Добави',
    Logout: 'Изход',
    Register: 'Регистрация',
    Login: 'Вход',
    Gallery: 'Галерия',
    Blog: 'Блог',
    Contacts: 'Контакти',
    About: 'За нас',
    Sign_In: 'Влез',
  },
  footer: {
    theater: 'Театър',
    concerts: 'Концерти',
    contacts: 'Контакти',
    about: 'За нас',
    faq: 'ЧЗВ',
    help_center: 'Помощeн център',
    terms_of_use: 'Условия за ползване',
    privacy: 'Поверителност',
  },
};

i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  });

const i18n = createI18n({
  legacy: false,
  locale: i18next.language,
  fallbackLocale: 'en',
  messages: resources,
});


i18next.on('languageChanged', (lng) => {
  i18n.global.locale.value = lng;
});

export { i18n, i18next };
