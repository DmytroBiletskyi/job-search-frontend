import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsearch.p.rapidapi.com',
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  },
});

export default axiosInstance;