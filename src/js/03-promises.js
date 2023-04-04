import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(form.querySelector('input[name="step"]').value);
  const amount = Number(form.querySelector('input[name="amount"]').value);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            useIcon: false,
            width: '240px',
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            useIcon: false,
            width: '240px',
          }
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
