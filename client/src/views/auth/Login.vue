<script setup>
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { computed, onMounted, ref, watch } from 'vue';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/authStore';

const authStore = useAuthStore();
authStore.setUserFromToken();

const router = useRouter();
const isLogged = computed(() => authStore.isLogged);

onMounted(() => {
  if (isLogged.value) {
    router.push('/');
  }
});

const { t } = useI18n();

const formData = ref({
  username_email: '',
  password: '',
});

const showPassword = ref(false);
const loginError = ref('');
const focusedField = ref('');

const validations = computed(() => ({
  username_email: {
    required,
    minLength: minLength(3),
  },
  password: {
    required,
    minLength: minLength(8),
  },
}));

const v$ = useVuelidate(validations, formData);

const isFormInvalid = computed(() =>
  v$.value.$invalid || Object.values(formData.value).some(field => !field),
);

function setFocusedField(field) {
  focusedField.value = field;
  v$.value.$touch();
}

function clearFocusedField() {
  focusedField.value = '';
}

async function handleSubmit() {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    try {
      await authStore.login(formData.value.username_email, formData.value.password);
      router.push('/');
    } catch (error) {
      loginError.value = t('login.invalid_login') || console.log(error);
    }
  } else {
    loginError.value = t('login.fill_required_fields');
  }
};

function passShowHandler() {
  showPassword.value = !showPassword.value;
}

watch(formData, () => {
  v$.value.$touch();
}, { deep: true });
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        {{ t('login.title') }}
      </p>
      <div class="container-reg-log-edit">
        <div class="wrapper">
          <form @submit.prevent="handleSubmit">
            <h1>{{ t('login.title') }}</h1>

            <div class="input-box">
              <input
                v-model="formData.username_email"
                type="text"
                name="username_email"
                :placeholder="t('login.username_email_placeholder')"
                autocomplete="username_email"
                @focus="setFocusedField('username_email')"
                @blur="clearFocusedField"
              >
              <i class="bx bxs-user" />
            </div>

            <p v-if="focusedField === 'username_email' && v$.username_email.$error" class="error">
              {{ t('login.username_email_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :placeholder="t('login.password_placeholder')"
                autocomplete="current-password"
                @focus="setFocusedField('password')"
                @blur="clearFocusedField"
              >
              <i :class="showPassword ? 'bx bxs-lock-open-alt' : 'bx bxs-lock-alt'" style="cursor: pointer" @click="passShowHandler" />
            </div>

            <p v-if="focusedField === 'password' && v$.password.$error" class="error">
              {{ t('login.password_error') }}
            </p>

            <p v-if="loginError" class="error">
              {{ loginError }}
            </p>

            <button type="submit" class="btn" :disabled="isFormInvalid">
              {{ t('login.login_button') }}
            </button>

            <div class="register-link">
              <p>
                <strong>
                  {{ t('login.register_prompt') }}
                  <router-link to="/auth/register">
                    {{ t('login.register_link') }}
                  </router-link>
                </strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import './Auth.css';
</style>
