import axios from 'axios';

const axiosConfig = (baseURL = process.env.TMDB_URL) =>
  axios.create({
    baseURL,
  });

export default axiosConfig;
