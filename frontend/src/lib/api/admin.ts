import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Admin Stats
export const getAdminStats = async () => {
  const response = await axios.get(`${API_URL}/admin/stats`);
  return response.data;
};

// Avatar/Expert Management
export const getAvatars = async () => {
  const response = await axios.get(`${API_URL}/admin/avatars`);
  return response.data;
};

export const getAvatarById = async (id: string) => {
  const response = await axios.get(`${API_URL}/admin/avatars/${id}`);
  return response.data;
};

export const createAvatar = async (data: any) => {
  const response = await axios.post(`${API_URL}/admin/avatars`, data);
  return response.data;
};

export const updateAvatar = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/admin/avatars/${id}`, data);
  return response.data;
};

export const deleteAvatar = async (id: string) => {
  const response = await axios.delete(`${API_URL}/admin/avatars/${id}`);
  return response.data;
};

// Video Management
export const getVideos = async () => {
  const response = await axios.get(`${API_URL}/admin/videos`);
  return response.data;
};

export const getVideoById = async (id: string) => {
  const response = await axios.get(`${API_URL}/admin/videos/${id}`);
  return response.data;
};

export const createVideo = async (data: any) => {
  const response = await axios.post(`${API_URL}/admin/videos`, data);
  return response.data;
};

export const updateVideo = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/admin/videos/${id}`, data);
  return response.data;
};

export const deleteVideo = async (id: string) => {
  const response = await axios.delete(`${API_URL}/admin/videos/${id}`);
  return response.data;
};

// Blog Management
export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/admin/blogs`);
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await axios.get(`${API_URL}/admin/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data: any) => {
  const response = await axios.post(`${API_URL}/admin/blogs`, data);
  return response.data;
};

export const updateBlog = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/admin/blogs/${id}`, data);
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await axios.delete(`${API_URL}/admin/blogs/${id}`);
  return response.data;
};

// Community Management
export const getCommunityPosts = async () => {
  const response = await axios.get(`${API_URL}/admin/community/posts`);
  return response.data;
};

export const getCommunityPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/admin/community/posts/${id}`);
  return response.data;
};

export const updateCommunityPost = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/admin/community/posts/${id}`, data);
  return response.data;
};

export const deleteCommunityPost = async (id: string) => {
  const response = await axios.delete(`${API_URL}/admin/community/posts/${id}`);
  return response.data;
};

// User Management
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/admin/users`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/admin/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/admin/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/admin/users/${id}`);
  return response.data;
};

// Error handling interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error - no response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
      throw new Error('Error setting up the request');
    }
  }
);
