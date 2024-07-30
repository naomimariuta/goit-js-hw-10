import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selecter = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

selecter.addEventListener('change', createInfo);

updateSelecter();

function updateSelecter(data) {
  fetchBreeds(data)
    .then(data => {
      loader.classList.replace('loader', 'hidden');

      let selection = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      selecter.insertAdjacentHTML('beforeend', selection);
      new SlimSelect({
        select: selecter,
      });
    })
    .catch(onFail);
}

function createInfo(event) {
  loader.classList.replace('hidden', 'loader');
  selecter.classList.add('hidden');
  catInfo.classList.add('hidden');

  const id = event.currentTarget.value;

  fetchCatByBreed(id)
    .then(data => {
      loader.classList.replace('loader', 'hidden');
      selecter.classList.remove('hidden');
      const { url, breeds } = data[0];
      // console.log(breeds[0].name);
      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('hidden');
    })
    .catch(onFail);
}

function onFail() {
  selecter.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notiflix.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
