import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://drab-galoshes-pike.cyclic.app/api/v1',

  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
