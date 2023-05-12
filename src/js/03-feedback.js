import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');


const storageKey = 'feedback-form-state';


const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
};


const loadFormState = () => {
  const savedFormState = localStorage.getItem(storageKey);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};


const clearFormState = () => {
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
};


const submitForm = (event) => {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (emailValue && messageValue) {
    const formState = {
      email: emailValue,
      message: messageValue,
    };

    console.log(formState);

    clearFormState();
  }
};


form.addEventListener('input', throttle(saveFormState, 500));
window.addEventListener('load', loadFormState);
form.addEventListener('submit', submitForm);
