<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { deleteMessage, getMessages } from '../../../dataProvider/message';
import { formatDateAdmin } from '../../../libs/dateFormatter';

const { t } = useI18n();

const messages = ref([]);

async function fetchMessages() {
  try {
    const response = await getMessages();
    const sortedMessages = response.sort((a, b) => new Date(b.messageDate) - new Date(a.messageDate));
    messages.value = sortedMessages;
  }
  catch (err) {
    alert(t('error.fetching_messages')) && console.log(err);
  }
}


async function handleDelete(messageId) {
  try {
    await deleteMessage(messageId);
    messages.value = messages.value.filter(msg => msg._id !== messageId);
  }
  catch (err) {
   alert(t('error.deleting_message')) && console.log(err);
  }
}

onMounted(() => {
  fetchMessages();
});
</script>

<template>
  <article>
    <section class="movie-detail">
      <p class="section-subtitle">
        {{ t('admin.messages.section_subtitle') }}
      </p>
      <h2 class="h2 section-title">
        {{ t('admin.messages.title1') }} <strong>{{ t('admin.messages.title2') }}</strong>
      </h2>
      <div class="container">
        <table class="user-table">
          <thead>
            <tr>
              <th v-for="column in ['username', 'name', 'email', 'phone', 'date', 'message', 'delete']" :key="column">
                {{ t(`admin.table.${column}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(msg, index) in messages" :key="msg._id" :class="{ odd: index % 2 !== 0 }">
              <td data-label="Username">
                {{ msg?.user?.username || '-' }}
              </td>
              <td data-label="Name">
                {{ msg.name }}
              </td>
              <td data-label="Email">
                {{ msg.email }}
              </td>
              <td data-label="Phone">
                {{ msg.phone || '-' }}
              </td>
              <td data-label="Date">
                {{ formatDateAdmin(msg.messageDate) }}
              </td>
              <td data-label="Message">
                {{ msg.message }}
              </td>
              <td data-label="Delete" style="text-align: center">
                <i class="bx bx-trash trash-icon" @click="handleDelete(msg._id)" />
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
