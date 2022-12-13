import Notiflix from 'notiflix';

const formRefs = document.querySelector('.form');

formRefs.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let delay = evt.currentTarget.delay.valueAsNumber;
  let stepDelay = evt.currentTarget.step.valueAsNumber;
  const amountOfPromises = evt.currentTarget.amount.valueAsNumber;

  console.log(`Початкова затримка: ${delay}`);
  console.log(`Затримка під час повторень: ${stepDelay}`);
  console.log(`Кількість повторень: ${amountOfPromises}`);
  for (let position = 1; position < amountOfPromises + 1; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
