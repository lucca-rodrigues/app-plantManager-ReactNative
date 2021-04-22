import axios from 'axios';

const api = axios.create({
  baseURL: 'http://IPHERE:3333',
});

export default api;
