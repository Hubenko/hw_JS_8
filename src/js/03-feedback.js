import throttle from 'lodash.throttle';
const formInput = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formData = {};
initPage();

const throttledOnFormInput = throttle(onFormInput, 500);
formInput.addEventListener('input', throttledOnFormInput);

function onFormInput(event) {
  const { name, value } = event.target;
  try {
    let saveData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saveData) {
      saveData = JSON.parse(saveData);
    } else {
      saveData = {};
    }
    saveData[name] = value;
    const stringifyData = JSON.stringify(saveData);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifyData);
  } catch (error) {
    console.log(error);
  }
}

function initPage() {
  const saveData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saveData) {
    try {
      const parseData = JSON.parse(saveData);
      Object.entries(parseData).forEach(([name, value]) => {
        formInput.elements[name].value = value;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

formInput.addEventListener('submit', handleSubmit);
