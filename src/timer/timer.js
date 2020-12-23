import { template } from "./template.js";

const refs = {
  bodyRefs: document.querySelector("body"),
};
const addTemplate = () => {
  refs.bodyRefs.insertAdjacentHTML("afterbegin", template());
};
addTemplate();

const timerRefs = {
  daysRef: document.querySelector(`span[data-value="days"]`),
  hoursRef: document.querySelector(`span[data-value="hours"]`),
  minsRef: document.querySelector(`span[data-value="mins"]`),
  secsRef: document.querySelector(`span[data-value="secs"]`),
};

const timer = {
  start() {
    const startTime = new Date("2020-12-31:23:59");
    setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = startTime - currentTime;
      updateClockFace(deltaTime);
    }, 1000);
  },
};
const timerValue = timer.start();

function updateClockFace(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */

  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  timerRefs.daysRef.textContent = `${days}`;
  timerRefs.hoursRef.textContent = `${hours}`;
  timerRefs.minsRef.textContent = `${mins}`;
  timerRefs.secsRef.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}
