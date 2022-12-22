const body = document.querySelector('body');
const btnNav = document.querySelector('.btn-menu');
const btnSign = document.querySelector('.btn-sign');
const modalView = document.querySelector('.modal-view');
const btnModalClose = document.querySelector('.close-modal-btn');

const form = document.querySelector('.sign-up-form');
const inputNameField = document.querySelector('.input-name');
const inputEmailField = document.querySelector('.input-email');
const inputPasswordField = document.querySelector('.input-password1');
const inpuConfirmPassField = document.querySelector('.input-password2');

//////////////////////////////
// Functions

const toggleNavBar = function () {
  body.classList.toggle('open-nav');
};

const openModalView = function () {
  modalView.classList.remove('hidden');
};

const closeModalView = function () {
  modalView.classList.add('hidden');
};

const cheackForm = function () {
  // Check Email validation
  checkEmail(inputEmailField);

  // Chack Password match
  checkPasswordMatch(inputPasswordField, inpuConfirmPassField);
};

function checkEmail(field) {
  String(field.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? ''
    : alert('Email is not valid');
}

function checkPasswordMatch(field1, field2) {
  field1.value === field2.value ? '' : alert(`Passwords do not match`);
}

function clearInputFields() {
  const inputFields = [
    inputNameField,
    inputEmailField,
    inputPasswordField,
    inpuConfirmPassField,
  ];
  inputFields.forEach(field => (field.value = ''));
}
//////////////////////////////
// Event Handlers
btnNav.addEventListener('click', toggleNavBar);
btnSign.addEventListener('click', openModalView);
btnModalClose.addEventListener('click', closeModalView);
modalView.addEventListener('click', function (e) {
  const target = e.target.closest('.model');
  if (target.classList.contains('modal-view')) closeModalView();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  cheackForm();
  clearInputFields();
});
