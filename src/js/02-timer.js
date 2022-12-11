// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let timer = null;

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  refs.startBtn.disabled = true;
  const timerId = setInterval(() => {
    changeTime();
    if (timer - Date.now() <= 0) {
      clearInterval(timerId);
      refs.days.textContent = `00`;
      refs.hours.textContent = `00`;
      refs.minutes.textContent = `00`;
      refs.seconds.textContent = `00`;
    }
  }, 1000);
}

function changeTime() {
  const dataNow = Date.now();
  const timeForEnd = convertMs(timer - dataNow);

  refs.days.textContent = `${timeForEnd.days}`;
  refs.hours.textContent = `${timeForEnd.hours}`;
  refs.minutes.textContent = `${timeForEnd.minutes}`;
  refs.seconds.textContent = `${timeForEnd.seconds}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      refs.startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
    // console.log(selectedDates[0]);
    // console.log(options.defaultDate);
    timer = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
