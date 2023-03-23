import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval = null;

const updateTimer = distance => {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysValue.textContent = days.toString().padStart(2, '0');
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');
};

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        const distance = selectedDate.getTime() - new Date().getTime();
        if (distance <= 0) {
          clearInterval(countdownInterval);
          updateTimer(0);
        } else {
          updateTimer(distance);
        }
      }, 1000);
    }
  },
});

startButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  const selectedDate = flatpickr.parseDate(datePicker.value, 'Y-m-d H:i');
  const distance = selectedDate.getTime() - new Date().getTime();
  countdownInterval = setInterval(() => {
    const distance = selectedDate.getTime() - new Date().getTime();
    if (distance <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
    } else {
      updateTimer(distance);
    }
  }, 1000);
});
