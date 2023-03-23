const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  intervalId = setInterval(changeBgColor, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(intervalId);
});
