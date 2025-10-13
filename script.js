const randomPhrases = [
    "White room. Breathing walls. Sound thick as water.",
    "In 1987, Ra Uru Hu—then Robert Krakower—disappeared into the quiet of Ibiza.",
    "A cold voice vibrates behind his skull, neither inside nor out.",
    "He later claimed it lasted eight nights—an initiation through chemistry and chaos.",
    "Symbols unfold: stars wired to chakras, codes pulsing with strange geometry.",
    "When it ends, his desk glows with charts and cryptic diagrams.",
    "Gravity unhooks. The sea of Ibiza hums in fractals.",
    "He calls it a transmission, not a hallucination—a map for evolution.",
    "He writes as if possessed, sketching blueprints of human mechanics.",
    "The Voice whispers: 'You’re designed. Not random.'",
    "He dissolves. Ego thins. Only frequency remains.",
    "Morning breaks like data streaming through dawn.",
    "Five archetypes appear: generators, projectors, reflectors, hybrids, and initiators.",
    "Critics call it madness; seekers call it revelation.",
    "He dreams again—atoms rearranging like patient code.",
    "He wakes certain: consciousness runs on circuitry and myth.",
    "Years later, his words echo through apps and quiet retreats.",
    "And still, that Voice lingers—calm, impossible, listening back."
];

// Cache DOM elements
const randomContainer = document.getElementById("random-text-container");
const animationSection = document.getElementById('animation-section');
const rulerProgress = document.querySelector('.ruler-progress');
const fixedElements = [
    document.querySelector('.line'),
    document.querySelector('.main-title'),
    document.querySelector('.subtitle'),
    document.querySelector('.image-container'),
    document.querySelector('.horizontal-line-2'),
    document.querySelector('.sub-navigation'),
    document.querySelector('.ruler-navigation')
];

// State variables
let phraseIndex = 0;
let currentDay = 1;
let textElements = [];
let scrollProgress = 0;
let completionLogged = false;

// Configuration
const floatingClasses = ['floating', 'floating-alt1', 'floating-alt2'];
const textColors = ['#0212EE', '#D1FE01', '#FEC6E9', '#FF1B99', '#F3F3E9', '#32FE6B'];

function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    element.classList.add('typing');

    // Split text into words
    const words = text.split(' ');
    let i = 0;

    function typeWord() {
        if (i < words.length) {
            // Add the word and a space (except for the last word)
            element.textContent += words[i] + (i < words.length - 1 ? ' ' : '');
            i++;

            if (speed < 16) {
                requestAnimationFrame(typeWord);
            } else {
                setTimeout(typeWord, speed + Math.random() * 20);
            }
        } else {
            element.classList.remove('typing');
        }
    }

    typeWord();
}

function createRandomText() {
    console.log("Creating random text...", textElements.length, "elements currently");

    const textElement = document.createElement('div');
    textElement.className = 'random-text';
    textElement.textContent = '';
    textElement.createdAt = Date.now();
    textElement.day = currentDay;
    const phraseToType = randomPhrases[phraseIndex];


    const horizontalLine2 = document.querySelector('.horizontal-line-2');
    const lineRect = horizontalLine2.getBoundingClientRect();


    const contentAreaTop = lineRect.bottom + 20;
    const contentAreaBottom = Math.min(window.innerHeight, 2048) - 50;
    const contentAreaLeft = 20;
    const contentAreaRight = Math.min(window.innerWidth, 2048) - 20;


    const x = Math.random() * (contentAreaRight - contentAreaLeft - 300) + contentAreaLeft;
    const y = Math.random() * (contentAreaBottom - contentAreaTop - 100) + contentAreaTop;

    const fontSize = Math.random() * 30 + 10;

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

// Removed - no longer needed as we keep all text elements

function hideTextsFromDay(dayToHide) {
    const textsToHide = textElements.filter(el => el.day === dayToHide);

    textsToHide.forEach(textElement => {
        if (textElement && !textElement.classList.contains('hidden')) {
            textElement.style.opacity = '0';
            textElement.style.pointerEvents = 'none';
            textElement.classList.add('hidden');
        }
    });
}

function showTextsForDay(dayToShow) {
    const textsToShow = textElements.filter(el => el.day === dayToShow);

    textsToShow.forEach(textElement => {
        if (textElement && textElement.classList.contains('hidden')) {
            textElement.style.opacity = '1';
            textElement.style.pointerEvents = 'auto';
            textElement.classList.remove('hidden');
        }
    });
}

function updateRulerNavigation() {
    // Update ruler markers
    const markers = document.querySelectorAll('.ruler-marker');
    markers.forEach((marker, index) => {
        const day = index + 1;
        marker.classList.remove('active', 'completed');

        if (day < currentDay) {
            marker.classList.add('completed');
        } else if (day === currentDay) {
            marker.classList.add('active');
        }
    });

    // Update progress bar
    if (rulerProgress) {
        const progressPercent = ((currentDay - 1) / 7) * 100;
        rulerProgress.style.width = `${progressPercent}%`;
    }
}

function addDayTransitionEffect(day) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        z-index: 5000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 200);
    });

    const activeMarker = document.querySelector(`.ruler-marker[data-day="${day}"]`);
    if (activeMarker) {
        const tick = activeMarker.querySelector('.marker-tick');
        if (tick) {
            tick.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
            setTimeout(() => tick.style.boxShadow = '', 1000);
        }
    }
}


function getTargetTextsForPosition(scrollPercent) {
    scrollPercent = Math.max(0, scrollPercent);
    const day = Math.min(8, Math.max(1, Math.floor(scrollPercent / 50) + 1));
    const dayProgress = (scrollPercent % 50) / 50;
    const textsPerDay = [3, 8, 15, 20, 30, 50, 60, 80, 90];
    const prevDayTexts = day > 1 ? textsPerDay[day - 1] : 0;
    const currentDayTexts = Math.floor(textsPerDay[day] * dayProgress);
    const targetTotal = prevDayTexts + currentDayTexts;

    return { targetTotal, day };
}

function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const totalScrollPercent = (scrollTop / windowHeight) * 100;

    scrollProgress = Math.min(450, totalScrollPercent);

    // Completion logging
    if (scrollProgress >= 400 && currentDay === 8 && !completionLogged) {
        console.log("✓ All 8 days complete! Keep scrolling to reveal the image...");
        completionLogged = true;
    } else if (scrollProgress < 400) {
        completionLogged = false;
    }

    // Fade all elements after 400% scroll
    if (totalScrollPercent > 400) {
        const fadeAmount = Math.min(1, (totalScrollPercent - 400) / 50);

        if (animationSection) animationSection.style.opacity = 1 - fadeAmount;
        fixedElements.forEach(el => el && (el.style.opacity = 1 - fadeAmount));
    } else {
        if (animationSection) animationSection.style.opacity = 1;
        fixedElements.forEach(el => el && (el.style.opacity = 1));
    }

    const { targetTotal, day } = getTargetTextsForPosition(scrollProgress);
    const previousDay = currentDay;

    // Update day and navigation
    if (day !== currentDay) {
        currentDay = day;
        updateRulerNavigation();
        addDayTransitionEffect(day);

        // Hide texts when scrolling backwards
        if (day < previousDay) {
            for (let d = day + 1; d <= 8; d++) {
                hideTextsFromDay(d);
            }
        }
        // Show texts when scrolling forwards
        else if (day > previousDay) {
            for (let d = previousDay + 1; d <= day; d++) {
                showTextsForDay(d);
            }
        }
    }

    // Only create new texts if we don't have enough total (never created before)
    const currentTotal = textElements.length;
    const difference = targetTotal - currentTotal;

    if (difference > 0) {
        const batchSize = Math.min(8, difference);
        for (let i = 0; i < batchSize; i++) {
            createRandomText();
        }
    }
}

let updateTimeout;
function throttledUpdate() {
    if (!updateTimeout) {
        updateTimeout = requestAnimationFrame(() => {
            updateProgress();
            updateTimeout = null;
        });
    }
}

function handleNavigationClick(day) {
    const windowHeight = window.innerHeight;
    const targetScrollPercent = (day - 1) * 50;
    const targetScrollPosition = (targetScrollPercent / 100) * windowHeight;

    window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
    });
}

function init() {
    console.log("Initializing scroll-based animation...");

    // Scroll event listener
    window.addEventListener('scroll', throttledUpdate, { passive: true });

    // Ruler navigation click handlers
    document.querySelectorAll('.ruler-marker').forEach((marker) => {
        marker.addEventListener('click', () => {
            const day = parseInt(marker.dataset.day);
            handleNavigationClick(day);
        });
    });

    // Initialize navigation and progress
    updateRulerNavigation();
    updateProgress();

    console.log("Ready! Scroll down to progress through the 8 days.");
    console.log("   Days 1-8 span 0-400% scroll (4 viewports)");
    console.log("   Image reveals after 400% scroll");
    console.log("   Click ruler markers to jump to specific days");
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
