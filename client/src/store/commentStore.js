import { defineStore } from 'pinia';
import { ref } from 'vue';
import { addComment, deleteComment, getComment, updateComment } from '../dataProvider/comment.js';

export const useCommentStore = defineStore('commentStore', () => {
  const comments = ref([]);
  const isLoading = ref(true);
  const editingComment = ref(null);

  async function fetchComments(eventId) {
    isLoading.value = true;
    try {
      comments.value = await getComment(eventId);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addCommentToEvent(eventId, userId, text) {
    try {
      const commentData = { userId, text };
      const newComment = await addComment(eventId, commentData);
      comments.value.push(newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  async function deleteCommentFromEvent(eventId, commentId) {
    try {
      await deleteComment(eventId, commentId);
      comments.value = comments.value.filter(comment => comment._id !== commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  async function editCommentText(commentId, text) {
    try {
      await updateComment(commentId, { text });
      editingComment.value = null;
      comments.value = comments.value.map(comment =>
        comment._id === commentId ? { ...comment, text } : comment
      );
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  }

  function cancelEditing() {
    editingComment.value = null;
  }

  return {
    comments,
    isLoading,
    editingComment,
    fetchComments,
    addCommentToEvent,
    deleteCommentFromEvent,
    editCommentText,
    cancelEditing,
  };
});
