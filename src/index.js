import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const catsSelect = new SlimSelect({
  select: select,
});

fetchBreeds().then(breeds => renderCatSelectOptions(breeds));

select.addEventListener('change', selectChangeHandler);

function selectChangeHandler() {
  fetchCatByBreed(this.value).then(info => renderCatCard(info));
}

function renderCatSelectOptions(breeds) {
  const breedProperties = breeds.map(({ id, name }) => {
    return {
      text: name,
      value: id,
    };
  });
  catsSelect.setData(breedProperties);
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
}
