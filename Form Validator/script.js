const username = document.querySelector('.username-input');
const email = document.querySelector('.email-input');
const password1 = document.querySelector('.password-input');
const password2 = document.querySelector('.confirm-password-input');

const form = document.querySelector('.form');

////////////////////////////////////
// FUNCTIONS

const showSuccess = function (field) {
  field.style.border = '0.2rem solid var(--success-color)';
  const formControl = field.closest('.form-control');
  const errText = formControl.querySelector('.error-text');
  errText.classList.add('hidden');
};

const showError = function (field, errorText) {
  field.style.border = '0.2rem solid var(--error-color)';
  const formControl = field.closest('.form-control');
  const errText = formControl.querySelector('.error-text');
  errText.classList.remove('hidden');
  errText.innerText = errorText;
};

function getFieldName(field) {
  return field.id[0].toUpperCase() + field.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    input.value === ''
      ? showError(input, `${getFieldName(input)} is required`)
      : '';
  });
}

function checkLength(field, min, max) {
  if (field.value.length < min)
    showError(
      field,
      `${getFieldName(field)} must be at least ${min} characters`
    );
  else if (field.value.length > max)
    showError(
      field,
      `${getFieldName(field)} must be less than ${max} characters`
    );
  else showSuccess(field);
}

function checkEmail(field) {
  String(field.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? showSuccess(field)
    : showError(field, 'Email is not valid');
}

function checkPasswordMatch(field1, field2) {
  field1.value === field2.value
    ? showSuccess(field2)
    : showError(field2, `Passwords do not match`);
}

///////////////////////////////////
// EVENT HANDLERS

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkLength(username, 3, 15);
  checkLength(password1, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password1, password2);
  checkRequired([username, email, password1, password2]);
});
