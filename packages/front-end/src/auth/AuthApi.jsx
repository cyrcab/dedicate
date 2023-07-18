import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem } from '../utils/localStorage';

function tokenIsValid(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
}

export function hasAuthenticated() {
  const token = getItem('token');
  if (token) {
    return tokenIsValid(token);
  }
  return false;
}

export function AuthApi() {
  return true;
}

export function login(credentials) {
  return axios
    .post('/api/auth/login', credentials)
    .then((response) => {
      const { token } = response.data;
      addItem('token', token);
      return jwtDecode(token);
    })
    .catch((err) => {
      throw err.response.data;
    });
}

export function logout() {
  removeItem('token');
}
