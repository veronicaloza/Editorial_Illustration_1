
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
let virtualScrollPosition = 0;

const floatingClasses = ['floating', 'floating-alt1', 'floating-alt2'];
const textColors = ['#BFD5F3', '#DFE6F6', '#FDE8DF'];

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
            }, 500);
        }
    }
}

function removeTextsFromDay(dayToRemove) {

    const textsToRemove = textElements.filter(el => el.day === dayToRemove);

    textsToRemove.forEach(textElement => {

        const index = textElements.indexOf(textElement);
        if (index > -1) {
            textElements.splice(index, 1);
        }


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
        console.log(`Removed ${textsToRemove.length} texts from Day ${dayToRemove}`);
    }
}

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


    updateNavigation();
}

function updateNavigation() {

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


    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }, 200);


    const activeCircle = document.getElementById(`circle-${day}`);
    if (activeCircle) {
        activeCircle.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
        setTimeout(() => {
            activeCircle.style.boxShadow = '';
        }, 1000);
    }
}


function getTargetTextsForPosition(scrollPercent) {

    scrollPercent = Math.max(0, Math.min(100, scrollPercent));


    const day = Math.min(8, Math.max(1, Math.floor(scrollPercent / 12.5) + 1));


    const dayProgress = (scrollPercent % 12.5) / 12.5;


    const textsPerDay = [0, 5, 15, 35, 65, 110, 170, 250, 350];


    let prevDayTexts = 0;
    if (day > 1) {
        prevDayTexts = textsPerDay[day - 1];
    }


    const currentDayTexts = Math.floor(textsPerDay[day] * dayProgress);


    const targetTotal = prevDayTexts + currentDayTexts;

    return { targetTotal, day, prevDayTexts, currentDayTexts };
}

function updateProgress() {

    const { targetTotal, day, prevDayTexts, currentDayTexts } = getTargetTextsForPosition(virtualScrollPosition);

    const previousDay = currentDay;


    if (day !== currentDay) {
        console.log(`Progress to Day ${day} (${virtualScrollPosition.toFixed(1)}% virtual scroll)`);
        currentDay = day;
        updateTimeline();


        addDayTransitionEffect(day);


        const oldestDayToKeep = Math.max(1, currentDay - 1);
        for (let d = 1; d < oldestDayToKeep; d++) {
            removeTextsFromDay(d);
        }


        if (day < previousDay) {
            for (let d = day + 1; d <= 8; d++) {
                removeTextsFromDay(d);
            }
        }
    }

    const currentTotal = textElements.length;
    const difference = targetTotal - currentTotal;

    if (difference > 0) {

        const batchSize = Math.min(8, difference);
        for (let i = 0; i < batchSize; i++) {
            createRandomText();
        }
        console.log(`Day ${currentDay}: Added ${batchSize} texts (${currentTotal} → ${textElements.length}/${targetTotal}) [Prev: ${prevDayTexts}, Curr: ${currentDayTexts}]`);
    } else if (difference < 0) {

        const batchSize = Math.min(8, Math.abs(difference));
        for (let i = 0; i < batchSize; i++) {
            removeOldestText();
        }
        console.log(`Day ${currentDay}: Removed ${batchSize} texts (${currentTotal} → ${textElements.length}/${targetTotal}) [Prev: ${prevDayTexts}, Curr: ${currentDayTexts}]`);
    }
}


function onWheel(event) {
    event.preventDefault();


    let delta = event.deltaY || event.detail || event.wheelDelta;


    if (event.deltaMode === 1) {
        delta *= 33;
    } else if (event.deltaMode === 2) {
        delta *= 100;
    }


    const scrollSpeed = 4;
    virtualScrollPosition += (delta * scrollSpeed) / 100;


    virtualScrollPosition = Math.max(0, Math.min(100, virtualScrollPosition));


    updateProgress();
}

let updateTimeout;
function throttledUpdate() {
    if (!updateTimeout) {
        updateTimeout = setTimeout(() => {
            updateProgress();
            updateTimeout = null;
        }, 50);
    }
}


function handleNavigationClick(day) {

    const targetScrollPosition = (day - 1) * 12.5;
    const startPosition = virtualScrollPosition;
    const distance = targetScrollPosition - startPosition;
    const duration = 1000;
    const startTime = Date.now();

    function animateTransition() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);


        const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        virtualScrollPosition = startPosition + (distance * easeInOutCubic);
        updateProgress();

        if (progress < 1) {
            requestAnimationFrame(animateTransition);
        }
    }

    animateTransition();
}


function init() {
    console.log("Initializing wheel-based animation...");


    window.addEventListener('wheel', onWheel, { passive: false });


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


    for (let i = 1; i <= 8; i++) {
        const timelineItem = document.querySelector(`.timeline-item-vertical[data-day="${i}"]`);
        if (timelineItem) {
            timelineItem.addEventListener('click', () => {
                console.log(`Navigating to Day ${i}`);
                handleNavigationClick(i);
            });
        }
    }


    const loginBtn = document.getElementById('login-btn');
    const newsletterBtn = document.getElementById('newsletter-btn');
    const subscribeBtn = document.getElementById('subscribe-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('Login clicked');
            alert('Login functionality would be implemented here');
        });
    }

    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            console.log('Newsletter clicked');

            alert('Newsletter signup would be implemented here');
        });
    }

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            console.log('Subscribe clicked');

            alert('Subscription functionality would be implemented here');
        });
    }


    updateTimeline();


    updateProgress();

    console.log("Ready! Use mouse wheel, arrow keys, or timeline to progress through the 8 days.");
    console.log("   Scroll down = progress forward, Scroll up = go backward");
    console.log("   Click timeline circles to jump to specific days");
}


setTimeout(() => {
    init();
}, 500);
