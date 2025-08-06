import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // your Spring Boot backend
});

export default axiosInstance;
