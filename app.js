const form = document.querySelector('#signupForm');
const message = document.querySelector('#formMessage');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const checkboxInput = document.querySelector('#checkbox');

const nameError = document.querySelector('#nameError');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const checkboxError = document.querySelector('#checkboxError');

const toggle = document.querySelector('#theme-toggle');

console.log('app.js loaded');

if (!toggle) {
    throw new Error('Missing #theme-toggle');
}

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
})

if (!form || !message || !nameInput || !emailInput || !passwordInput || !nameError || !emailError || !passwordError || !checkboxError) {
    throw new Error('Missing expected elements in the page');
}

function setFieldError(input, error, text) {
  if (text) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', error.id);
    error.textContent = text;
  } else {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    error.textContent = '';
  }
}

function validate() {

  message.textContent = '';

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const checkbox = checkboxInput.value;

  let firstInvalid = null;

  if (!name) {
    setFieldError(nameInput, nameError, 'Please enter your name.');
    firstInvalid ??= nameInput;
  } else if (name.length < 2) {
    setFieldError(nameInput, nameError, 'Invalid. Name must be longer than 2 characters.');
    firstInvalid ??= nameInput;
  } else {
    setFieldError(nameInput, nameError, '');
  }

  if (!email) {
    setFieldError(emailInput, emailError, 'Please enter your email address');
    firstInvalid ??= emailInput;
  } else if (!emailInput.checkValidity()) {
    setFieldError(emailInput, emailError, 'Invalid. Enter a valid email address, such as: yourname@example.com');
    firstInvalid ??= emailInput;
  } else {
    setFieldError(emailInput, emailError, '');
  }

  if (!password) {
    setFieldError(passwordInput, passwordError, 'Please enter a password.');
    firstInvalid ??= passwordInput;
  } else if (password.length < 8) {
    setFieldError(passwordInput, passwordError, 'Invalid. Password must be longer than 8 characters.');
    firstInvalid ??= passwordInput;
  } else {
    setFieldError(passwordInput, passwordError, '');
  }

  return { ok: !firstInvalid, firstInvalid };

}

/*
checkbox.addEventListener('change', (event) => {
  if (!this.checked) {
    setFieldError(checkboxInput, checkboxError, 'Please check the box to agree to terms of service.');
    firstInvalid ??= checkboxInput;
  } else {
    setFieldError(checkboxInput, checkboxError, '');
  }
});
*/

form.addEventListener('submit', (event) => { 
    event.preventDefault();

    const { ok, firstInvalid } = validate();
    if (!ok) {
      message.textContent = 'Please fix the error(s) and try again.';
      firstInvalid.focus();
      return;
    }
    
    message.textContent = 'Submission successful! Your account has been created!';
    form.reset();
});
