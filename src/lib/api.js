import axios from 'axios';
import { create } from 'lodash';
import { AUTH } from './auth';

const ENDPOINTS = {
  getAllProducts: '/api/products',
  getAllCategories: '/api/categories',
  getAllUsers: '/api/users',
  allBrands: '/api/brands',
  allProductsfForBrand: (id) => `/api/brands/${id}/products`,
  getSingleProduct: (id) => `/api/products/${id}`,
  login: '/api/login',
  register: '/api/register',
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
  singleUser: (userId) => `/api/profile/${userId}`,
  createReview: (id) => `/api/products/${id}/reviews`,
  singleReview: (productId, reviewId) =>
    `/api/products/${productId}/reviews/${reviewId}`,
  deleteBrand: (id) => `/api/brands/${id}`,
  search: (query) => `/api/products/search?search=${query}`,
  deleteCategory: (id) => `/api/categories/${id}`,
  getFilteredProducts: (categories, brands) =>
    `/api/products/filter?categories=${categories}&brands=${brands}`,
  createBrand: '/api/brands'
};

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` }
});

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
