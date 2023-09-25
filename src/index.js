import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

const catsSelect = new SlimSelect({
  select: select,
  settings: {
    showSearch: false,
    placeholderText: 'Please, choose a cat!',
  },
});

fetchBreeds()
  .then(breeds => renderCatSelectOptions(breeds))
  .catch(err => showError());

select.addEventListener('change', selectChangeHandler);

function selectChangeHandler() {
  catInfo.innerHTML = '';
  loader.classList.remove('visually-hidden');
  fetchCatByBreed(this.value)
    .then(info => renderCatCard(info))
    .catch(err => showError());
}

function renderCatSelectOptions(breeds) {
  const breedProperties = breeds.map(({ id, name }) => {
    return {
      text: name,
      value: id,
    };
  });
  breedProperties.unshift({ text: '', placeholder: true });
  catsSelect.setData(breedProperties);
  loader.classList.add('visually-hidden');
  select.classList.remove('visually-hidden');
}

function renderCatCard(info) {
  const markup = info
    .map(({ url, breeds }) => {
      return breeds
        .map(({ name, description, temperament }) => {
          return `<img class="cat-info__img" src="${url}" alt="${name}" />
          <h1 class="cat-info__name">${name}</h1>
          <p class="cat-info__descr">${description}</p>
          <p class="cat-info__text">This cat is: ${temperament}</p>`;
        })
        .join('');
    })
    .join('');
  catInfo.innerHTML = markup;
  catInfo.classList.remove('visually-hidden');
  loader.classList.add('visually-hidden');
}

function showError() {
  loader.classList.add('visually-hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
