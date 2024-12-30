<script setup>
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getBulletins, removeBulletin } from '../../../dataProvider/bulletin';
import { formatDateAdmin } from '../../../libs/dateFormatter';
import { useAuthStore } from '../../../store/authStore';

const authStore = useAuthStore();
const { t } = useI18n();

const bulletins = ref([]);
const message = ref('');

async function fetchBulletins() {
  try {
    const response = await getBulletins();
    bulletins.value = response;
  }
  catch (error) {
    message.value = t('error.fetching_bulletins') && console.log(error);
  }
}

async function DeleteEvent(email) {
  if (authStore.user?.role === 'admin') {
    try {
      const response = await removeBulletin({ email });
      if (response.success) {
        bulletins.value = bulletins.value.filter(bulletin => bulletin.email !== email);
        Swal.fire({
          icon: 'success',
          title: t('cta.unsubscription_success'),
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
      }
      else {
        message.value = t('cta.unsubscription_error');
      }
    }
    catch (error) {
      console.error('Error deleting bulletin:', error);
      message.value = t('error.unsubscribing');
    }
  }
  else {
    Swal.fire(t('error.not_authorized'), '', 'error');
  }
}

function DeleteDialog(email) {
  if (authStore.user?.role === 'admin') {
    Swal.fire({
      title: t('admin.confirm_delete', { email }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('confirm.yes'),
      cancelButtonText: t('confirm.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteEvent(email);
      }
    });
  }
  else {
    Swal.fire(t('error.not_authorized'), '', 'error');
  }
}

onMounted(() => {
  fetchBulletins();
});
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        {{ t('admin.bulletins.section_subtitle') }}
      </p>
      <h2 class="h2 section-title">
        {{ t('admin.bulletins.title1') }} <strong>{{ t('admin.bulletins.title2') }}</strong>
      </h2>
      <p v-if="message" class="error">
        {{ message }}
      </p>
      <div class="container">
        <table class="user-table">
          <thead>
            <tr>
              <th v-for="column in ['email', 'subscribe_date', 'unsubscribe']" :key="column">
                {{ t(`admin.table.${column}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bulletin, index) in bulletins" :key="bulletin._id" :class="{ odd: index % 2 !== 0 }">
              <td>{{ bulletin.email }}</td>
              <td>{{ formatDateAdmin(bulletin.subscribedAt) }}</td>
              <td style="text-align: center">
                <i class="bx bx-trash trash-icon" @click="DeleteDialog(bulletin.email)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>

<style scoped>
@import '../AdminPanel.css';
</style>