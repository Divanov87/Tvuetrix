<script setup>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import { computed, onMounted, ref } from 'vue';

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
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  city: '',
});

const showPassword = ref(false);

const registrationError = ref('');

const validations = computed(() => ({
  username: {
    required,
    minLength: minLength(3),
  },
  password: {
    required,
    minLength: minLength(8),
  },
  repeatPassword: {
    required,
    sameAsPassword: sameAs(formData.value.password),
  },
  email: {
    required,
    email,
    validEmailDomain: value => /^[\w.-]+@(?:gmail\.com|abv\.bg|mail\.bg)$/.test(value),
  },
  city: {
    required,
    minLength: minLength(3),
  },
}));

const v$ = useVuelidate(validations, formData);

const isFormInvalid = computed(() => v$.value.$invalid);

async function handleSubmit() {

  if (!isFormInvalid.value) {
    try {
      await authStore.register(
        formData.value.username,
        formData.value.password,
        formData.value.repeatPassword,
        formData.value.email,
        formData.value.city,
      );
      router.push('/');
    } catch (error) {
      registrationError.value = t('register.registration_error', {
        username: formData.value.username,
        email: formData.value.email,
      }) || console.log(error);
    }
  } else {
    registrationError.value = t('register.fill_required_fields');
  }
}

</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        {{ t('register.title') }}
      </p>
      <div class="container-reg-log-edit">
        <div class="wrapper">
          <form @submit.prevent="handleSubmit">
            <h1>{{ t('register.title') }}</h1>

            <div class="input-box">
              <input
                v-model="formData.username"
                type="text"
                name="username"
                :placeholder="t('register.username_placeholder')"
                @blur="v$.username.$touch()"
              >
              <i class="bx bxs-user" />
            </div>
            <p v-if="v$.username.$error" class="error">
              {{ t('register.username_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :placeholder="t('register.password_placeholder')"
                @blur="v$.password.$touch()"
              >
              <i
                :class="showPassword ? 'bx bxs-lock-alt' : 'bx bxs-lock-open-alt'"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
              />
            </div>
            <p v-if="v$.password.$error" class="error">
              {{ t('register.password_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.repeatPassword"
                :type="showPassword ? 'text' : 'password'"
                name="repeatPassword"
                :placeholder="t('register.repeat_password_placeholder')"
                 @blur="v$.repeatPassword.$touch()"
              >

              <i
                :class="showPassword ? 'bx bxs-lock-alt' : 'bx bxs-lock-open-alt'"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
              />
            </div>
            <p v-if="v$.repeatPassword.$error" class="error">
              {{ t('register.repeat_password_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.email"
                type="email"
                name="email"
                :placeholder="t('register.email_placeholder')"
                 @blur="v$.email.$touch()"
              >
              <i class="bx bx-mail-send" />
            </div>
            <p v-if="v$.email.$error" class="error">
              {{ t('register.email_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.city"
                type="text"
                name="city"
                :placeholder="t('register.city_placeholder')"
                @blur="v$.city.$touch()"
              >
              <i class="bx bxs-map" />
            </div>
            <p v-if="v$.city.$error" class="error">
              {{ t('register.city_error') }}
            </p>

            <p v-if="registrationError" class="error">
              {{ registrationError }}
            </p>

            <button
              type="submit"
              class="btn"
              :disabled="isFormInvalid"
              :style="{
                backgroundColor: isFormInvalid ? 'grey' : '',
                cursor: isFormInvalid ? 'not-allowed' : 'pointer',
                color: isFormInvalid ? 'white' : '',
              }"
            >
              {{ $t('register.registration_button') }}
            </button>

            <div class="register-link">
              <p>
                <strong>
                  {{ t('register.login_prompt') }}
                  <router-link to="/auth/login">
                    {{ t('register.login_link') }}
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
