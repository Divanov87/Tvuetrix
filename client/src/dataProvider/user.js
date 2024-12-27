import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { get, post } from '../libs/request';

const BASE_URL = import.meta.env.VITE_API_URL;

const IP_SERVICE_URL = import.meta.env.VITE_IP_SERVICE_URL;

async function getExternalIpAddress() {
  const response = await fetch(IP_SERVICE_URL);
  const data = await response.json();
  return data.ip;
}

export async function loginService(username_email, password) {
  const userIp = await getExternalIpAddress();
  const data = { username_email, password, userIp };
  const response = await post(`${BASE_URL}/auth/login`, data);

  const { token } = response;
  if (token) {
    const decodedToken = jwtDecode(token);
    const { _id, role, location, email, username } = decodedToken;
    Cookies.set('user', token, { expires: 400 });
    return { _id, token, role, location, email, username };
  }
  else {
    throw new Error('Invalid token received');
  }
}

export async function registerService(username, password, repeatPassword, email, city) {
  const userIp = await getExternalIpAddress();
  const data = { username, password, repeatPassword, email, city, userIp };
  const response = await post(`${BASE_URL}/auth/register`, data);

  const { token } = response;
  if (token) {
    const decodedToken = jwtDecode(token);
    const { _id, role, location, email, username } = decodedToken;
    Cookies.set('user', token, { expires: 400 });
    return { _id, token, role, location, email, username };
  }
  else {
    throw new Error('Invalid token received');
  }
}

export async function logoutService() {
  return await get(`${BASE_URL}/auth/logout`);
}
