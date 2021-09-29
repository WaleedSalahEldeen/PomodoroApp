"use strict";

let body = document.querySelector("body");
let btnSettings = document.querySelector(".btn-settings");
let settingsWindow = document.querySelector(".pop-settings");
let overleyLayer = document.querySelector(".overley-off");
let btnApply = document.querySelector(".pop-settings button");
let timer = document.querySelector(".timer");
let closeSettings = document.querySelector(".pop-settings .main-header span ");
let clock = document.querySelector(".clock");
let pause = document.querySelector(".pause");
let pmodoroStyle = document.querySelector(".select-style h3:nth-of-type(1)");
let shortStyle = document.querySelector(".select-style h3:nth-of-type(2)");
let longStyle = document.querySelector(".select-style h3:nth-of-type(3)");
let pomodoroInput = document.querySelector("#pomodoro");
let longInput = document.querySelector("#long");
let shortInput = document.querySelector("#short");
let audio = document.querySelector(".audio");
let circle = document.querySelector(".clock svg circle:nth-of-type(2)");
let boldFont = document.querySelector(
  ".font-contain .fonts span:nth-of-type(1)"
);
let medFont = document.querySelector(
  ".font-contain .fonts span:nth-of-type(2)"
);
let regFont = document.querySelector(
  ".font-contain .fonts  span:nth-of-type(3)"
);
let redColor = document.querySelector(
  ".color-contain .color span:nth-of-type(1)"
);
let cyanColor = document.querySelector(
  ".color-contain .color span:nth-of-type(2)"
);
let purpleColor = document.querySelector(
  ".color-contain .color  span:nth-of-type(3)"
);
let root = document.documentElement;
// get settings
let pTime,
  sTime,
  lTime,
  font = "bold",
  clockCounter = 100,
  clockPrecent = 0,
  color = "#ff6666";
function getSettings() {
  pTime = Number(pomodoroInput.value);
  sTime = Number(shortInput.value);
  lTime = Number(longInput.value);
}
getSettings();
//timer all related
const setTimer = (time = 25) => {
  timer.textContent = `${String(time).padStart(2, "0")}:00`;
};
setTimer(25);
const countDown = () => {
  let [minute, second] = timer.textContent.split(":");
  if (second <= 11 && second % 2 !== 0) {
    timer.style.color = "red";
    pause.style.color = "red";
  } else {
    timer.style.color = "#eee";
    pause.style.color = "#eee";
  }
  if (second == 3) audio.play();
  if (clockPrecent == 0) {
    clockPrecent = 100 / (minute * 60);
  }
  if (minute === "00" && (second === "01" || second === "00")) {
    clearInterval(countDownInt);
    pause.innerHTML = 'restart <i class="fas fa-redo"></i>';
    if (second === "00") return "";
  } else if (minute !== "00") minute = Number(minute);
  second = second === "00" ? 60 : Number(second);
  if (second === 60) minute--;
  second--;
  timer.textContent = `${String(minute).padStart(2, "0")}:${String(
    second
  ).padStart(2, "0")}`;
  clockCounter -= clockPrecent;
  circle.style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
};
let countDownInt;
//show and hide model of settings
const showHideSettings = function (e) {
  settingsWindow.classList.toggle("hidden");
  overleyLayer.classList.toggle("overley");
};

btnSettings.addEventListener("click", showHideSettings);
closeSettings.addEventListener("click", showHideSettings);
overleyLayer.addEventListener("click", showHideSettings);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !settingsWindow.classList.contains("hidden")) {
    showHideSettings();
  }
});

// pause and resume
clock.addEventListener("click", function () {
  if (pause.textContent == "pause ") {
    pause.innerHTML = 'resume <i class="fas fa-play"></i>';
    clearInterval(countDownInt);
    if (pause.textContent == "start ") {
      pause.innerHTML = 'pause <i class="fas fa-pause"></i>';
      countDownInt = setInterval(countDown, 1000);
    }
  } else {
    if (pause.textContent == "restart ")
      document.querySelector("h3.active").click();
    pause.innerHTML = 'pause <i class="fas fa-pause"></i>';
    countDownInt = setInterval(countDown, 1000);
  }
});
// return circle to defualt statue
let circleDefult = function () {
  circle.style.cssText = `stroke-dashoffset: calc(817 - (817 * 100) / 100);`;
  clockPrecent = 0;
  clockCounter = 100;
  timer.style.color = "#eee";
  pause.style.color = "#eee";
};
//change style
shortStyle.addEventListener("click", function () {
  pmodoroStyle.classList.remove("active");
  longStyle.classList.remove("active");
  shortStyle.classList.add("active");
  getSettings();
  clearInterval(countDownInt);
  setTimer(sTime);
  pause.innerHTML = 'start <i class="fas fa-play"></i>';
  circleDefult();
});
pmodoroStyle.addEventListener("click", function () {
  shortStyle.classList.remove("active");
  longStyle.classList.remove("active");
  pmodoroStyle.classList.add("active");
  getSettings();
  clearInterval(countDownInt);
  setTimer(pTime);
  pause.innerHTML = 'start <i class="fas fa-play"></i>';
  circleDefult();
});
longStyle.addEventListener("click", function () {
  pmodoroStyle.classList.remove("active");
  shortStyle.classList.remove("active");
  longStyle.classList.add("active");
  getSettings();
  clearInterval(countDownInt);
  setTimer(lTime);
  pause.innerHTML = 'start <i class="fas fa-play"></i>';
  circleDefult();
});
// change settings and apply
btnApply.addEventListener("click", function () {
  document.querySelector("h3.active").click();
  if (regFont.classList.contains("active")) font = "100";
  else if (medFont.classList.contains("active")) font = "500";
  else font = "700";
  body.style.fontWeight = font;
  if (redColor.classList.contains("active")) color = "#ff6666";
  else if (cyanColor.classList.contains("active")) color = "#1ab905";
  else color = "#d683f9";
  root.style.setProperty("--primaryColor", color);
  showHideSettings();
});
//font change
boldFont.addEventListener("click", function () {
  regFont.classList.remove("active");
  medFont.classList.remove("active");
  boldFont.classList.add("active");
});
regFont.addEventListener("click", function () {
  boldFont.classList.remove("active");
  medFont.classList.remove("active");
  regFont.classList.add("active");
});
medFont.addEventListener("click", function () {
  regFont.classList.remove("active");
  boldFont.classList.remove("active");
  medFont.classList.add("active");
});
//change color
cyanColor.addEventListener("click", function () {
  redColor.classList.remove("active");
  purpleColor.classList.remove("active");
  cyanColor.classList.add("active");
});
redColor.addEventListener("click", function () {
  cyanColor.classList.remove("active");
  purpleColor.classList.remove("active");
  redColor.classList.add("active");
});
purpleColor.addEventListener("click", function () {
  redColor.classList.remove("active");
  cyanColor.classList.remove("active");
  purpleColor.classList.add("active");
});
