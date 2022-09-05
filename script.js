let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

// DOM elements
const startStopBtn = document.querySelector("#startStopBtn");
const resetLapBtn = document.querySelector("#resetLapBtn");
const timeDisplay = document.querySelector("#display");
const lapList = document.querySelector("#lapList");

function stopwatchObj() {
  return {
    startTime: 0,
    elapsedTime: 0,
    intervalId: null,
    lapStartTimeforNextLap: 0,
    reset: function () {
      Object.assign(this, stopwatchObj());
    },
  };
}
//=========================================================================================================
// Initialization
// Setting up a load handler to do the main startup work once the page is fully loaded.
//
//=========================================================================================================

window.addEventListener("load", startup, false);

let stopwatch = stopwatchObj();

function startup() {
  startStopBtn.addEventListener("click", startStopBtnEvent);
  resetLapBtn.addEventListener("click", resetLapStopwatch);
}

//=========================================================================================================
// startStopBtnEvent
//
//
//=========================================================================================================

function startStopBtnEvent() {
  if (startStopBtn.textContent === "Start") {
    stopwatch.startTime = Date.now();

    stopwatch.intervalId = window.setInterval(stopWatch, 10);

    startStopBtn.textContent = "Stop";
    startStopBtn.style.color = "#F51000";
    startStopBtn.style.backgroundColor = "#3D0400";
    resetLapBtn.textContent = "Lap";
  } // Stop
  else {
    stopwatch.elapsedTime += Date.now() - stopwatch.startTime;

    window.clearInterval(stopwatch.intervalId);
    startStopBtn.textContent = "Start";
    startStopBtn.style.color = "#00FF00";
    startStopBtn.style.backgroundColor = "#023C25";
    resetLapBtn.textContent = "Reset";
  }
}

//=========================================================================================================
// Stopwatch
//
//
//=========================================================================================================

function stopWatch() {
  const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime;

  // display the time in the html
  timeDisplay.textContent = displayFormattedTime(elapsedTime);
}

//=========================================================================================================
// displayFormattedTime
//
//
//=========================================================================================================

function displayFormattedTime(a_milliseconds) {
  const hours = `0${new Date(a_milliseconds).getHours() - 1}`.slice(-2);
  const minutes = `0${new Date(a_milliseconds).getMinutes()}`.slice(-2);
  const seconds = `0${new Date(a_milliseconds).getSeconds()}`.slice(-2);
  const milliSec = `00${new Date(a_milliseconds).getMilliseconds()}`.slice(-3);

  return `${hours}:${minutes}:${seconds}:${milliSec}`;
}

//=========================================================================================================
// resetLapStopwatch
//
//
//=========================================================================================================
function resetLapStopwatch() {
  if (resetLapBtn.textContent === "Reset") {
    window.clearInterval(stopwatch.intervalId);

    stopwatch.reset();

    timeDisplay.textContent = "00:00:00:00";
    startStopBtn.textContent = "Start";
    resetLapBtn.textContent = "Reset";
    lapList.innerHTML = "";
  } // Lap
  else {
    // find the difference between current time and the last lap time and add to the lap list

    const lapItem = document.createElement("li");

    const numLapItems = lapList.children.length;

    if (numLapItems === 0) {
      lapItem.textContent = timeDisplay.textContent;
      stopwatch.lapStartTimeforNextLap = timeDisplay.textContent;
    } else {
      const lapEndTime = tomiliseconds(timeDisplay.textContent); // time when the lap is clicked
      const lapStartTime = tomiliseconds(stopwatch.lapStartTimeforNextLap); // current lap started time

      lapItem.textContent = displayFormattedTime(lapEndTime - lapStartTime);

      stopwatch.lapStartTimeforNextLap = timeDisplay.textContent;
    }

    lapList.appendChild(lapItem);
  }
}

function tomiliseconds(displayFormatedTime) {
  let timeParts = displayFormatedTime.split(":");
  const [hrs, min, sec, ms] = timeParts;

  return (hrs * 60 * 60 + min * 60 + sec) * 1000 + parseFloat(ms);
}
