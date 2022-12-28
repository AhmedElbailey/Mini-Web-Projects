const wordEl = document.querySelector('.word');
const notificationEl = document.querySelector('.notification-container');
const wrongContainer = document.querySelector('.wrong-letter-container');
const popupPage = document.querySelector('.result-container');
const popupContainer = document.querySelector('.popup-container');
const resultMessage = document.querySelector('.result-message');
const btnReplay = document.querySelector('.btn-replay');
const parts = document.querySelectorAll('.figure-part');
///////////////////////////////////////////////////
// Configurations
///////////////////////////////////////////////////
const TIMEOUT_SEC = 2;

///////////////////////////////////////////////////
// Model
///////////////////////////////////////////////////
const state = {
  words: ['wizard', 'apple', 'programming', 'cantelope', 'diamond'],
  currWord: '',
  rightLetters: new Set(),
  rightPressedLetters: [],
  wrongPressedLetters: [],
};

function modelRandomWord() {
  const index = Math.trunc(Math.random() * 5);
  state.currWord = state.words[index];
  state.rightLetters = new Set(state.currWord);

  console.log(state.currWord);
}

function modelResetState() {
  state.rightPressedLetters = [];
  state.wrongPressedLetters = [];
}

////////////////////////////////////////////////
// View
////////////////////////////////////////////////
function viewRenderWord(word) {
  wordEl.innerHTML = '';

  [...word].forEach((letter, i) => {
    let html = `
      <span class="letter-container"><span class="letter letter${i} hidden">${letter}</span></span>
  `;
    wordEl.insertAdjacentHTML('beforeend', html);
  });
}

function viewRenderLetter(letterNum) {
  const letterEl = document.querySelector(`.letter${letterNum}`);
  letterEl.classList.remove('hidden');
}

function viewShowNotification() {
  notificationEl.classList.remove('hidden-notification');
  setTimeout(() => {
    notificationEl.classList.add('hidden-notification');
  }, TIMEOUT_SEC * 1000);
}

function viewRenderWrongLetters(lettersArr) {
  wrongContainer.classList.remove('hidden');
  wrongContainer.innerHTML = '';

  let html = `
  <p>Wrong</p>

  ${lettersArr
    .map(letter => `<span class="wrong-letter">${letter}</span>`)
    .join(',')}

  `;

  wrongContainer.insertAdjacentHTML('afterbegin', html);
}

function viewShowPart() {
  let partNum = state.wrongPressedLetters.length - 1;
  let partEl = document.querySelector(`.figure-part${partNum}`);

  partEl.classList.remove('hidden');
}

function viewRenderWinPopup() {
  console.log('WIN');
  resultMessage.textContent = 'Congratulations! You won! 😃';
  _showPopup();
}

function viewRenderLosePopup() {
  console.log('LOSE');
  resultMessage.textContent = 'Unfortunately you lost. 😕';
  _showPopup();
}

function _showPopup() {
  popupPage.classList.remove('hidden');
}

function viewResetAll() {
  popupPage.classList.add('hidden');
  wrongContainer.classList.add('hidden');
  Array.from(parts).forEach(el => el.classList.add('hidden'));
}

//////////////////////////////////////////////
// Controller
/////////////////////////////////////////////
function controlInit() {
  //Choose random word
  modelRandomWord();

  //Display empty letters
  viewRenderWord(state.currWord);
}

function controlPress(key) {
  //prettier-ignore
  if (state.rightPressedLetters.includes(key) || state.wrongPressedLetters.includes(key) )
    viewShowNotification();
  else if (state.rightLetters.has(key)) {
    // Finding all similar letters in entries form
    const similars = [];
    for (const item of [...state.currWord].entries())
      key === item[1] ? similars.push(item) : '';

    // Render all similar letters
    similars.forEach(letterArr => viewRenderLetter(letterArr[0]));

    // Saving pressed key
    state.rightPressedLetters.push(key);
  } else {
    // Adding wrong key to the state
    state.wrongPressedLetters.push(key);

    // Show wrong pressed keys
    viewRenderWrongLetters(state.wrongPressedLetters);

    // Show figure part
    viewShowPart()
  }

  //Check win situation
  state.rightPressedLetters.length === state.rightLetters.size
    ? viewRenderWinPopup()
    : '';

  //Check loss situation
  state.wrongPressedLetters.length === 6 ? viewRenderLosePopup() : '';
}

function controlReplay() {
  // Reset views
  viewResetAll();

  //Reset state
  modelResetState();

  // Reinitiate state
  controlInit();
}

///////////////////////////
//Event Handlers
window.addEventListener('load', controlInit);

window.addEventListener('keydown', function (e) {
  e.code.startsWith('Key') ? controlPress(e.key.toLowerCase()) : '';
});

btnReplay.addEventListener('click', controlReplay);
