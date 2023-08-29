import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');

const addOptionsBreed = (breed) => {
    const option = document.createElement('option');

    option.setAttribute('value', breed.id);
    option.innerText = breed.name;

    return option;
};

fetchBreeds().then(breeds => {
    breedSelect.append(...breeds.map(addOptionsBreed))
}).catch((err) => {
    console.log(err)
});

breedSelect.addEventListener('change', handler);

const addImg = (infoImgId) => {
    const img = document.createElement('img');
    img.src = infoImgId.url;
    return img;
};

function handler(e){
    const id = e.currentTarget.value;
    fetchCatByBreed(id).then((infoImgIds) => {
        catInfoDiv.append(...infoImgIds.map(addImg))
    }).catch((err) => {
        console.log(err);
    });
};