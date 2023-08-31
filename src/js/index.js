import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector(".loader");

loader.style.display = "block";
breedSelect.setAttribute('hidden', 'hidden');

function addOptionsBreed(breeds){
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
    
      breedSelect.append(option);
    })
    loader.style.display = "none";
    breedSelect.removeAttribute('hidden');
    new SlimSelect({
      select: breedSelect,
    });
    
};

function addInfoCat(data){
  data.forEach(infoCat => {
    const image = document.createElement('img');
    image.src = infoCat.url;
    image.classList.add('image');
    image.alt = infoCat.breeds[0].name;

    const title = document.createElement('h2');
    title.innerText = infoCat.breeds[0].name;

    const description = document.createElement('p');
    description.classList.add('description');
    description.innerText = infoCat.breeds[0].description;

    const temperament = document.createElement('p');
    temperament.classList.add('temperament');
    temperament.innerHTML = `<span>Temperament: </span>${infoCat.breeds[0].temperament}`;
    
    loader.style.display = "none";
    catInfoDiv.style.display = "block";

    return catInfoDiv.append(image, title, description, temperament);
  });
};

fetchBreeds()
.then(breeds => {
  addOptionsBreed(breeds);
}).catch((err) => {
    console.log(err);
    Notify.failure('Oops! Something went wrong! Try reloading the page!')
});


breedSelect.addEventListener('change', showInfoCat);

function showInfoCat(e){
    catInfoDiv.innerHTML='';
    loader.style.display = "block";
    const selectedBreedId = e.currentTarget.value;

    fetchCatByBreed(selectedBreedId)
      .then(data => {
        addInfoCat(data)
      }).catch(err =>{
        console.log(err);
        Notify.failure('Oops! Something went wrong! Try reloading the page!')
      })
};
