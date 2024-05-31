let startTime;
let elapsedTime = 0;
let timerInterval;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    
    return {
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        milliseconds: milliseconds.toString().padStart(2, '0')
    };
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
    millisecondsDisplay.textContent = time.milliseconds;
}

function startStop() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = '#dc3545';
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    lapsList.innerHTML = '';
}

function lap() {
    const time = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `${time.minutes}:${time.seconds}:${time.milliseconds}`;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
