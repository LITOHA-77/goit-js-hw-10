/*HBS 
npm install --save-dev parcel-transformer-hbs

====== add to parcel:
 "transformers": {
    "*.hbs": [
        "parcel-transformer-hbs"
      ]
    }
===== import markup from './templates/markup.hbs';
*/

//npm i notiflix
//npm i --save lodash.debounce
//const debounce = require('lodash.debounce');

import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { searchFormInput, countryList, countryInfo } from './getRefs';
import { fetchCountries } from './fetchCountries';
import {
  emptyMarkup,
  renderCountriesListMarkup,
  renderFullInfoMarkup,
} from './markupFunctions';

const DEBOUNCE_DELAY = 300;

searchFormInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();

  const name = document.querySelector('input#search-box').value.trim();

  if (name === '') {
    emptyMarkup();
    return;
  }

  fetchCountries(name)
    .then(countries => {
      //console.log("Number of matches by request : ", countries.length);
      let markup = '';

      if (countries.length > 10) {
        emptyMarkup();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        emptyMarkup();

        markup = renderCountriesListMarkup(countries);
        countryList.innerHTML = markup;
        //console.log(markup);
      } else if (countries.length === 1) {
        emptyMarkup();

        markup = renderFullInfoMarkup(countries);
        countryInfo.innerHTML = markup;
        //console.log(markup);
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      //emptyMarkup();
      //console.log(error);
    });
}
