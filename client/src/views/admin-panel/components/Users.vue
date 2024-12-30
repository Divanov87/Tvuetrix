<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Loader from '../../../components/Loader.vue';
import { getUsersActivity } from '../../../dataProvider/event';
import { formatDateAdmin } from '../../../libs/dateFormatter';

const { t } = useI18n();

const usersStatus = ref([]);
const sortedUsers = ref([]);
const sortDirection = ref([]);
const sortColumn = ref(null);
const isLoading = ref(true);
const onlineStatusRefs = ref([]);

async function fetchUsers() {
  isLoading.value = true;
  try {
    const response = await getUsersActivity();
    usersStatus.value = response;
    sortedUsers.value = [...response];
    isLoading.value = false;

    response.forEach((user) => {
      onlineStatusRefs.value[user._id] = user.online;
    });
  }
  catch (error) {
    console.error('Error fetching users:', error);
    isLoading.value = false;
  }
}

async function fetchOnlineStatuses() {
  try {
    const response = await getUsersActivity();
    response.forEach((user) => {
      const isOnline = user.online;
      const dotElement = onlineStatusRefs.value[user._id];
      if (dotElement) {
        dotElement.style.backgroundColor = isOnline ? 'limegreen' : 'gray';
        dotElement.style.animation = isOnline ? '_badge-pulsate 2s infinite' : '';
      }
    });
  }
  catch (error) {
    console.error('Error fetching online statuses:', error);
  }
}

onMounted(() => {
  fetchUsers();
  const interval = setInterval(fetchOnlineStatuses, 5000);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});

const getPropertyValue = (obj, column) => obj[column];

function sort(column) {
  const direction = sortColumn.value === column ? !sortDirection.value[column] : true;
  sortColumn.value = column;
  sortDirection.value[column] = direction;

  sortedUsers.value = [...sortedUsers.value].sort((a, b) => {
    const aValue = getPropertyValue(a, column);
    const bValue = getPropertyValue(b, column);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return direction ? comparison : -comparison;
    }
    else {
      return direction ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1);
    }
  });
}
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        {{ t('admin.section_subtitle') }}
      </p>
      <h2 class="h2 section-title">
        {{ t('admin.title1') }} <strong>{{ t('admin.title2') }}</strong>
      </h2>
      <div v-if="isLoading">
        <Loader />
      </div>
      <div v-else class="container">
        <table class="user-table">
          <thead>
            <tr>
              <th
                v-for="column in ['id', 'username', 'role', 'email', 'city', 'registration_ip', 'last_login_ip', 'registration_date', 'last_login_date', 'online']"
                :key="column"
                @click="sort(column)"
              >
                {{ t(`admin.table.${column}`) }}
                <i
                  :class="[
                    sortColumn !== column
                      ? ''
                      : sortDirection[column]
                        ? 'bx bx-caret-up'
                        : 'bx bx-caret-down',
                  ]"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in sortedUsers"
              :key="user._id"
              :class="{ odd: index % 2 !== 0 }"
            >
              <td data-label="ID">
                {{ user._id }}
              </td>
              <td data-label="Username">
                {{ user.username }}
              </td>
              <td data-label="Role">
                {{ user.role }}
              </td>
              <td data-label="Email">
                {{ user.email }}
              </td>
              <td data-label="City">
                {{ user.city }}
              </td>
              <td data-label="Registration IP">
                {{ user.registrationIp || '-' }}
              </td>
              <td data-label="Last Login IP">
                {{ user.lastLoginIp || '-' }}
              </td>
              <td data-label="Registration Date">
                {{ formatDateAdmin(user.registrationDate) }}
              </td>
              <td data-label="Last Login Date">
                {{ formatDateAdmin(user.lastLoginDate) }}
              </td>
              <td data-label="Online">
                <span :ref="(el) => (onlineStatusRefs[user._id] = el)" class="online-dot" />
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