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
let styles = document.querySelector(".select-style");
let audio = document.querySelector(".audio");
let circle = document.querySelector(".clock svg circle:nth-of-type(2)");
let colorContain = document.querySelector(".color-contain .color");
let fontContain = document.querySelector(".font-contain .fonts");
let root = document.documentElement;
// get settings
let curTime,
  font = "bold",
  clockCounter = 100,
  clockPrecent = 0,
  color = "#ff6666";
//timer all related
const setTimer = (time = 25) => {
  timer.textContent = `${String(time).padStart(2, "0")}:00`;
};
setTimer(25);
const countDown = () => {
  let [minute, second] = timer.textContent.split(":");
  if (second <= 11 && second % 2 !== 0 && minute === "00") {
    timer.style.color = "red";
    pause.style.color = "red";
  } else {
    timer.style.color = "#eee";
    pause.style.color = "#eee";
  }
  if (second == 3 && minute === "00") audio.play();
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
  } else if (pause.textContent == "restart ") {
    document.querySelector("h3.active").click();
    pause.innerHTML = 'start <i class="fas fa-play"></i>';
  } else {
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
styles.addEventListener("click", function (e) {
  if (e.target.tagName === "H3") {
    activeClass(e);
    clearInterval(countDownInt);
    curTime = document.querySelector(`#${e.target.dataset.time}`).value;
    setTimer(curTime);
    pause.innerHTML = 'start <i class="fas fa-play"></i>';
    circleDefult();
  }
});
// change settings and apply
btnApply.addEventListener("click", function () {
  document.querySelector("h3.active").click();
  color = getComputedStyle(
    colorContain.querySelector(".active")
  ).backgroundColor;
  font = getComputedStyle(fontContain.querySelector(".active")).fontWeight;
  body.style.fontWeight = font;
  root.style.setProperty("--primaryColor", color);
  showHideSettings();
});
//font + color change
const activeClass = function (e) {
  if (e.target.tagName === "SPAN" || e.target.tagName === "H3") {
    [...e.target.parentElement.children].forEach((child) => {
      child.classList.remove("active");
    });
    e.target.classList.add("active");
  }
};
fontContain.addEventListener("click", activeClass);
colorContain.addEventListener("click", activeClass);
