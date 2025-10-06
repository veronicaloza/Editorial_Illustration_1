
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
    "Human Design blends astrology, I Ching, Kabbalah, and chakras.",

    "Followers claim sleeping alone preserves one’s aura.",

    "Day, a former surfer turned coach, embraced it after hitting rock bottom.",

    "He was told he’s a ‘projector’ — meant to follow intuition, not hustle.",

    "Human Design offers five types: manifestors, generators, manifesting generators, projectors, and reflectors.",

    "Followers credit it with self‑discovery; critics note its cult‑like edges.",

    "It’s booming on social media, spawning coaches, retreats, and high‑priced readings.",

    "Some make drastic life changes — divorces, moves, isolation — to ‘decondition.’",

    "Practitioners warn of ‘not‑self conditioning forces’ causing frustration or bitterness.",

    "Founder Ra Uru Hu (born Robert Krakower) claimed revelations from a mysterious ‘voice’ in 1987 on Ibiza.",

    "He created the system’s charts and wrote The Black Book.",

    "Prophecies include new ‘nonhuman’ children arriving after 2027.",

    "Supporters describe it as ‘endless knowledge’ and a way to find authentic identity.",

    "Critics see commercialism and manipulation: a ‘Wild West’ industry.",

    "Day earns income giving $250 readings yet warns against rigid dogma.",

    "The author’s own reading labels them a ‘manifesting generator’ urged to preserve their aura—perhaps, still open to love.",
];

const randomContainer = document.getElementById("random-text-container");
// Removed dayDisplay and progressBar since we removed the timer display

let phraseIndex = 0;
let intervalIds = [];
let startTime = Date.now();
let currentDay = 1;
let textElements = [];
const TOTAL_CYCLE_TIME = 64000;
const DAY_DURATION = TOTAL_CYCLE_TIME / 8;


const floatingClasses = ['floating', 'floating-alt1', 'floating-alt2'];


const textColors = ['#BCFAFB', '#FFF8E7', '#D3D3D3'];

function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    element.classList.add('typing');
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            // Use requestAnimationFrame for better performance when possible
            if (speed < 16) {
                requestAnimationFrame(typeChar);
            } else {
                setTimeout(typeChar, speed + Math.random() * 20); // Reduced randomness
            }
        } else {
            element.classList.remove('typing');
        }
    }

    typeChar();
}

function createRandomText() {
    console.log("📝 Creating random text...", textElements.length, "elements currently");

    const textElement = document.createElement('div');
    textElement.className = 'random-text';
    textElement.textContent = '';
    textElement.createdAt = Date.now();

    const phraseToType = randomPhrases[phraseIndex];

    // Generate text across the full 2048px viewport
    const x = Math.random() * (2048 - 300) + 0; // Full width minus text width
    const y = Math.random() * (2048 - 100) + 50; // Full height with some margin

    const fontSize = Math.random() * 20 + 14; // Slightly smaller range for better readability

    const randomColor = textColors[Math.floor(Math.random() * textColors.length)];

    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
    textElement.style.fontSize = fontSize + 'px';
    textElement.style.color = randomColor;
    textElement.style.width = '300px'; // Set fixed width
    textElement.style.textAlign = 'center'; // Center text within the element
    textElement.style.whiteSpace = 'normal'; // Allow text wrapping
    textElement.style.wordWrap = 'break-word'; // Break long words if necessary

    randomContainer.appendChild(textElement);
    textElements.push(textElement);

    // Auto-remove old elements to prevent memory buildup (more aggressive cleanup)
    const maxElements = currentDay <= 4 ? 50 : (currentDay <= 6 ? 70 : 100); // Match the generation limits
    if (textElements.length > maxElements) {
        const elementsToRemove = textElements.length - maxElements + 10; // Remove extra elements
        for (let i = 0; i < elementsToRemove; i++) {
            const oldElement = textElements.shift();
            if (oldElement && oldElement.parentNode) {
                oldElement.classList.add('hide');
                setTimeout(() => {
                    if (oldElement.parentNode) {
                        oldElement.parentNode.removeChild(oldElement);
                    }
                }, 100); // Faster removal
            }
        }
    }

    setTimeout(() => {
        textElement.classList.add('show');

        typewriterEffect(textElement, phraseToType, 30 + Math.random() * 40);

        const typingDuration = phraseToType.length * (30 + 20); // 
        setTimeout(() => {
            const randomFloatingClass = floatingClasses[Math.floor(Math.random() * floatingClasses.length)];
            textElement.classList.add(randomFloatingClass);
        }, typingDuration + 200);
    }, 50);

    phraseIndex = (phraseIndex + 1) % randomPhrases.length;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const newDay = Math.floor(elapsedTime / DAY_DURATION) % 8 + 1;

    if (newDay !== currentDay) {
        currentDay = newDay;
        // Removed dayDisplay.textContent update since we removed the timer display
        updateExponentialGeneration();
        updateTimeline(); // Update the visual timeline
    }

    // Removed progress bar update since we removed the timer display

    // Check if we need to reset (completed 8 days)
    if (elapsedTime >= TOTAL_CYCLE_TIME && elapsedTime % TOTAL_CYCLE_TIME < 100) {
        resetCycle();
    }
}

function updateTimeline() {
    // Update all circles based on current day
    for (let i = 1; i <= 8; i++) {
        const circle = document.getElementById(`circle-${i}`);
        if (circle) {
            circle.classList.remove('active', 'completed');

            if (i < currentDay) {
                circle.classList.add('completed');
            } else if (i === currentDay) {
                circle.classList.add('active');
            }
        }
    }
}

function updateExponentialGeneration() {
    // Clear all existing intervals
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    // Progressive generation - each day significantly more than the previous
    let numIntervals;
    let baseInterval;

    // Ensure every day has more generation than the previous
    switch (currentDay) {
        case 1:
            numIntervals = 2;
            baseInterval = 1400;
            break;
        case 2:
            numIntervals = 4;
            baseInterval = 1200;
            break;
        case 3:
            numIntervals = 7;
            baseInterval = 1000;
            break;
        case 4:
            numIntervals = 11;
            baseInterval = 800;
            break;
        case 5:
            numIntervals = 16;
            baseInterval = 650;
            break;
        case 6:
            numIntervals = 23;
            baseInterval = 500;
            break;
        case 7:
            numIntervals = 32;
            baseInterval = 350;
            break;
        case 8:
            numIntervals = 45;
            baseInterval = 200;
            break;
        default:
            numIntervals = 1;
            baseInterval = 2000;
    }

    console.log(`🚀 Day ${currentDay}: Creating ${numIntervals} generation intervals with ${baseInterval}ms base interval!`);

    // Create intervals with better performance
    for (let i = 0; i < numIntervals; i++) {
        // Stagger the intervals for organic timing
        const intervalDelay = baseInterval + (i * 50) + Math.random() * 200; // Reduced staggering
        const intervalId = setInterval(() => {
            // Only create text if we don't have too many elements (increased limit for later days)
            const maxElements = currentDay <= 4 ? 50 : (currentDay <= 6 ? 70 : 100); // Increased limits
            if (textElements.length < maxElements) {
                createRandomText();
            } else {
                console.log(`⚠️ Element limit reached for day ${currentDay}: ${textElements.length}/${maxElements}`);
            }
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

    // Update UI - removed dayDisplay and progressBar references
    // Reset timeline
    updateTimeline();

    // Clear all existing intervals
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    // Restart the cycle after clearing animation
    setTimeout(() => {
        startCycle();
    }, 1000);
}

function startCycle() {
    console.log("🎬 Starting cycle!");
    // Initialize first day generation
    currentDay = 1;
    updateExponentialGeneration(); // REACTIVATED
    updateTimeline(); // Initialize timeline

    // Start timer updates
    setInterval(updateTimer, 100);
}

// Start the initial cycle after a delay
setTimeout(() => {
    console.log("🚀 Initializing application...");
    startCycle();
}, 2000);