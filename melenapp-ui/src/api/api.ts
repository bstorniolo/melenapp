// src/api/api.ts
import axios from 'axios';
// import { msalInstance } from '../index';
// import { loginRequest } from '../config/authConfig';

const api = axios.create({
  baseURL: 'https://api-melenapp-aufjdye3b6abb4gs.canadacentral-01.azurewebsites.net/', // Replace with your API base URL
});

// api.interceptors.request.use(
//   async (config) => {
//     const accounts = msalInstance.getAllAccounts();
//     if (accounts.length > 0) {
//       const request = {
//         ...loginRequest,
//         account: accounts[0],
//       };
//       const response = await msalInstance.acquireTokenSilent(request);
//       config.headers.Authorization = `Bearer ${response.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
