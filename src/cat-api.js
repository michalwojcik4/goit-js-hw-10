import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_RZkAharC23BPLFk72MDXgJoCqvQm4dYzSAcBOWnhCU5SFJxy5u4hNJ2T79oGgHNC";

export function fetchBreeds(){
    const url = 'https://api.thecatapi.com/v1/breeds'

    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
        return response.json()
    })
};

export function fetchCatByBreed(breedId){
    const urlInfoCat = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    
    return fetch(urlInfoCat).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
       return response.json();
      })
};