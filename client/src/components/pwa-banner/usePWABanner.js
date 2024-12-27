import Cookies from 'js-cookie';
import { onBeforeUnmount, onMounted, ref } from 'vue';

export default function usePWABanner() {
  const isActive = ref(false);

  const addToHomeScreen = () => {
    if (window.promptEvent) {
      window.promptEvent.prompt();
      window.promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        }
        else {
          console.log('User dismissed the A2HS prompt');
        }
        window.promptEvent = null;
      });

      Cookies.set('pwa', 'true', { expires: 400, path: '/', secure: true, sameSite: 'None' });
      isActive.value = false;
    }
  };

  const closeBlockInstall = () => {
    isActive.value = false;
  };

  const checkScrollPosition = () => {
    const platform = navigator.userAgent.toUpperCase();
    if (!/ANDROID|IOS/.test(platform)) {
      isActive.value = false;
      return;
    }
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    isActive.value = scrollPercent >= 20 && !Cookies.get('pwa');
  };

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      if (!Cookies.get('pwa')) {
        isActive.value = true;
      }
      window.promptEvent = event;
    });

    window.addEventListener('scroll', checkScrollPosition);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkScrollPosition);
  });

  return {
    isActive,
    addToHomeScreen,
    closeBlockInstall,
  };
}
