class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = document.querySelector(`${selector}`);
    this.targetDate = targetDate;
    this.init();
  }
  init() {
    const time = this.getTimeComponents(0);
    this.updateTimerFace(time);
  }
  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.init();
        return;
      }

      const time = this.getTimeComponents(deltaTime);
      this.updateTimerFace(time);
    }, 1000);
  }
  updateTimerFace({ days, hours, mins, secs }) {
    this.selector.querySelector('[data-value="days"]').textContent = days;
    this.selector.querySelector('[data-value="hours"]').textContent = hours;
    this.selector.querySelector('[data-value="mins"]').textContent = mins;
    this.selector.querySelector('[data-value="secs"]').textContent = secs;
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2021'),
});

window.onload = myTimer.start();

const refs = {
  inputEl: document.querySelector('#timer-input'),
  btnEl: document.querySelector('.timer-btn'),
};

let inputValue = '';

refs.inputEl.addEventListener('blur', onInputBlur);

function onInputBlur(e) {
  inputValue = e.target.value;
}

function updateTargetDateOnClick(e) {
  myTimer.targetDate = new Date(inputValue);
  console.log(myTimer.targetDate);
  window.onload = myTimer.start();
}

refs.btnEl.addEventListener('click', updateTargetDateOnClick);
