<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loader from '../../../../components/Loader.vue';
import { formatDateAdmin } from '../../../../libs/dateFormatter.js';
import { maskEmail } from '../../../../libs/emailMasker.js';
import { useAuthStore } from '../../../../store/authStore.js';
import { useCommentStore } from '../../../../store/commentStore.js';

const route = useRoute();
const eventId = route.params.eventId;

const commentStore = useCommentStore();
const { user, isLogged } = useAuthStore();

const newComment = ref('');
const editedText = ref('');

onMounted(() => {
  commentStore.fetchComments(eventId);
});

const comments = computed(() => [...commentStore.comments].reverse());
const isLoading = computed(() => commentStore.isLoading);
const editingComment = computed(() => commentStore.editingComment);

async function handleCommentSubmit(e) {
  e.preventDefault();
  if (!newComment.value.trim())
    return;

  await commentStore.addCommentToEvent(eventId, user._id, newComment.value);
  newComment.value = '';
}

async function handleEditSubmit(e) {
  e.preventDefault();
  if (!editedText.value.trim())
    return;

  await commentStore.editCommentText(editingComment.value._id, editedText.value);
  editedText.value = '';
  commentStore.cancelEditing();
}

function cancelEditing() {
  commentStore.cancelEditing();
  editedText.value = '';
}

function startEditing(comment) {
  commentStore.editingComment = comment;
  editedText.value = comment.text;
}

function handleCommentDelete(commentId) {
  commentStore.deleteCommentFromEvent(eventId, commentId);
}
</script>

<template>
  <section class="movie-detail">
    <section class="container">
      <article>
        <p class="section-subtitle">
          Comments
        </p>
        <h2 class="section-title">
          WHAT PEOPLE ARE <strong>SAYING?</strong>
        </h2>

       

       
          <template v-if="isLogged">
            <form class="comment-form" @submit="handleCommentSubmit">
              <textarea v-model="newComment" placeholder="Add a comment..." required />
              <button type="submit" class="comment-button">
                Send
              </button>
            </form>
          </template>
          <template v-else>
            <h3 class="section-title">
              (Please login to add a comment)
            </h3>
          </template>

          <Loader v-if="isLoading" />
          
          <template v-else>
          <template v-if="comments.length === 0">
            <h2 class="no-comments">
              No comments <strong>yet...</strong>
              <br>
              <strong><strike>Love it?</strike></strong> Hate it? Be the first to
              <strong>share your thoughts!</strong>
            </h2>
          </template>
         
          <ul v-else class="comment-list">
            <li v-for="comment in comments" :key="comment._id" class="comment">
              <div>
                <span class="comment-author">
                  {{ comment.author.username }} ({{ maskEmail(comment.author.email) }})
                </span>
                <p>{{ comment.text }}</p>
                <i>{{ formatDateAdmin(comment.createdAt) }}</i>

                <template v-if="user?._id === comment.author._id || user?.role === 'admin'">
                  <template v-if="editingComment && editingComment._id === comment._id">
                    <form @submit="handleEditSubmit">
                      <textarea v-model="editedText" required />
                      <button type="submit" class="comment-delete">
                        Update
                      </button> <button type="button" class="comment-delete" @click="cancelEditing">
                        Cancel
                      </button>
                    </form>
                  </template>
                  <template v-else>
                    <button class="comment-delete" @click="startEditing(comment)">
                      Edit
                    </button> <button class="comment-delete" @click="handleCommentDelete(comment._id)">
                      Delete
                    </button>
                  </template>
                </template>
              </div>
            </li>
          </ul>
        </template>
      </article>
    </section>
  </section>
</template>

<style scoped>
@import './EventComments.css';
</style>

<!-- <script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '../../../../libs/dateFormatter.js';
import { maskEmail } from '../../../../libs/emailMasker.js';
import { useAuthStore } from '../../../../store/authStore.js';
import { useCommentStore } from '../../../../store/commentStore.js';

export default {
  setup() {
    const route = useRoute();
    const eventId = route.params.eventId;

    const commentStore = useCommentStore();
    const { user, isLogged } = useAuthStore();

    const newComment = ref('');
    const editedText = ref('');

    onMounted(() => {
      commentStore.fetchComments(eventId);
    });

    const comments = computed(() => commentStore.comments);
    const isLoading = computed(() => commentStore.isLoading);
    const editingComment = computed(() => commentStore.editingComment);

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      if (!newComment.value.trim()) return;

      await commentStore.addComment(eventId, user._id, newComment.value);
      newComment.value = '';
    };

    const handleEditSubmit = async (e) => {
      e.preventDefault();
      if (!editedText.value.trim()) return;

      await commentStore.editComment(editingComment.value._id, editedText.value);
      editedText.value = '';
      commentStore.cancelEditing();
    };

    const cancelEditing = () => {
      commentStore.cancelEditing();
      editedText.value = '';
    };

    const startEditing = (comment) => {
      commentStore.editingComment = comment;
      editedText.value = comment.text;
    };

    const handleCommentDelete = (commentId) => {
      commentStore.deleteComment(eventId, commentId);
    };

    return {
      comments,
      isLoading,
      editingComment,
      newComment,
      editedText,
      isLogged,
      user,
      handleCommentSubmit,
      handleEditSubmit,
      cancelEditing,
      startEditing,
      handleCommentDelete,
      maskEmail,
      formatDate,
    };
  },
};
</script>

<template>
  <section class="movie-detail">
    <section class="container">
      <article class="event-detail">
        <p class="section-subtitle">Comments</p>
        <h2 class="section-title">
          WHAT PEOPLE ARE <strong>SAYING?</strong>
        </h2>

        <template v-if="isLogged">
          <form class="comment-form" @submit="handleCommentSubmit">
            <textarea v-model="newComment" placeholder="Add a comment..." required />
            <button type="submit" class="comment-button">Send</button>
          </form>
        </template>
        <template v-else>
          <h3 class="section-title">(Please login to add a comment)</h3>
        </template>

        <template v-if="comments.length === 0">
          <h2 class="no-comments">
            No comments <strong>yet...</strong>
            <br>
            <strong><strike>Love it?</strike></strong> Hate it? Be the first to
            <strong>share your thoughts!</strong>
          </h2>
        </template>
        <ul v-else class="comment-list">
          <li v-for="comment in comments" :key="comment._id" class="comment">
            <div>
              <span class="comment-author">
                {{ comment.author.username }} ({{ maskEmail(comment.author.email) }})
              </span>
              <p>{{ comment.text }}</p>
              <i>{{ formatDate(comment.createdAt) }}</i>

              <template v-if="user?._id === comment.author._id || user?.role === 'admin'">
                <template v-if="editingComment && editingComment._id === comment._id">
                  <form @submit="handleEditSubmit">
                    <textarea v-model="editedText" required />
                    <button type="submit" class="comment-button">Update</button>
                    <button type="button" class="comment-button" @click="cancelEditing">Cancel</button>
                  </form>
                </template>
                <template v-else>
                  <button class="comment-button" @click="startEditing(comment)">Edit</button>
                  <button class="comment-button" @click="handleCommentDelete(comment._id)">Delete</button>
                </template>
              </template>
            </div>
          </li>
        </ul>
      </article>
    </section>
  </section>
</template>

<style scoped>
@import './EventComments.css';
</style> -->
