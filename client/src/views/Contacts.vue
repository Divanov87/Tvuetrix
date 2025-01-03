<script setup>
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { addMessage } from '../dataProvider/message';

const { t } = useI18n();
const router = useRouter();

const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const grecaptchaLoaded = ref(false);
const recaptchaResponse = ref('');

const separateNames = helpers.regex(/^[A-ZА-Я][a-zа-я]+ [A-ZА-Я][a-zа-я]+$/);

const validations = computed(() => ({
  name: {
    required,
    separateNames: helpers.withMessage(t('contacts.name_error'), separateNames),
  },
  email: {
    required,
    email,
    validEmailDomain: value => /^[\w.-]+@(?:gmail\.com|abv\.bg|mail\.bg)$/.test(value),
  },
  phone: {
    required,
    numeric,
    minLength: minLength(10),
    maxLength: maxLength(10),
  },
  message: {
    required,
    minLength: minLength(10),
  },
}));

const v$ = useVuelidate(validations, formData);

const isFormInvalid = computed(() => v$.value.$invalid);

async function executeRecaptcha() {
  if (!grecaptchaLoaded.value) {
    Swal.fire(t('contacts.recaptcha_error'), '', 'error');
    throw new Error('reCAPTCHA script not loaded');
  }
  try {
    const token = await grecaptcha.execute(RECAPTCHA_KEY, { action: 'submit' });
    recaptchaResponse.value = token;
    return token;
  }
  catch (error) {
    Swal.fire(t('contacts.recaptcha_error'), '', 'error');
    throw error;
  }
}

async function handleSubmit() {

  if (!isFormInvalid.value) {
    v$.value.$touch();

    const confirm = await Swal.fire({
      title: t('contacts.confirmation_prompt'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: t('contacts.confirm_button'),
    });

    if (confirm.isConfirmed) {
      try {
        const token = await executeRecaptcha();
        recaptchaResponse.value = token;

        await addMessage({ ...formData.value, recaptchaToken: recaptchaResponse.value });
        router.push('/');

        Swal.fire({
          icon: 'success',
          title: t('contacts.success_message'),
          showConfirmButton: false,
          timer: 3000,
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
        });

        Object.keys(formData.value).forEach(key => (formData.value[key] = ''));
      
        recaptchaResponse.value = '';
      }
      catch (error) {
        Swal.fire(t('contacts.submission_error'), '', 'error');
      }
    }
  }
  else {
    Swal.fire(t('contacts.form_error'), '', 'error');
  }
}

onMounted(() => {
  const scriptSrc = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;
  if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => {
      grecaptchaLoaded.value = true;
      console.log('reCAPTCHA script loaded successfully');
    };
    script.onerror = () => {
      grecaptchaLoaded.value = false;
      console.error('Failed to load reCAPTCHA script');
    };
    document.head.appendChild(script);
  }
  else {
    grecaptchaLoaded.value = true;
  }
});
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        {{ t('contacts.title') }}
      </p>
      <div class="container-reg-log-edit">
        <div class="wrapper">
          <form @submit.prevent="handleSubmit">
            <h1>{{ t('contacts.title') }}</h1>

            <div class="input-box">
              <input
                v-model="formData.name" type="text" name="name" :placeholder="t('contacts.name_placeholder')"
                required @blur="v$.name.$touch()"
              >
              <i class="bx bxs-user" />
            </div>
            <p v-if="v$.name.$error" class="error">
              {{ t('contacts.name_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.email" type="email" name="email" :placeholder="t('contacts.email_placeholder')"
                required @blur="v$.email.$touch()"
              >
              <i class="bx bx-mail-send" />
            </div>
            <p v-if="v$.email.$error" class="error">
              {{ t('contacts.email_error') }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.phone" type="text" name="phone" :placeholder="t('contacts.phone_placeholder')"
                @blur="v$.phone.$touch()"
              >
              <i class="bx bxs-phone-call contact" />
            </div>
            <p v-if="v$.phone.$error" class="error">
              {{ t('contacts.phone_error') }}
            </p>

            <div class="input-box" style="padding-bottom: 190px;">
              <textarea
                v-model="formData.message" name="message" :placeholder="t('contacts.message_placeholder')"
                cols="30" rows="10" required @blur="v$.message.$touch()"
              />
            </div>
            <p v-if="v$.message.$error" class="error">
              {{ t('contacts.message_error') }}
            </p>

            <button type="submit" class="btn">
              {{ t('contacts.send_button') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import './auth/Auth.css';
</style>
