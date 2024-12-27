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
    cta: {
      subscribe_for: 'Subscribe for our',
      free: 'FREE',
      bulletin: 'bulletin',
      text: 'Get weekly updates about the hottest performances and events, exclusive discounts, & more!',
      get_started: 'Get started',
      invalid_email: 'Invalid Email',
      valid_email_prompt: 'Please enter a valid email address!',
      successfully_subscribed: 'Successfully subscribed!',
      subscribed: 'Subscribed!',
      subscription_success: 'Successfully subscribed to bulletin.',
      email_already_subscribed: 'Email already subscribed',
      unsubscribe_prompt: 'Do you want to unsubscribe instead?',
      unsubscribe: 'Yes, unsubscribe',
      cancel: 'Cancel',
      successfully_unsubscribed: 'Successfully unsubscribed!',
      unsubscribed: 'Unsubscribed!',
      unsubscription_success: 'Successfully unsubscribed from bulletin!',
      unsubscription_error: 'Failed to unsubscribe. Try again later.',
      error: 'Error',
      subscription_error: 'Failed to subscribe. Try again later.',
      general_error: 'An error occurred. Please try again.',
      enter_email_placeholder: 'Enter your email..',
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
  cta: {
    subscribe_for: 'Абонирай се за нашия',
    free: 'БЕЗПЛАТЕН',
    bulletin: 'бюлетин',
    text: 'Получавайте седмични актуализации за най-горещите изпълнения и събития, ексклузивни отстъпки и още!',
    get_started: 'Започнете',
    invalid_email: 'Невалиден имейл',
    valid_email_prompt: 'Моля, въведете валиден имейл адрес!',
    successfully_subscribed: 'Успешно абониран!',
    subscribed: 'Абониран!',
    subscription_success: 'Успешно абониран за бюлетин!',
    email_already_subscribed: 'Имейлът вече е абониран',
    unsubscribe_prompt: 'Искате ли вместо това да се отпишете?',
    unsubscribe: 'Да, отпиши ме',
    cancel: 'Откажи',
    successfully_unsubscribed: 'Успешно отписан!',
    unsubscribed: 'Отписан!',
    unsubscription_success: 'Успешно отписан от бюлетин!',
    unsubscription_error: 'Неуспешно отписване. Опитайте отново по-късно.',
    error: 'Грешка',
    subscription_error: 'Неуспешно абониране. Опитайте отново по-късно.',
    general_error: 'Възникна грешка. Моля, опитайте отново.',
    enter_email_placeholder: 'Въведете имейла си..',
  },
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
