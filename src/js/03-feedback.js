import throttle from 'lodash.throttle';

// Отримання елементів форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Ключ для збереження у локальне сховище
const storageKey = 'feedback-form-state';

// Функція, яка зберігає значення полів у локальне сховище
const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
};

// Функція, яка заповнює поля форми зі значеннями з локального сховища
const loadFormState = () => {
  const savedFormState = localStorage.getItem(storageKey);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

// Функція, яка очищує локальне сховище та поля форми
const clearFormState = () => {
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
};

// Функція, яка виводить у консоль об'єкт зі значеннями полів форми
const submitForm = (event) => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formState);

  clearFormState();
};

// Додавання обробників подій до форми
form.addEventListener('input', throttle(saveFormState, 500));
window.addEventListener('load', loadFormState);
form.addEventListener('submit', submitForm);
