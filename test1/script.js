
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
    "Human Design blends astrology, I Ching, Kabbalah, and chakras.",

    "Followers claim sleeping alone preserves one's aura.",

    "Day, a former surfer turned coach, embraced it after hitting rock bottom.",

    "He was told he's a 'projector' — meant to follow intuition, not hustle.",

    "Human Design offers five types: manifestors, generators, manifesting generators, projectors, and reflectors.",

    "Followers credit it with self‑discovery; critics note its cult‑like edges.",

    "It's booming on social media, spawning coaches, retreats, and high‑priced readings.",

    "Some make drastic life changes — divorces, moves, isolation — to 'decondition.'",

    "Practitioners warn of 'not‑self conditioning forces' causing frustration or bitterness.",

    "Founder Ra Uru Hu (born Robert Krakower) claimed revelations from a mysterious 'voice' in 1987 on Ibiza.",

    "He created the system's charts and wrote The Black Book.",

    "Prophecies include new 'nonhuman' children arriving after 2027.",

    "Supporters describe it as 'endless knowledge' and a way to find authentic identity.",

    "Critics see commercialism and manipulation: a 'Wild West' industry.",

    "Day earns income giving $250 readings yet warns against rigid dogma.",

    "The author's own reading labels them a 'manifesting generator' urged to preserve their aura—perhaps, still open to love.",
];

const randomContainer = document.getElementById("random-text-container");

let phraseIndex = 0;
let currentDay = 1;
let textElements = [];
let virtualScrollPosition = 0; // Virtual scroll position (0-100)

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
    textElement.day = currentDay; // Track which day this text belongs to

    const phraseToType = randomPhrases[phraseIndex];

    // Generate text across the actual viewport (with max 2048px)
    const viewportWidth = Math.min(window.innerWidth, 2048);
    const viewportHeight = Math.min(window.innerHeight, 2048);
    const x = Math.random() * (viewportWidth - 300) + 0; // Full width minus text width
    const y = Math.random() * (viewportHeight - 100) + 50; // Full height with some margin

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

    setTimeout(() => {
        textElement.classList.add('show');

        typewriterEffect(textElement, phraseToType, 30 + Math.random() * 40);

        const typingDuration = phraseToType.length * (30 + 20);
        setTimeout(() => {
            const randomFloatingClass = floatingClasses[Math.floor(Math.random() * floatingClasses.length)];
            textElement.classList.add(randomFloatingClass);
        }, typingDuration + 200);
    }, 50);

    phraseIndex = (phraseIndex + 1) % randomPhrases.length;
}

function removeOldestText() {
    if (textElements.length > 0) {
        const oldElement = textElements.shift();
        if (oldElement && oldElement.parentNode) {
            oldElement.classList.add('hide');
            setTimeout(() => {
                if (oldElement.parentNode) {
                    oldElement.parentNode.removeChild(oldElement);
                }
            }, 500); // Smooth fade out
        }
    }
}

function removeTextsFromDay(dayToRemove) {
    // Remove all texts belonging to a specific day
    const textsToRemove = textElements.filter(el => el.day === dayToRemove);

    textsToRemove.forEach(textElement => {
        // Remove from array
        const index = textElements.indexOf(textElement);
        if (index > -1) {
            textElements.splice(index, 1);
        }

        // Remove from DOM
        if (textElement && textElement.parentNode) {
            textElement.classList.add('hide');
            setTimeout(() => {
                if (textElement.parentNode) {
                    textElement.parentNode.removeChild(textElement);
                }
            }, 500);
        }
    });

    if (textsToRemove.length > 0) {
        console.log(`🗑️ Removed ${textsToRemove.length} texts from Day ${dayToRemove}`);
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

// Get the target number of texts for a given scroll position (0-100)
// Only show current day and previous day (max 2 days)
function getTargetTextsForPosition(scrollPercent) {
    // Clamp between 0 and 100
    scrollPercent = Math.max(0, Math.min(100, scrollPercent));

    // Calculate which day we're on (0-100% = days 1-8)
    const day = Math.min(8, Math.max(1, Math.floor(scrollPercent / 12.5) + 1));

    // Progress within the current day (0-1)
    const dayProgress = (scrollPercent % 12.5) / 12.5;

    // Texts to add per day (not cumulative)
    const textsPerDay = [0, 15, 20, 30, 40, 50, 65, 80, 100];

    // Calculate how many texts should be visible from previous day
    let prevDayTexts = 0;
    if (day > 1) {
        prevDayTexts = textsPerDay[day - 1];
    }

    // Calculate how many texts should be visible from current day
    const currentDayTexts = Math.floor(textsPerDay[day] * dayProgress);

    // Total is previous day (if exists) + current day progress
    const targetTotal = prevDayTexts + currentDayTexts;

    return { targetTotal, day, prevDayTexts, currentDayTexts };
}

function updateProgress() {
    // Calculate target texts and day based on virtual scroll position
    const { targetTotal, day, prevDayTexts, currentDayTexts } = getTargetTextsForPosition(virtualScrollPosition);

    const previousDay = currentDay;

    // Update current day if it changed
    if (day !== currentDay) {
        console.log(`📅 Progress to Day ${day} (${virtualScrollPosition.toFixed(1)}% virtual scroll)`);
        currentDay = day;
        updateTimeline();

        // Clean up texts from days that are too old (older than previous day)
        const oldestDayToKeep = Math.max(1, currentDay - 1);
        for (let d = 1; d < oldestDayToKeep; d++) {
            removeTextsFromDay(d);
        }

        // Also clean up future days if we scrolled backward
        if (day < previousDay) {
            for (let d = day + 1; d <= 8; d++) {
                removeTextsFromDay(d);
            }
        }
    }

    const currentTotal = textElements.length;
    const difference = targetTotal - currentTotal;

    if (difference > 0) {
        // Add texts (scrolling down)
        const batchSize = Math.min(3, difference); // Add up to 3 at a time
        for (let i = 0; i < batchSize; i++) {
            createRandomText();
        }
        console.log(`➕ Day ${currentDay}: Added ${batchSize} texts (${currentTotal} → ${textElements.length}/${targetTotal}) [Prev: ${prevDayTexts}, Curr: ${currentDayTexts}]`);
    } else if (difference < 0) {
        // Remove texts (scrolling up)
        const batchSize = Math.min(3, Math.abs(difference)); // Remove up to 3 at a time
        for (let i = 0; i < batchSize; i++) {
            removeOldestText();
        }
        console.log(`➖ Day ${currentDay}: Removed ${batchSize} texts (${currentTotal} → ${textElements.length}/${targetTotal}) [Prev: ${prevDayTexts}, Curr: ${currentDayTexts}]`);
    }
}

// Handle wheel events (scroll gestures)
function onWheel(event) {
    event.preventDefault();

    // Normalize wheel delta across browsers
    let delta = event.deltaY || event.detail || event.wheelDelta;

    // Convert to a consistent scale (positive = scroll down, negative = scroll up)
    if (event.deltaMode === 1) { // DOM_DELTA_LINE
        delta *= 33;
    } else if (event.deltaMode === 2) { // DOM_DELTA_PAGE
        delta *= 100;
    }

    // Adjust virtual scroll position (scale the delta for smoother control)
    // Each full scroll should move ~1.5% of total progress
    const scrollSpeed = 4; // Adjust this to change sensitivity
    virtualScrollPosition += (delta * scrollSpeed) / 100;

    // Clamp between 0 and 100
    virtualScrollPosition = Math.max(0, Math.min(100, virtualScrollPosition));

    // Update the animation
    updateProgress();
}

// Throttle updates for better performance
let updateTimeout;
function throttledUpdate() {
    if (!updateTimeout) {
        updateTimeout = setTimeout(() => {
            updateProgress();
            updateTimeout = null;
        }, 50); // Update every 50ms max
    }
}

// Initialize
function init() {
    console.log("🚀 Initializing wheel-based animation...");

    // Set up wheel listener (prevent actual scrolling)
    window.addEventListener('wheel', onWheel, { passive: false });

    // Also handle keyboard arrows for accessibility
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            virtualScrollPosition = Math.min(100, virtualScrollPosition + 2);
            throttledUpdate();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            virtualScrollPosition = Math.max(0, virtualScrollPosition - 2);
            throttledUpdate();
        } else if (e.key === 'Home') {
            e.preventDefault();
            virtualScrollPosition = 0;
            throttledUpdate();
        } else if (e.key === 'End') {
            e.preventDefault();
            virtualScrollPosition = 100;
            throttledUpdate();
        }
    });

    // Initialize timeline
    updateTimeline();

    // Start at day 1
    updateProgress();

    console.log("✅ Ready! Use mouse wheel or arrow keys to progress through the 8 days.");
    console.log("   Scroll down = progress forward, Scroll up = go backward");
}

// Start after a brief delay
setTimeout(() => {
    init();
}, 500);
