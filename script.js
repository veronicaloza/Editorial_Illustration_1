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

const randomContainer = document.getElementById("random-text-container");
const animationSection = document.getElementById('animation-section');
const rulerProgress = document.querySelector('.ruler-progress');

const fadeOutElements = [
    // Title, subtitle, and ruler navigation are commented out
];

const persistentElements = [
    document.querySelector('.horizontal-line-2'),
    document.querySelector('.sub-navigation')
];

let phraseIndex = 0;
let currentDay = 1;
let textElements = [];
let scrollProgress = 0;


const floatingClasses = ['floating', 'floating-alt1', 'floating-alt2'];
const textColors = ['#0212EE', '#D1FE01', '#FEC6E9', '#FF1B99', '#F3F3E9', '#32FE6B'];


const corruptChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~`';
const glitchChars = '█▓▒░▀▄▌▐■□▪▫◘◙◚◛◜◝◞◟◠◡◢◣◤◥';

function corruptText(text, day) {

    const corruptionRate = ((day - 1) / 7) * 0.55 + 0.05;

    let corrupted = '';
    const words = text.split(' ');

    words.forEach((word, wordIndex) => {
        let corruptedWord = '';
        for (let i = 0; i < word.length; i++) {
            const char = word[i];


            if (/[.!?,;:]/.test(char)) {
                corruptedWord += char;
                continue;
            }


            if (Math.random() < corruptionRate) {

                const useGlitch = Math.random() > 0.5 && day >= 4;
                const charSet = useGlitch ? glitchChars : corruptChars;
                corruptedWord += charSet[Math.floor(Math.random() * charSet.length)];
            } else {
                corruptedWord += char;
            }
        }

        corrupted += corruptedWord;
        if (wordIndex < words.length - 1) corrupted += ' ';
    });

    return corrupted;
}

function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    element.classList.add('typing');


    const words = text.split(' ');
    let i = 0;

    function typeWord() {
        if (i < words.length) {

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
    const textElement = document.createElement('div');
    textElement.className = 'random-text';
    textElement.textContent = '';
    textElement.day = currentDay;


    const originalPhrase = randomPhrases[phraseIndex];
    const phraseToType = corruptText(originalPhrase, currentDay);

    const horizontalLine2 = document.querySelector('.horizontal-line-2');
    const lineRect = horizontalLine2.getBoundingClientRect();

    const contentAreaTop = lineRect.bottom + 20;
    const contentAreaBottom = window.innerHeight - 100; // More space for text height
    const contentAreaLeft = 10;
    const contentAreaRight = window.innerWidth - 10;

    // Horizontal density gradient: less text on left, much more on right
    // Use power distribution to concentrate text toward right
    const horizontalRandom = Math.pow(Math.random(), 0.4); // Lower power = more right-heavy
    const x = contentAreaLeft + (horizontalRandom * (contentAreaRight - contentAreaLeft - 350));

    // Ensure text stays within viewport height (accounting for text height)
    const maxTextHeight = 100; // Approximate max height for text element
    const y = Math.random() * (contentAreaBottom - contentAreaTop - maxTextHeight) + contentAreaTop;

    // Text size increases from left to right
    const horizontalPosition = (x - contentAreaLeft) / (contentAreaRight - contentAreaLeft);
    const fontSize = 15 + (horizontalPosition * 35); // Size ranges from 15px (left) to 50px (right)

    const randomColor = textColors[Math.floor(Math.random() * textColors.length)];

    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
    textElement.style.fontSize = fontSize + 'px';
    textElement.style.color = randomColor;
    textElement.style.width = '300px';
    textElement.style.textAlign = 'center';
    textElement.style.whiteSpace = 'normal';
    textElement.style.wordWrap = 'break-word';

    // Add random animation delays for trippy wave effect
    const colorDelay = Math.random() * 15;
    const glowDelay = Math.random() * 4;
    textElement.style.animationDelay = `${glowDelay}s, ${colorDelay}s`;

    randomContainer.appendChild(textElement);
    textElements.push(textElement);


    const shouldBeVisible = currentDay >= textElement.day;

    setTimeout(() => {
        if (shouldBeVisible) {
            textElement.classList.add('show');

            if (currentDay >= 4) {
                textElement.classList.add('corrupted');
            }
        } else {
            textElement.classList.add('hidden');
            textElement.style.opacity = '0';
            textElement.style.pointerEvents = 'none';
        }

        typewriterEffect(textElement, phraseToType, 30 + Math.random() * 40);

        const typingDuration = phraseToType.split(' ').length * (30 + 20);
        setTimeout(() => {
            const randomFloatingClass = floatingClasses[Math.floor(Math.random() * floatingClasses.length)];
            textElement.classList.add(randomFloatingClass);
        }, typingDuration + 200);
    }, 50);

    phraseIndex = (phraseIndex + 1) % randomPhrases.length;
}

function updateTextVisibility() {

    const toShow = [];
    const toHide = [];


    textElements.forEach(textElement => {
        if (!textElement) return;

        const shouldBeVisible = textElement.day <= currentDay;
        const isCurrentlyHidden = textElement.classList.contains('hidden');

        if (shouldBeVisible && isCurrentlyHidden) {
            toShow.push(textElement);
        } else if (!shouldBeVisible && !isCurrentlyHidden) {
            toHide.push(textElement);
        }
    });


    if (toShow.length > 0 || toHide.length > 0) {
        requestAnimationFrame(() => {
            toShow.forEach(el => {
                el.classList.remove('hidden');
                el.style.opacity = '1';
                el.style.pointerEvents = 'auto';
            });

            toHide.forEach(el => {
                el.classList.add('hidden');
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
            });
        });
    }
}

function updateRulerNavigation() {

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

    if (totalScrollPercent > 400) {
        const fadeAmount = Math.min(1, (totalScrollPercent - 400) / 10);

        if (animationSection) animationSection.style.opacity = 1 - fadeAmount;
        fadeOutElements.forEach(el => el && (el.style.opacity = 1 - fadeAmount));

        persistentElements.forEach(el => el && (el.style.opacity = 1));


    } else {
        if (animationSection) animationSection.style.opacity = 1;
        fadeOutElements.forEach(el => el && (el.style.opacity = 1));
        persistentElements.forEach(el => el && (el.style.opacity = 1));
    }


    if (totalScrollPercent <= 400) {
        const { targetTotal, day } = getTargetTextsForPosition(scrollProgress);

        if (day !== currentDay) {
            currentDay = day;
            updateRulerNavigation();
            addDayTransitionEffect(day);

            updateTextVisibility();
        }

        const currentTotal = textElements.length;
        const difference = targetTotal - currentTotal;

        if (difference > 0) {
            const batchSize = Math.min(8, difference);
            for (let i = 0; i < batchSize; i++) {
                createRandomText();
            }
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
    window.addEventListener('scroll', throttledUpdate, { passive: true });

    // Ruler markers are commented out in HTML

    updateRulerNavigation();
    updateProgress();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
