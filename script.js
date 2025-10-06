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
    "The author's own reading labels them a 'manifesting generator' urged to preserve their aura—perhaps, still open to love."
];

const randomContainer = document.getElementById("random-text-container");
const dayIndicator = document.getElementById("day-indicator");
const progressBar = document.getElementById("progress-bar");

let phraseIndex = 0;
let intervalIds = [];
let currentDay = 1;
let textElements = [];

const floatingClasses = ['floating', 'floating-alt1', 'floating-alt2'];
const textColors = ['#BCFAFB', '#FFF8E7', '#D3D3D3'];

// Scroll-based day progression
function updateDayBasedOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / totalHeight) * 100;

    // Calculate current day based on scroll position (8 days total)
    const newDay = Math.min(Math.floor((scrollPercent / 100) * 8) + 1, 8);

    if (newDay !== currentDay) {
        currentDay = newDay;
        dayIndicator.textContent = `Day ${currentDay}`;
        updateTimeline();
        updateTextGeneration();
    }

    // Update progress bar
    progressBar.style.width = (scrollPercent / 8 * currentDay) + '%';
}

// Update timeline circles
function updateTimeline() {
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

// Progressive text generation based on current day
function updateTextGeneration() {
    // Clear existing intervals
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    // Progressive generation - each day more than previous
    let numIntervals;
    let baseInterval;

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

    // Create intervals for text generation
    for (let i = 0; i < numIntervals; i++) {
        const intervalDelay = baseInterval + (i * 50) + Math.random() * 200;
        const intervalId = setInterval(() => {
            const maxElements = currentDay <= 4 ? 50 : (currentDay <= 6 ? 70 : 100);
            if (textElements.length < maxElements) {
                createRandomText();
            }
        }, intervalDelay);
        intervalIds.push(intervalId);
    }
}

// Typewriter effect
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    element.classList.add('typing');
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            if (speed < 16) {
                requestAnimationFrame(typeChar);
            } else {
                setTimeout(typeChar, speed + Math.random() * 20);
            }
        } else {
            element.classList.remove('typing');
        }
    }

    typeChar();
}

// Create random text elements
function createRandomText() {
    console.log("📝 Creating random text...", textElements.length, "elements currently");

    const textElement = document.createElement('div');
    textElement.className = 'random-text';
    textElement.textContent = '';
    textElement.createdAt = Date.now();

    const phraseToType = randomPhrases[phraseIndex];

    // Position text below the header area (400px+ from top)
    const x = Math.random() * (window.innerWidth - 300) + 0;
    const y = 400 + Math.random() * (window.innerHeight - 500) + 50; // Start from 400px down

    const fontSize = Math.random() * 20 + 14;
    const randomColor = textColors[Math.floor(Math.random() * textColors.length)];

    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
    textElement.style.fontSize = fontSize + 'px';
    textElement.style.color = randomColor;
    textElement.style.width = '300px';
    textElement.style.textAlign = 'center';
    textElement.style.whiteSpace = 'normal';
    textElement.style.wordWrap = 'break-word';

    randomContainer.appendChild(textElement);
    textElements.push(textElement);

    // Auto-remove old elements to prevent memory buildup
    const maxElements = currentDay <= 4 ? 50 : (currentDay <= 6 ? 70 : 100);
    if (textElements.length > maxElements) {
        const elementsToRemove = textElements.length - maxElements + 10;
        for (let i = 0; i < elementsToRemove; i++) {
            const oldElement = textElements.shift();
            if (oldElement && oldElement.parentNode) {
                oldElement.classList.add('hide');
                setTimeout(() => {
                    if (oldElement.parentNode) {
                        oldElement.parentNode.removeChild(oldElement);
                    }
                }, 100);
            }
        }
    }

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

// Initialize the application
function initializeApp() {
    console.log("🚀 Initializing scroll-based day progression...");

    // Set initial day
    currentDay = 1;
    dayIndicator.textContent = `Day ${currentDay}`;
    updateTimeline();
    updateTextGeneration();

    // Add scroll listener
    window.addEventListener('scroll', updateDayBasedOnScroll);

    // Update on initial load
    updateDayBasedOnScroll();
}

// Start the application
setTimeout(() => {
    initializeApp();
}, 1000);
