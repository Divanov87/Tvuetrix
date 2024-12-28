import { del, get, post, put } from '../libs/request';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getEvent(_id) {
  try {
    return await get(`${BASE_URL}/events/${_id}`);
  }
  catch (error) {
    console.error('Error in getEvent:', error);
    throw error;
  }
}

export async function createEvent(eventData) {
  try {
    return await post(`${BASE_URL}/events/add`, eventData);
  }
  catch (error) {
    console.error('Error in createEvent:', error);
    throw error;
  }
}

export async function editEvent(eventData, _id) {
  try {
    return await put(`${BASE_URL}/events/${_id}`, eventData);
  }
  catch (error) {
    console.error('Error in editEvent:', error);
    throw error;
  }
}

export async function deleteEvent(_id) {
  try {
    return await del(`${BASE_URL}/events/${_id}`);
  }
  catch (error) {
    console.error('Error in deleteEvent:', error);
    throw error;
  }
}

export async function getAllEvents() {
  try {
    return await get(`${BASE_URL}/events`);
  }
  catch (error) {
    console.error('Error in getAllEvents:', error);
    throw error;
  }
}

export async function getTheaterEvents() {
  try {
    return await get(`${BASE_URL}/events/theater`);
  }
  catch (error) {
    console.error('Error in getTheaterEvents:', error);
    throw error;
  }
}

export async function getConcertEvents() {
  try {
    return await get(`${BASE_URL}/events/concerts`);
  }
  catch (error) {
    console.error('Error in getConcertEvents:', error);
    throw error;
  }
}

export async function getTopRatedEvents() {
  try {
    const response = await get(`${BASE_URL}/`);
    return response.topRatedEvents;
  }
  catch (error) {
    console.error('Error in getTopRatedEvents:', error);
    throw error;
  }
}

export async function getAllEventsData() {
  try {
    return await get(`${BASE_URL}/`);
  }
  catch (error) {
    console.error('Error in getAllEventsData:', error);
    throw error;
  }
}

export async function buyTickets(_id) {
  try {
    return await post(`${BASE_URL}/events/${_id}/buy`, _id);
  }
  catch (error) {
    console.error('Error in buyTickets:', error);
    throw error;
  }
}

export async function likeEvent(_id) {
  try {
    return await post(`${BASE_URL}/events/${_id}/like`, _id);
  }
  catch (error) {
    console.error('Error in likeEvent:', error);
    throw error;
  }
}

export async function unlikeEvent(_id) {
  try {
    return await post(`${BASE_URL}/events/${_id}/unlike`, _id);
  }
  catch (error) {
    console.error('Error in unlikeEvent:', error);
    throw error;
  }
}

export async function pinEvent(_id) {
  try {
    return await post(`${BASE_URL}/events/${_id}/pin`, _id);
  }
  catch (error) {
    console.error('Error in pinEvent:', error);
    throw error;
  }
}

export async function unpinEvent(_id) {
  try {
    return await post(`${BASE_URL}/events/${_id}/unpin`, _id);
  }
  catch (error) {
    console.error('Error in unpinEvent:', error);
    throw error;
  }
}

export async function cloneEvent(_id) {
  try {
    return await post(`${BASE_URL}/events/${_id}/clone`, { _id });
  }
  catch (error) {
    console.error('Error in cloneEvent:', error);
    throw error;
  }
}

export async function searchEvents(queryParams) {
  try {
    return await post(`${BASE_URL}/search`, queryParams);
  }
  catch (error) {
    console.error('Error in searchEvents:', error);
    throw error;
  }
}

export async function getAllCities() {
  try {
    return await get(`${BASE_URL}/events/cities`);
  }
  catch (error) {
    console.error('Error in getAllCities:', error);
    throw error;
  }
}

export async function getUserEvents(_id) {
  try {
    return await post(`${BASE_URL}/profile`, { _id });
  }
  catch (error) {
    console.error('Error in getUserEvents:', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    return await get(`${BASE_URL}/users`);
  }
  catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
}

export async function getUsersActivity() {
  try {
    return await get(`${BASE_URL}/activity`);
  }
  catch (error) {
    console.error('Error in getUsersActivity:', error);
    throw error;
  }
}
