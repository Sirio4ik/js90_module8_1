import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = form.querySelector('input');
const inputMessage = form.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';

let storageData = {};

window.addEventListener('load', formFillingOnLoad);
form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput(e) {
  storageData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
}

function onSubmit(e) {
  e.preventDefault();
  if (e.target.email.value === '' || e.target.message.value === '') {
    return alert('Заповніть всі поля!');
  }
  form.reset();
  console.log(storageData);
  localStorage.removeItem(STORAGE_KEY);
  storageData = {};
}

function formFillingOnLoad() {
  const savedInputs = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedInputs) {
    if (savedInputs.email) {
      inputEmail.value = savedInputs.email;
      storageData.email = savedInputs.email;
    }
    if (savedInputs.message) {
      inputMessage.value = savedInputs.message;
      storageData.message = savedInputs.message;
    }
  }
}
