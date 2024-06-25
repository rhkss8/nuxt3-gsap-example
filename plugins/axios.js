import axios from 'axios';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
    headers: {
      common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  });

  nuxtApp.provide('axios', api);
});
