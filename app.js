const btnPomodoro = document.querySelector("#btn-pomodoro");
const btnShortBreak = document.querySelector("#btn-shortbreak");
const btnLongBreak = document.querySelector("#btn-longbreak");
const btnStart = document.querySelector("#btn-start");
const btnStop = document.querySelector("#btn-stop");
const hideOptions = document.querySelector(".btn");
const liveTimer = document.querySelector(".live-timer");

let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let startingMinutes;
let startingSeconds;
let timerHasStarted = false;

btnPomodoro.disabled = false;
btnShortBreak.disabled = false;
btnLongBreak.disabled = false;

let clickSound = new Audio("audio/click.mp3");
let dingSound = new Audio("audio/ding.mp3");

const twoDigit = (timeValue) => (timeValue < 10 ? (timeValue = "0" + timeValue) : timeValue);

function updateTimer(m, s) {
  minutes.innerText = twoDigit(m);
  seconds.innerText = twoDigit(s);

  startingMinutes = minutes.innerText;
  startingSeconds = seconds.innerText;
}

function timerSettings(bgColor, btnStartColor, btnStopColor, timerText) {
  document.body.style.backgroundColor = bgColor;
  btnStart.style.color = btnStartColor;
  btnStop.style.color = btnStopColor;
  liveTimer.innerText = `${startingMinutes}:${startingSeconds} - ${timerText}!`;
  btnPomodoro.classList.remove("active");
  btnShortBreak.classList.remove("active2");
  btnLongBreak.classList.remove("active3");
}

function disableTimerSelection(off) {
  btnPomodoro.disabled = off;
  btnShortBreak.disabled = off;
  btnLongBreak.disabled = off;
}

function startPomodoro() {
  if (!timerHasStarted) {
    timerHasStarted = true;
    disableTimerSelection(true);

    clickSound.play();

    btnStart.style.display = "none";
    btnStop.style.display = "inline";

    if (startingMinutes == 5) {
      startingMinutes = 4;
      startingMinutes = twoDigit(startingMinutes);
    } else if (startingMinutes == 25) {
      startingMinutes = 24;
    } else if (startingMinutes == 15) {
      startingMinutes = 14;
    }

    startingSeconds = 59;

    minutes.innerText = startingMinutes;
    seconds.innerText = startingSeconds;

    let minutesInterval = setInterval(minutesTimer, 60000);
    let secondsInterval = setInterval(secondsTimer, 1000);

    function minutesTimer() {
      startingMinutes--;
      startingMinutes = twoDigit(startingMinutes);
      minutes.innerText = startingMinutes;
    }

    function secondsTimer() {
      startingSeconds--;
      startingSeconds = twoDigit(startingSeconds);
      seconds.innerText = startingSeconds;
      // console.log(`${startingMinutes}:${startingSeconds}`);
      liveTimer.innerText = `${startingMinutes}:${startingSeconds} - Stay focused, be present`;

      if (startingSeconds <= 0) {
        if (startingMinutes <= 0) {
          clearInterval(minutesInterval);
          clearInterval(secondsInterval);
          dingSound.play();
          //location.reload()
          disableTimerSelection(false);
          timerHasStarted = false;
          btnStart.style.display = "inline";
          btnStop.style.display = "none";
          defaultPomodoroTimer();
        }
        startingSeconds = 60;
      }
    }
  }
}

function defaultPomodoroTimer() {
  updateTimer(25, 0);
  timerSettings("#D95550", "#D95550", "#D95550", "Time to stay focus");
  btnPomodoro.classList.add("active");
}

btnPomodoro.addEventListener("click", defaultPomodoroTimer);

btnShortBreak.addEventListener("click", () => {
  updateTimer(5, 0);
  timerSettings("#4c9195", "#4c9195", "#4c9195", "Time for a break");
  btnShortBreak.classList.add("active2");
});

btnLongBreak.addEventListener("click", () => {
  updateTimer(15, 0);
  timerSettings("#457ca3", "#457ca3", "#457ca3", "Let's take a break");
  btnLongBreak.classList.add("active3");
});

btnStart.addEventListener("click", startPomodoro);

btnStop.addEventListener("click", () => {
  clickSound.play();

  if (timerHasStarted) {
    if (confirm("Are you sure you want to give up ?") == true) {
      location.reload();
    }
  }
});

defaultPomodoroTimer();
