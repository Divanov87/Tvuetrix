import { del, get, post, put } from '../libs/request';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getBlog(_id) {
  try {
    const response = await get(`${BASE_URL}/blog/${_id}`);
    return response;
  }
  catch (error) {
    console.error('Error in getBlog:', error);
    throw error;
  }
}

export async function createBlog(blogData) {
  try {
    const response = await post(`${BASE_URL}/blog/add`, blogData);
    return response;
  }
  catch (error) {
    console.error('Error in createBlog:', error);
    throw error;
  }
}

export async function editBlog(blogData, _id) {
  try {
    const response = await put(`${BASE_URL}/blog/${_id}`, blogData);
    return response;
  }
  catch (error) {
    console.error('Error in editBlog:', error);
    throw error;
  }
}

export async function deleteBlog(_id) {
  try {
    const response = await del(`${BASE_URL}/blog/${_id}`);
    return response;
  }
  catch (error) {
    console.error('Error in deleteBlog:', error);
    throw error;
  }
}

export async function getAllBlog() {
  try {
    const response = await get(`${BASE_URL}/blog`);
    return response;
  }
  catch (error) {
    console.error('Error in getAllBlog:', error);
    throw error;
  }
}

export async function getAllBlogData() {
  try {
    const response = await get(`${BASE_URL}/`);
    return response;
  }
  catch (error) {
    console.error('Error in getAllBlogData:', error);
    throw error;
  }
}

export async function pinBlog(_id, userId) {
  try {
    const response = await post(`${BASE_URL}/blog/${_id}/pin`, { blogId: _id, userId });
    return response;
  }
  catch (error) {
    console.error('Error in pinning blog:', error);
    throw error;
  }
}

export async function unpinBlog(_id, userId) {
  try {
    const response = await post(`${BASE_URL}/blog/${_id}/unpin`, { blogId: _id, userId });
    return response;
  }
  catch (error) {
    console.error('Error in unpinning blog:', error);
    throw error;
  }
}
