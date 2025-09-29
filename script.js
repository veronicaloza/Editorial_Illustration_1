
const lines = [
    "Establishing a secure connection…",
    "Verifying identity…",
    "Encrypting data…",
    "Connection secured!"
];


const fadeInDuration = 1000;
const displayDuration = 2000;
const fadeOutDuration = 1000;

let currentIndex = 0;
const el = document.getElementById("rotating-text");


function showLine(index) {
    el.textContent = lines[index];

    el.classList.add("fade-in");
    el.classList.remove("fade-out");


    setTimeout(() => {
        el.classList.remove("fade-in");
        el.classList.add("fade-out");
    }, fadeInDuration + displayDuration);


    setTimeout(() => {
        currentIndex = (currentIndex + 1) % lines.length;
        showLine(currentIndex);
    }, fadeInDuration + displayDuration + fadeOutDuration);
}


setTimeout(() => {
    showLine(currentIndex);
}, 100);

const randomPhrases = [
    "Do you feel?",
    "The pattern.",
    "Are you here?",
    "Carving geometry upon your skin.",
    "The Tekhalom hums between your hand and the tool, spirit leaving fingerprints in matter.",
    "Your blood remembers the Gnesthrae, the womb-net weaving tribe, shadow, fire.",
    "You are made of Orascent, ascending through possibility not time.",
    "Viscendral roots branch through you, each choice echoing as countless selves.",
    "You are not one",
    "You are choruses dreaming they are skin.",
    "The Aetherloom is still humming, weaving your story before your skull hardened.",
    "Do not think, only listen.",
    "Do not listen, only become."
];

const randomContainer = document.getElementById("random-text-container");
const dayDisplay = document.getElementById("day-display");
const progressBar = document.getElementById("progress-bar");

let phraseIndex = 0;
let intervalIds = []; // Track multiple intervals for exponential generation
let startTime = Date.now();
let currentDay = 1;
let textElements = []; // Track all text elements
const MAX_TEXT_ELEMENTS = 100; // Maximum text elements limit
const TOTAL_CYCLE_TIME = 64000; // 64 seconds = 8 days (8 seconds per day)
const DAY_DURATION = TOTAL_CYCLE_TIME / 8; // 8 seconds per day


// Array of floating animation classes
const floatingClasses = ['floating', 'floating-alt1', 'floating-alt2'];

// Array of random colors for text
const textColors = ['#2DFE07', '#FFFD01', '#F60AF4', '#D9D9D9'];

function createRandomText() {
    // Check if we've hit the limit
    if (textElements.length >= MAX_TEXT_ELEMENTS) {
        // Remove oldest element
        const oldestElement = textElements.shift();
        if (oldestElement && oldestElement.parentNode) {
            oldestElement.classList.add('hide');
            setTimeout(() => {
                if (oldestElement.parentNode) {
                    oldestElement.parentNode.removeChild(oldestElement);
                }
            }, 500);
        }
    }

    // Create text element
    const textElement = document.createElement('div');
    textElement.className = 'random-text';
    textElement.textContent = randomPhrases[phraseIndex];
    textElement.createdAt = Date.now(); // Track creation time

    // Random position (avoid edges to prevent cutoff)
    const x = Math.random() * (window.innerWidth - 200) + 50;
    const y = Math.random() * (window.innerHeight - 100) + 50;

    // Random font size between 16px and 48px
    const fontSize = Math.random() * 32 + 12;

    // Random color from the array
    const randomColor = textColors[Math.floor(Math.random() * textColors.length)];

    // Apply styles
    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
    textElement.style.fontSize = fontSize + 'px';
    textElement.style.color = randomColor;

    // Add to container and tracking array
    randomContainer.appendChild(textElement);
    textElements.push(textElement);

    // Show the text and start floating animation
    setTimeout(() => {
        textElement.classList.add('show');
        // Add random floating animation after fade in
        setTimeout(() => {
            const randomFloatingClass = floatingClasses[Math.floor(Math.random() * floatingClasses.length)];
            textElement.classList.add(randomFloatingClass);
        }, 500);
    }, 50);

    // Move to next phrase
    phraseIndex = (phraseIndex + 1) % randomPhrases.length;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const newDay = Math.floor(elapsedTime / DAY_DURATION) % 8 + 1;

    // Update day and generation speed when day changes
    if (newDay !== currentDay) {
        currentDay = newDay;
        dayDisplay.textContent = `Day ${currentDay}`;
        updateExponentialGeneration(); // REACTIVATED
    }

    // Update progress bar (progress within current day)
    const dayProgress = ((elapsedTime % DAY_DURATION) / DAY_DURATION) * 100;
    progressBar.style.width = dayProgress + '%';

    // Check if we need to reset (completed 8 days)
    if (elapsedTime >= TOTAL_CYCLE_TIME && elapsedTime % TOTAL_CYCLE_TIME < 100) {
        resetCycle();
    }
}

function updateExponentialGeneration() {
    // Clear all existing intervals
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    // Calculate exponential generation: 2^(day-1) intervals
    const numIntervals = Math.pow(2, currentDay - 1);
    const baseInterval = 1000; // Base interval of 1 second

    console.log(`🚀 Day ${currentDay}: Creating ${numIntervals} generation intervals!`);

    // Create multiple intervals for exponential generation
    for (let i = 0; i < numIntervals; i++) {
        // Slightly stagger the intervals to create more organic timing
        const intervalDelay = baseInterval + (i * 100);
        const intervalId = setInterval(() => {
            createRandomText();
        }, intervalDelay);
        intervalIds.push(intervalId);
    }
}

function resetCycle() {
    console.log("🔄 Resetting 8-day cycle!");

    // Clear all existing text elements
    textElements.forEach(element => {
        if (element.parentNode) {
            element.classList.add('hide');
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 500);
        }
    });

    // Reset all variables
    textElements = [];
    phraseIndex = 0;
    startTime = Date.now();
    currentDay = 1;

    // Update UI
    dayDisplay.textContent = 'Day 1';
    progressBar.style.width = '0%';

    // Clear all existing intervals
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    // Restart the cycle after clearing animation
    setTimeout(() => {
        startCycle();
    }, 1000);
}

function startCycle() {
    // Initialize first day generation
    currentDay = 1;
    updateExponentialGeneration(); // REACTIVATED

    // Start timer updates
    setInterval(updateTimer, 100);
}

// Start the initial cycle after a delay
setTimeout(() => {
    startCycle();
}, 2000);