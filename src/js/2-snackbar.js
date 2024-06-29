import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInputs = document.querySelectorAll('input[name="state"]');
  const selectedState = Array.from(stateInputs).find(input => input.checked);

  if (!selectedState) {
    iziToast.error({
      title: 'Помилка',
      message: 'Будь ласка, оберіть стан проміса',
    });
    return;
  }

  const delay = parseInt(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    if (selectedState.value === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise
    .then(value => {
      iziToast.success({
        title: '✅ Успішно',
        message: `Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.error({
        title: '❌ Помилка',
        message: `Rejected promise in ${value}ms`,
      });
    });
});
