import axios from "axios";

const API_KEY = "53497690-592ac66f2c7c0c491717e710e";

export const getImagesByQuery = (query, page) => {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=15&image_type=photo&orientation=horizontal&safesearch=true`;
  
  return axios.get(url)
    .then(response => response.data)
};