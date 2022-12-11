const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let changeColorID = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', startChangeColorOfBody);
refs.stopBtn.addEventListener('click', stopChangeColorOfBody);

function startChangeColorOfBody() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  changeColorID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColorOfBody() {
  clearInterval(changeColorID);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
