<script setup>
import QRCodeVue from 'qrcode.vue';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import Loader from '../../../components/Loader.vue';
import {
  buyTickets,
  cloneEvent,
  deleteEvent,
  getEvent,
  likeEvent,
  pinEvent,
  unlikeEvent,
  unpinEvent,
} from '../../../dataProvider/event.js';
import { formatDate } from '../../../libs/dateFormatter.js';

import { shareContent } from '../../../libs/userShare.js';
import { useAuthStore } from '../../../store/authStore.js';
import EventComments from './event-comments/EventComments.vue';
import EventMeta from './event-meta/EventMeta.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const eventId = ref(route.params.eventId);
const event = ref(null);
const isLoading = ref(true);

const showAll = ref(false);
const textButton = ref('[Read More]');

const currentUrl = ref('');

const user = authStore.user;
const isLogged = authStore.isLogged;

const userId = user?._id;
const eventData = { eventId: eventId.value, userId };

const formattedDate = computed(() => formatDate(event.value?.date));

onMounted(() => {
  currentUrl.value = window.location.href;
  fetchEvent();
});

watch(
  () => route.params.eventId,
  (newEventId) => {
    eventId.value = newEventId;
    fetchEvent();
  },
);

watch(
  () => route.fullPath,
  (newPath) => {
    currentUrl.value = `${window.location.origin}${newPath}`;
  }
)

function toggleReadMore() {
  showAll.value = !showAll.value;
  textButton.value = showAll.value ? '[Hide]' : '[Read More]';
}

async function fetchEvent() {
  try {
    isLoading.value = true;
    event.value = await getEvent(eventId.value);
  }
  catch (error) {
    console.error('Error fetching event:', error);
  }
  finally {
    isLoading.value = false;
  }
}

async function BuyTickets() {
      if (user?.role === 'user') {
        try {
          await buyTickets(eventData);
          const updatedEvent = await getEvent(eventId.value);
          event.value = updatedEvent;
        }
        catch (error) {
          console.error('Error buying tickets:', error);
        }
      }
    };

    function BuyDialog() {
      if (user?.role === 'user') {
        Swal.fire({
          title: 'Confirm buying tickets',
          // text: 'Are you sure you want to buy tickets for \n' + event.name + ' ?',
          html: `Are you sure you want to buy tickets for <br> <b style="color: white">"${event.value?.name}"</b> ?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'YES, buy tickets',
        }).then((result) => {
          if (result.isConfirmed) {
            BuyTickets();
            Swal.fire('Tickets bought successfully!', '', 'success');
          }
        });
      }
      else {
        Swal.fire('No rights to buy tickets!', '', 'error');
      }
    };


async function LikeEvent() {
  if (user?.role === 'user') {
    try {
      await likeEvent(eventData);
      const updatedEvent = await getEvent(eventId.value);
      event.value = updatedEvent;
    }
    catch (error) {
      console.error('Error liking event:', error);
    }
  }
}

async function UnlikeEvent() {
  if (user?.role === 'user') {
    try {
      await unlikeEvent(eventData);
      const updatedEvent = await getEvent(eventId.value);
      event.value = updatedEvent;
    }
    catch (error) {
      console.error('Error unliking event:', error);
    }
  }
}

async function PinEvent() {
  if (user?.role === 'admin') {
    try {
      await pinEvent(eventData);
      console.log('Event pinned successfully!');
      const pinnedEvent = await getEvent(eventId.value);
      event.value = pinnedEvent;
    }
    catch (error) {
      console.error('Error pinning event:', error);
    }
  }
}

function PinDialog() {
  if (user?.role === 'admin') {
    Swal.fire({
      title: 'Confirm adding to home page',
      html: `Are you sure you want to add <br> <b style="color: white">"${event.value.name}"</b> to home page?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, pin event',
    }).then((result) => {
      if (result.isConfirmed) {
        PinEvent();
        router.push('/');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Event pinned successfully!',
        });
      }
    });
  }
  else {
    Swal.fire({
      title: 'No rights to pin events!',
      icon: 'error',
    });
  }
}

async function UnpinEvent() {
  if (user?.role === 'admin') {
    try {
      await unpinEvent(eventData);
      const unpinnedEvent = await getEvent(eventId.value);
      event.value = unpinnedEvent;
      router.push('/');
    }
    catch (error) {
      console.error('Error unpinning event:', error);
    }
  }
}

async function UnpinDialog() {
  if (user?.role === 'admin') {
    Swal.fire({
      title: 'Confirm removing event from home page?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unpin event',
    }).then((result) => {
      if (result.isConfirmed) {
        UnpinEvent();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Event unpinned successfully',
        });
      }
    });
  }
  else {
    Swal.fire({
      title: 'No rights to pin events!',
      icon: 'error',
    });
  }
}

async function CloneEvent() {
  if (user?.role === 'admin') {
    try {
      const result = await Swal.fire({
        title: 'Confirm cloning event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, clone event',
      });

      if (result.isConfirmed) {
        const response = await cloneEvent(eventId.value);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: `<span style="color: var(--app-main-color);">${response}</span> cloned successfully!`,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        router.push('/events');
      }
    }
    catch (error) {
      console.error('Error cloning event:', error);
    }
  }
  else {
    console.log('Not Authorized!');
    Swal.fire({
      title: 'No rights to clone events!',
      icon: 'error',
    });
  }
}

async function DeleteEvent() {
  if (user?.role === 'admin') {
    try {
      await deleteEvent(eventId.value);
      router.push('/events');
    }
    catch (error) {
      console.error('Error deleting event:', error);
    }
  }
}

function DeleteDialog() {
  if (user?.role === 'admin') {
    Swal.fire({
      title: `Do you really want to \n DELETE \n"${event?.value?.name}" ?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete event',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteEvent();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: 'success',
          title: 'Event deleted successfully',
        });
      }
    });
  }
  else {
    Swal.fire('Not Authorized!', '', 'error');
  }
}
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        Events
      </p>
      <h2 class="h2 section-title">
        {{ event?.category?.toUpperCase() }} <strong>PERFORMANCE</strong>
      </h2>

      <Loader v-if="isLoading" />
      <template v-else>
        <div class="container">
          <figure class="movie-detail-banner">
            <img :src="event?.imageUrl" :alt="event?.name">
          </figure>

          <div class="movie-detail-content">
            <p class="detail-subtitle">
              <b class="badge badge-fill">{{ event?.genre }}</b> <b class="badge badge-outline">{{ event?.restriction }}+</b>
            </p>

            <h1 class="h1 detail-title" style="text-transform: uppercase">
              {{ event?.name }}
            </h1>

            <div class="meta-wrapper">
              <div class="date-time">
                <div class="location-badge" style="text-transform: capitalize">
                  <i class="bx bxs-map" />
                    <router-link :to="`/search?location=${event?.location}#city`">
                      <address>{{ event?.location }}</address>
                    </router-link>
                  <!-- <address>{{ event?.location }}</address> -->
                </div>
                |
                <div>
                  <i class="bx bx-calendar" />
                  <time :datetime="event?.date">{{ formattedDate }}</time>
                </div>
                |
                <div>
                  <i class="bx bx-time" />
                  <time>{{ event?.time }}</time>
                </div>
                |
                <div>
                  <i class="bx bx-timer" />
                  <time>{{ event?.duration }} min</time>
                </div>
              </div>
            </div>

            <p class="storyline">
              {{ showAll ? event?.description : `${event?.description?.slice(0, 250)}...` }}
              <button @click="toggleReadMore">
                {{ textButton }}
              </button>
            </p>

            <div v-if="isLogged" class="details-actions">
              <template v-if="user?.role === 'admin'">
                <router-link :to="`/events/${event?._id}/edit`">
                  <button class="share">
                    <i class="bx bx-edit-alt admin box-details" />
                    <span>Edit</span>
                  </button>
                </router-link>

                <button class="share" @click="event?.pinsList?.length ? UnpinDialog() : PinDialog()">
                  <i :class="`bx ${event?.pinsList?.length ? 'bxs-bell-ring bx-tada admin-pin' : 'bx-bell bx-tada-hover admin'} box-details`" />
                  <span>{{ event?.pinsList?.length ? 'Pinned!' : 'Pin' }}</span>
                </button>

                <button class="share" @click="CloneEvent">
                  <i :class="`bx ${event?.name?.includes('_') ? 'bxs-error bx-flashing' : 'bx-copy-alt'} admin box-details`" />
                  <span>{{ event?.name?.includes('_') ? 'Cloned!' : 'Clone' }}</span>
                </button>

                <button class="share">
                  <i class="bx bxs-coupon admin admin-coupon box-details" />
                  <span>{{ event?.ticketsLeft - 1 }}</span>
                </button>

                <button class="share" @click="DeleteDialog">
                  <i class="bx bx-trash admin box-details" />
                  <span>Delete</span>
                </button>
              </template>

              <template v-else-if="user?.role === 'user'">
                <button class="share" @click="shareContent">
                  <i class="bx bx-share-alt bx-tada-hover box-details" />
                  <span>Share</span>
                </button>

                <button class="share" @click="event?.isLiked ? UnlikeEvent() : LikeEvent()">
                  <i :class="`bx ${event?.isLiked ? 'bxs-heart user-heart' : 'bx-heart bx-burst-hover'} box-details`" />
                  <span>{{ event?.isLiked ? event?.likesList?.length : 'Like' }}</span>
                </button>

                <button class="share">
                  <i class="bx bxs-coupon admin admin-coupon box-details" style="color: white" />
                  <span>{{ event?.ticketsLeft - 1 }}</span>
                </button>

                <button
                  :class="event?.ticketsLeft - 1 > 0 ? 'btn btn-primary' : 'sold-out'"
                  @click="event?.ticketsLeft - 1 > 0 ? BuyDialog() : undefined"
                >
                  {{ event?.ticketsLeft - 1 > 0 ? 'Buy Tickets' : 'Sold out' }}
                </button>
              </template>
            </div>
          </div>
          <div class="download-btn">
            <QRCodeVue
              :value="currentUrl" :size="125" level="M" background="#fff"
              foreground="#e60a15"
            />
            <span class="qr"><span>Scan me!</span></span>
          </div>
        </div>
      </template>
    </section>
    <EventMeta />
    <EventComments />
  </article>
</template>

<style scoped>
@import './EventDetails.css';
</style>
