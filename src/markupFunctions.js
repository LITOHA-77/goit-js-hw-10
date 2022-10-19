import { countryList, countryInfo } from './getRefs';

export function emptyMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

export function renderCountriesListMarkup(countries) {
  const shortMarkup = countries.reduce(
    (acc, { name, flags } = country) =>
      acc +
      ` <li class="temp-list__item">
                <img class="flag" src="${flags.svg}" alt="${name.official}" width="30" height="auto" />
                <h2 class="temp-list__name">${name.official}</h2>
            </li>`,
    ''
  );
  return shortMarkup;
}

export function renderFullInfoMarkup(countries) {
  const singleMarkup = (
    { name, capital, flags, population, languages } = countries[0]
  ) => {
    const fullCountryInfoMarkup = `<div class="country-card">
            <div class="flag-and-name">
                <img class="flag" src="${flags.svg}" alt="${
      name.official
    }" width="80" height="auto" />
                <h2 class="country-name">${name.official}</h2>
            </div>
            
            <ul class="list additional-info">
                <li class="item">
                    <h3 class="description"> Capital: </h3> 
                    <h3 class="value"> 
                    ${capital}</h3>
                </li>
                <li class="item"> 
                    <h3 class="description"> Population: </h3>
                    <h3 class="value"> 
                    ${population}</h3>
                </li>
                <li class="item">
                    <h3 class="description"> Languages:</h3>
                    <h3 class="value">
                    ${Object.values(languages).join(', ')}</h3>
                </li>
            </ul>
        </div>`;

    return fullCountryInfoMarkup;
  };

  return singleMarkup();
}
