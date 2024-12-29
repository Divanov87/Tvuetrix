<script setup>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
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
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  city: '',
});

const showPassword = ref(false);

const registrationError = ref('');
const focusedField = ref('');

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

const isFormInvalid = computed(() =>
  v$.value.$invalid || Object.values(formData.value).some(field => !field),
);

async function handleSubmit() {
  v$.value.$touch();

  if (!v$.value.$invalid) {
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

function setFocusedField(field) {
  focusedField.value = field;
}

function clearFocusedField() {
  focusedField.value = '';
}

watch(formData, () => {
  v$.value.$touch();
}, { deep: true });
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
                @focus="setFocusedField('username')"
                @blur="clearFocusedField"
              >
              <i class="bx bxs-user" />
            </div>
            <p v-if="focusedField === 'username' && v$.username.$error" class="error">
              {{ t('register.username_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :placeholder="t('register.password_placeholder')"
                @focus="setFocusedField('password')"
                @blur="clearFocusedField"
              >
              <i
                :class="showPassword ? 'bx bxs-lock-alt' : 'bx bxs-lock-open-alt'"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
              />
            </div>
            <p v-if="focusedField === 'password' && v$.password.$error" class="error">
              {{ t('register.password_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.repeatPassword"
                :type="showPassword ? 'text' : 'password'"
                name="repeatPassword"
                :placeholder="t('register.repeat_password_placeholder')"
                @focus="setFocusedField('repeatPassword')"
                @blur="clearFocusedField"
              >

              <i
                :class="showPassword ? 'bx bxs-lock-alt' : 'bx bxs-lock-open-alt'"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
              />
            </div>
            <p v-if="focusedField === 'repeatPassword' && v$.repeatPassword.$error" class="error">
              {{ t('register.repeat_password_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.email"
                type="email"
                name="email"
                :placeholder="t('register.email_placeholder')"
                @focus="setFocusedField('email')"
                @blur="clearFocusedField"
              >
              <i class="bx bx-mail-send" />
            </div>
            <p v-if="focusedField === 'email' && v$.email.$error" class="error">
              {{ t('register.email_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.city"
                type="text"
                name="city"
                :placeholder="t('register.city_placeholder')"
                @focus="setFocusedField('city')"
                @blur="clearFocusedField"
              >
              <i class="bx bxs-map" />
            </div>
            <p v-if="focusedField === 'city' && v$.city.$error" class="error">
              {{ t('register.city_error') }}
            </p>

            <p v-if="registrationError" class="error">
              {{ registrationError }}
            </p>

            <button
              type="submit"
              class="btn" :class="[{ 'btn-disabled': isFormInvalid }]"
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
