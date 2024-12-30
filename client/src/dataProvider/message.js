import { del, get, post } from '../libs/request';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function addMessage(messageData) {
  try {
    const response = await post(`${BASE_URL}/messages`, messageData);
    throw error;
  }
  catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

export async function getMessages() {
  try {
    const response = await get(`${BASE_URL}/messages`);
    return response;
  }
  catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

export async function deleteMessage(messageId) {
  try {
    const response = await del(`${BASE_URL}/messages/${messageId}`);
    return response;
  }
  catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}
