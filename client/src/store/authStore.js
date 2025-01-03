import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import router from '../configs/router';
import { loginService, logoutService, registerService } from '../dataProvider/user';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(Cookies.get('user') || null);
  const user = ref(null);

  const isLogged = computed(() => !!token.value);

  function setUserFromToken() {
    const tokenValue = Cookies.get('user');
    if (tokenValue) {
      try {
        user.value = jwtDecode(tokenValue);
      }
      catch (error) {
        console.error('Failed to decode token', error);
        user.value = null;
        Cookies.remove('user');
      }
    }
    else {
      user.value = null;
    }
  }

  async function login(username_email, password) {
    try {
      const userData = await loginService(username_email, password);
      token.value = userData.token;
      user.value = jwtDecode(userData.token);
      Cookies.set('user', userData.token, { expires: 400 });
    }
    catch (error) {
      console.error('Login failed', error);
      throw new Error('Invalid username/email or password');
    }
  }

  async function register(username, password, repeatPassword, email, city) {
    try {
      const userData = await registerService(username, password, repeatPassword, email, city);
      token.value = userData.token;
      user.value = jwtDecode(userData.token);
      Cookies.set('user', userData.token, { expires: 400 });
    }
    catch (error) {
      console.error('Registration failed', error);
      throw new Error('Username or email already exists!');
      
    }
  }

  async function logout() {
    try {
      await logoutService();
    }
    catch (error) {
      console.error('Logout failed', error);
    }
    finally {
      Cookies.remove('user');
      user.value = null;
      token.value = null;
      router.push('/auth/login');
    }
  }

  return {
    token,
    user,
    isLogged,
    setUserFromToken,
    login,
    register,
    logout,
  };
});
