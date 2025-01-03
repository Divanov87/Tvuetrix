<script setup>
import useVuelidate from '@vuelidate/core';
import { between, maxLength, minLength, numeric, required, url } from '@vuelidate/validators';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createEvent } from '../../../dataProvider/event';

const router = useRouter();
const route = useRoute();
const today = ref(new Date().toISOString().split('T')[0]);
const eventId = route.params.eventId;

const eventForm = ref({
  name: '',
  imageUrl: '',
  tickets: '',
  genre: '',
  restriction: '',
  duration: '',
  rating: '',
  date: '',
  time: '',
  location: '',
  category: '',
  description: '',
});

const validations = computed(() => ({
  name: { required, minLength: minLength(2), maxLength: maxLength(35) },
  imageUrl: { required, url },
  tickets: { required, numeric, between: between(1, 500) },
  genre: { required, minLength: minLength(4), maxLength: maxLength(12) },
  restriction: { required, numeric, between: between(0, 18) },
  duration: { required, between: between(60, 180) },
  rating: { required, between: between(0, 10) },
  date: { required },
  time: { required },
  location: { required, minLength: minLength(3) },
  category: { required },
  description: { required, minLength: minLength(10) },
}));

const v$ = useVuelidate(validations, eventForm);

const isFormInvalid = computed(() => v$.value.$invalid);

async function submitHandler() {

  if (!isFormInvalid.value) {
    try {
      await createEvent(eventForm.value, eventId);
      console.log('Event edited successfully');
      router.push('/events');
    }
    catch (error) {
      console.error('Error editing event:', error);
    }
  }
  else {
    console.log('Please fill in all required fields with valid inputs.');
  }
}
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        Add Event
      </p>
      <div class="container-reg-log-edit">
        <div class="wrapper">
          <form @submit.prevent="submitHandler">
            <h1>Add <strong>Record</strong></h1>

            <div class="input-box">
              <input
                v-model="eventForm.name"
                type="text"
                name="name"
                placeholder="Title"
                minlength="2"
                required
                @blur="v$.name.$touch()"
              >
            </div>
            <p v-if="v$.name.$error" class="error">
              Title must be between 2 and 35 characters long
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.imageUrl"
                type="url"
                name="imageUrl"
                placeholder="Cover (https://...)"
                required
                @blur="v$.imageUrl.$touch()"
              >
            </div>
            <p v-if="v$.imageUrl.$error" class="error">
              Please provide a valid URL for the cover image.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.tickets"
                type="number"
                name="tickets"
                placeholder="Tickets"
                step="1"
                min="1"
                max="500"
                required
                @blur="v$.tickets.$touch()"
              >
            </div>
            <p v-if="v$.tickets.$error" class="error">
              Tickets must be between 1 and 500.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.genre"
                type="text"
                name="genre"
                placeholder="Genre"
                minlength="4"
                maxlength="12"
                required
                @blur="v$.genre.$touch()"
              >
            </div>
            <p v-if="v$.genre.$error" class="error">
              Genre must be between 4 and 12 characters long.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.restriction"
                type="number"
                name="restriction"
                placeholder="Restriction (0, 12, 16, 18)"
                step="2"
                min="0"
                max="18"
                required
                @blur="v$.restriction.$touch()"
              >
            </div>
            <p v-if="v$.restriction.$error" class="error">
              Restriction must be one of 0, 12, 16, or 18.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.duration"
                type="number"
                name="duration"
                placeholder="Duration"
                step="1"
                min="60"
                max="180"
                required
                @blur="v$.duration.$touch()"
              >
            </div>
            <p v-if="v$.duration.$error" class="error">
              Duration must be between 60 and 180 minutes.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.rating"
                type="number"
                name="rating"
                placeholder="Rating"
                min="0"
                max="10"
                step="0.1"
                required
                @blur="v$.rating.$touch()"
              >
            </div>
            <p v-if="v$.rating.$error" class="error">
              Rating must be between 0 and 10.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.date"
                type="date"
                name="date"
                :min="today"
                required
                @blur="v$.date.$touch()"
              >
            </div>
            <p v-if="v$.date.$error" class="error">
              Date is required.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.time"
                type="time"
                name="time"
                required
                @blur="v$.time.$touch()"
              >
            </div>
            <p v-if="v$.time.$error" class="error">
              Time is required.
            </p>

            <div class="input-box">
              <input
                v-model="eventForm.location"
                type="text"
                name="location"
                placeholder="Location"
                minlength="3"
                required
                @blur="v$.location.$touch()"
              >
            </div>
            <p v-if="v$.location.$error" class="error">
              Location must be at least 3 characters long.
            </p>

            <div class="input-box">
              <select
                v-model="eventForm.category"
                name="category"
                required
                @blur="v$.category.$touch()"
              >
                <option value="" disabled hidden>
                  Category
                </option>
                <option value="Concert">
                  Concert
                </option>
                <option value="Theater">
                  Theater
                </option>
              </select>
            </div>
            <p v-if="v$.category.$error" class="error">
              Category is required.
            </p>

            <div class="input-box" style="padding-bottom: 190px">
              <textarea
                v-model="eventForm.description"
                name="description"
                placeholder="Description..."
                cols="30"
                rows="10"
                required
                @blur="v$.description.$touch()"
              />
            </div>
            <p v-if="v$.description.$error" class="error">
              Description must be at least 10 characters long.
            </p>

            <div v-if="isFormInvalid" class="error">
              Please fill in all required fields with valid inputs.
            </div>

            <div class="input-box" style="padding-bottom: 35px">
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
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import '../../../views/auth/Auth.css';
</style>
