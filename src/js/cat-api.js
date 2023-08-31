import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_RZkAharC23BPLFk72MDXgJoCqvQm4dYzSAcBOWnhCU5SFJxy5u4hNJ2T79oGgHNC";

export function fetchBreeds(){
    return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
};

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  }).catch(err => {
      console.log(err);
    });
};