import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    // const token = await AsyncStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6MSwicmVmUm9sZSI6IkNsaWVudCIsImlhdCI6MTY4Nzc2Nzg1NSwiZXhwIjoxNjg3ODU0MjU1fQ.hc_IY-A1NNtYWZFD2CmdpeuJ3oemp4WC-oaZbZVlMxI';
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => Promise.reject(error),
);

// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });
