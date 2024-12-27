<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { addBulletin, removeBulletin } from '../../../../dataProvider/bulletin';

const { t } = useI18n();

const email = ref('');
const message = ref('');

const validEmail = /^[\w.-]{3,}@(?:gmail\.com|abv\.bg|mail\.bg)$/;

async function handleSubmit(e) {
  e.preventDefault();
  if (!validEmail.test(email.value)) {
    Swal.fire({
      icon: 'error',
      title: t('cta.invalid_email'),
      text: t('cta.valid_email_prompt'),
    });
    return;
  }

  try {
    const response = await addBulletin({ email: email.value });
    if (response.success) {
      message.value = t('cta.successfully_subscribed');
      Swal.fire({
        icon: 'success',
        title: t('cta.subscribed'),
        text: t('cta.subscription_success'),
        timer: 3000,
        showConfirmButton: false,
      });
      email.value = '';
    }
    else if (response.message === 'Email already subscribed') {
      Swal.fire({
        title: t('cta.email_already_subscribed'),
        text: t('cta.unsubscribe_prompt'),
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: t('cta.cancel'),
        confirmButtonText: t('cta.unsubscribe'),
      }).then(async (result) => {
        if (result.isConfirmed) {
          const unsubscribeResponse = await removeBulletin({ email: email.value });
          if (unsubscribeResponse.success) {
            message.value = t('cta.successfully_unsubscribed');
            Swal.fire({
              icon: 'success',
              title: t('cta.unsubscribed'),
              text: t('cta.unsubscription_success'),
              timer: 3000,
              showConfirmButton: false,
            });
            email.value = '';
          }
          else {
            message.value = t('cta.unsubscription_error');
            Swal.fire({
              icon: 'error',
              title: t('cta.error'),
              text: t('cta.unsubscription_error'),
            });
          }
        }
      });
    }
    else {
      message.value = t('cta.subscription_error');
      Swal.fire({
        icon: 'error',
        title: t('cta.error'),
        text: t('cta.subscription_error'),
      });
    }
  }
  catch (error) {
    error.value = t('cta.general_error');
    Swal.fire({
      icon: 'error',
      title: t('cta.error'),
      text: t('cta.general_error'),
    });
  }
}
</script>

<template>
  <section class="cta">
    <div class="container">
      <div class="title-wrapper">
        <h2 class="cta-title">
          {{ t('cta.subscribe_for') }}
          <strong>{{ t('cta.free') }}</strong>
          {{ t('cta.bulletin') }}
        </h2>
        <p class="cta-text">
          {{ t('cta.text') }}
        </p>
      </div>
      <form class="cta-form" @submit="handleSubmit">
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          required
          :placeholder="t('cta.enter_email_placeholder')"
          class="email-field"
        >
        <button type="submit" class="cta-form-btn">
          {{ t('cta.get_started') }}
        </button>
      </form>
      <p v-if="message" class="message">
        {{ message }}
      </p>
    </div>
  </section>
</template>

<style scoped>
@import './CTAForm.css';
</style>
