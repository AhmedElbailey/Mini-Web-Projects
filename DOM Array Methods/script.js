const btnAddUser = document.querySelector('.btn-add-user');
const btnDoubleMoney = document.querySelector('.btn-double-money');
const btnShowMillion = document.querySelector('.btn-show-million');
const btnSort = document.querySelector('.btn-sort');
const btnCalcAll = document.querySelector('.btn-calc');

const mainContainer = document.querySelector('.main-container');
////////////////////////////////
//// Configurations
////////////////////////////////
const API_URL = 'https://randomuser.me/api/';

////////////////////////////////
//// Helper functions
////////////////////////////////
const getJSON_Name = async function () {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
};

////////////////////////////////
//// MODEL
////////////////////////////////
const state = {
  users: [],
  total: 0,
};

const modelLoadData = async function () {
  // Fetch random person name
  const data = await getJSON_Name();
  const nameObj = data.results[0].name;
  const fullNmae = nameObj.first + ' ' + nameObj.last;

  // Generate random wealth number
  const randomNum = Math.trunc(Math.random() * 1000000);

  // Push user data into state
  state.users.push([fullNmae, randomNum]);
};

const modelDoubleWealth = function () {
  state.users = state.users.map(userArr => [userArr[0], userArr[1] * 2]);
};

const modelShowMillionaires = function () {
  state.users = state.users.filter(userArr => userArr[1] >= 1000000);
};

const modelSort = function () {
  state.users.sort((a, b) => b[1] - a[1]);
};

const modelCalcAll = function () {
  const moneyArr = state.users.map(dataArr => dataArr[1]);
  state.total = moneyArr.reduce((acc, curr) => acc + curr, 0);
};
////////////////////////////////
//// VIEW
////////////////////////////////
const viewRenderData = function (usersArr) {
  mainContainer.innerHTML = '';

  usersArr.forEach(dataArr => {
    //Formatting wealht number
    const wealthNum = formatCur(dataArr[1]);

    const html = `
        <div class="row">
            <p class="person-name">${dataArr[0]}</p>
            <p class="wealth-number">${wealthNum}</p>
        </div>
    `;
    mainContainer.insertAdjacentHTML('beforeend', html);
  });
};

const formatCur = function (value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const viewRenderTotal = function (num) {
  const totalDiv = document.querySelector('.total-row');
  if (totalDiv) return;

  const total = formatCur(num);

  const html = `
  <div class="row total-row ">
    <p class="total-text">Total Wealth:</p>
    <p class="total-wealth">${total}</p>
  </div>
`;
  mainContainer.insertAdjacentHTML('beforeend', html);
};
////////////////////////////////
//// CONTROL
////////////////////////////////
const controlAddUsers = async function () {
  //Generate random person name and wealth
  await modelLoadData();

  //Render person data
  viewRenderData(state.users);
};

const controlDouble = function () {
  // Douple money is state
  modelDoubleWealth();

  //Render person data
  viewRenderData(state.users);
};

const controlShowMillion = function () {
  //Filter users
  modelShowMillionaires();

  //Render person data
  viewRenderData(state.users);
};

const controlSort = function () {
  // Sort by richest (descending)
  modelSort();

  //Render person data
  viewRenderData(state.users);
};

const controlCalcAll = function () {
  //Calculate total money
  modelCalcAll();

  // Render total money
  viewRenderTotal(state.total);
};
////////////////////////////////
//// Event Handlers
////////////////////////////////
btnAddUser.addEventListener('click', controlAddUsers);
btnDoubleMoney.addEventListener('click', controlDouble);
btnShowMillion.addEventListener('click', controlShowMillion);
btnSort.addEventListener('click', controlSort);
btnCalcAll.addEventListener('click', controlCalcAll);
