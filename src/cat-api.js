import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_QSdbxLEb4GcI0swObeiCmN9WZHqJxUG5eKQXcDAOeqJ4lr1OQoJ7Krzuyo7F9tK7';

export const fetchBreeds = function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (response.status < 200 || response.status > 299) {
    }
    return response.data;
  });
};

export const fetchCatByBreed = function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response);
      if (response.status < 200 || response.status > 299) {
        throw new Error(response.statusCode);
      }
      return response.data;
    });
};
