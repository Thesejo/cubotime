let timer;
let isRunning = false;
let elapsedTime = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

// Inicializa el reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkit.SpeechRecognition)();
recognition.continuous = true;

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();

    if (transcript.includes("empieza")) {
        startTimer();
    }

    if (transcript.includes("ya")) {
        stopTimer();
    }
};

recognition.onerror = (event) => {
    console.error('Error de reconocimiento de voz:', event.error);
};

startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true; // Desactiva el botón durante el reconocimiento
});

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timer = setInterval(() => {
        elapsedTime += 1000;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0; // Reinicia el tiempo
    timerDisplay.textContent = '00:00';
}

function updateDisplay() {
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}
