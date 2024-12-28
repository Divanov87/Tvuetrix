import { del, get, post } from '../libs/request';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function addBulletin(bulletinData) {
  try {
    const response = await post(`${BASE_URL}/bulletin/subscribe`, bulletinData);
    return response;
  }
  catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
}

export async function getBulletins() {
  try {
    const response = await get(`${BASE_URL}/bulletin`);
    return response;
  }
  catch (error) {
    console.error('Error fetching bulletins:', error);
    throw error;
  }
}

export async function removeBulletin(bulletinData) {
  try {
    const response = await del(`${BASE_URL}/bulletin/unsubscribe`, bulletinData);
    return response;
  }
  catch (error) {
    console.error('Error unsubscribing:', error);
    throw error;
  }
}
