/////////////////////////////////////////////
// CONFIG
const API_URL =
  'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';

///////////////////////////////////////////
// Variables
///////////////////////////////////////////
let state = {
  eurTo: [],
  currencies: [],
};

const currInput1 = document.querySelector('.curr1');
const currInput2 = document.querySelector('.curr2');
const rateText = document.querySelector('.exchange-rate-text');
const valueInput = document.querySelector('.value1');
const valueOutput = document.querySelector('.value2');
const btnSwap = document.querySelector('.btn');
let exactValueOutput;
///////////////////////////////////////////
// MODEL
///////////////////////////////////////////
const getJSON = async function () {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    state.eurTo = Object.entries(data.eur);
    state.currencies = Object.keys(data.eur);
  } catch (err) {
    alert(err.message, `⚠️⚠️`);
  }
};

///////////////////////////////////////////
// VIEW
///////////////////////////////////////////
const renderCurrencies = function () {
  [currInput1, currInput2].forEach((input, i) => {
    input.innerHTML = '';
    const html = _generateHtml();
    input.innerHTML = html[i];
  });
};

const _generateHtml = function () {
  const html1 = state.currencies
    .map(
      curr =>
        `<option value="${curr.toUpperCase()}" ${
          curr.toUpperCase() == 'EUR' ? 'selected' : ''
        }>${curr.toUpperCase()}</option>`
    )
    .join(' ');

  const html2 = state.currencies
    .map(
      curr =>
        `<option value="${curr.toUpperCase()}" ${
          curr.toUpperCase() == 'USD' ? 'selected' : ''
        }>${curr.toUpperCase()}</option>`
    )
    .join(' ');

  return [html1, html2];
};

const renderText = function () {
  // prettier-ignore
  rateText.innerHTML = `${+valueInput.value} ${currInput1.value} = ${exactValueOutput.toFixed(4)}  ${currInput2.value}`;
};

const renderExchangeValue = function () {
  // Getting both currencies arrays in one parent array
  const currenciesArrays = state.eurTo.filter(
    currArr =>
      currArr[0] === currInput1.value.toLowerCase() ||
      currArr[0] === currInput2.value.toLowerCase()
  );

  let currencyRate1;
  let currencyRate2;

  currenciesArrays.forEach(arr => {
    if (arr[0] === currInput1.value.toLowerCase()) currencyRate1 = arr[1];
    else currencyRate2 = arr[1];
  });

  exactValueOutput = (+valueInput.value * currencyRate2) / currencyRate1;

  valueOutput.innerHTML = `${exactValueOutput.toFixed(2)}`;
};

///////////////////////////////////////////
// CONTROLLER
///////////////////////////////////////////
const controlCurrencies = async function () {
  // 1) Fetch currencies and rates API
  await getJSON();

  // 2) Render currencies in selectors
  renderCurrencies();

  // 3) Render exchange value and exchange rate text
  controlExchangeRate();
};

const controlExchangeRate = function () {
  // 1) Render exchange value
  renderExchangeValue();

  // 2) Render exchange rate text
  renderText();
};

const controlSwap = function () {
  // 1) Swap currencies
  [currInput1.value, currInput2.value] = [currInput2.value, currInput1.value];

  // 2) Render exchange value and exchange rate text
  controlExchangeRate();
};
//////////////////////////////////////////
// EVENT LISTENERS
window.addEventListener('load', controlCurrencies);

[currInput1, currInput2, valueInput].forEach(() =>
  addEventListener('change', controlExchangeRate)
);

btnSwap.addEventListener('click', controlSwap);
