let startTime = 0;
let elapsed = 0;
let running = false;
let interval;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const clickSound = document.getElementById('clickSound'); // 🔊 Sound element

function playClickSound() {
    clickSound.currentTime = 0; // Always start from beginning
    clickSound.play();          // Play sound
}

function updateDisplay(time) {
    const ms = time % 1000;
    const sec = Math.floor(time / 1000) % 60;
    const min = Math.floor(time / 60000) % 60;
    const hr = Math.floor(time / 3600000);
    display.textContent =
        `${pad(hr)}:${pad(min)}:${pad(sec)}.${ms.toString().padStart(3, '0')}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

startStopBtn.addEventListener('click', () => {
    playClickSound(); // 🔊

    if (!running) {
        startTime = Date.now() - elapsed;
        interval = setInterval(() => {
            elapsed = Date.now() - startTime;
            updateDisplay(elapsed);
        }, 10);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(interval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
});

resetBtn.addEventListener('click', () => {
    playClickSound(); // 🔊
    clearInterval(interval);
    elapsed = 0;
    updateDisplay(0);
    startStopBtn.textContent = 'Start';
    running = false;
});
