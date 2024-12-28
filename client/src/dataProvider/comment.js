import { del, get, post, put } from '../libs/request';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function addComment(eventId, commentData) {
  try {
    const response = await post(`${BASE_URL}/comments/${eventId}`, commentData);
    return response;
  }
  catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function getComment(eventId) {
  try {
    const response = await get(`${BASE_URL}/comments/${eventId}`);
    return response;
  }
  catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function deleteComment(eventId, commentId) {
  try {
    await del(`${BASE_URL}/comments/${commentId}`, { eventId });
  }
  catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

export async function updateComment(commentId, updateData) {
  try {
    const response = await put(`${BASE_URL}/comments/${commentId}`, updateData);
    return response;
  }
  catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}
