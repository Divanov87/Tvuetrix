<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
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

const errors = ref({
  name: '',
  email: '',
  phone: '',
});

const recaptchaResponse = ref('');
const grecaptchaLoaded = ref(false);

const validEmail = /^[\w.-]{3,}@(gmail\.com|abv\.bg|mail\.bg)$/;
const validPhone = /^\+359\d{9}$/;
const validName = /^[a-z\s]+$/i;

function validateField(field, value) {
  switch (field) {
    case 'name':
      errors.value.name = validName.test(value) ? '' : t('contacts.name_error');
      break;
    case 'email':
      errors.value.email = validEmail.test(value) ? '' : t('contacts.email_error');
      break;
    case 'phone':
      errors.value.phone = value === '' || validPhone.test(value) ? '' : t('contacts.phone_error');
      break;
  }
}

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
  if (!errors.value.name && !errors.value.email && !errors.value.phone) {
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
        Object.keys(errors.value).forEach(key => (errors.value[key] = ''));
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
                v-model="formData.name"
                type="text"
                name="name"
                :placeholder="t('contacts.name_placeholder')"
                required
                @input="validateField('name', formData.name)"
              >
              <i class="bx bxs-user" />
            </div>
            <p v-if="errors.name" class="error">
              {{ errors.name }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.email"
                type="email"
                name="email"
                :placeholder="t('contacts.email_placeholder')"
                required
                @input="validateField('email', formData.email)"
              >
              <i class="bx bx-mail-send" />
            </div>
            <p v-if="errors.email" class="error">
              {{ errors.email }}
            </p>

            <div class="input-box">
              <input
                v-model="formData.phone"
                type="text"
                name="phone"
                :placeholder="t('contacts.phone_placeholder')"
                @input="validateField('phone', formData.phone)"
              >
              <i class="bx bxs-phone-call contact" />
            </div>
            <p v-if="errors.phone" class="error">
              {{ errors.phone }}
            </p>

            <div class="input-box" style="padding-bottom: 190px;">
              <textarea
                v-model="formData.message"
                name="message"
                :placeholder="t('contacts.message_placeholder')"
                cols="30"
                rows="10"
                required
              />
            </div>

            <button class="btn">
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
/* .error {
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
} */
</style>
