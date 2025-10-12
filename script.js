
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

let phraseIndex = 0;
let currentDay = 1;
let textElements = [];
let scrollProgress = 0;
let completionLogged = false;

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

    scrollPercent = Math.max(0, scrollPercent);

    // Map 0-400% scroll to days 1-8 (each day is 50% now)
    const day = Math.min(8, Math.max(1, Math.floor(scrollPercent / 50) + 1));


    const dayProgress = (scrollPercent % 50) / 50;


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
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // Days 1-8 span from 0-400% of scroll (4 viewports)
    // Article appears after 400% (image reveals)
    scrollProgress = Math.min(400, (scrollTop / windowHeight) * 100);

    // Calculate total scroll percentage (beyond 400%)
    const totalScrollPercent = (scrollTop / windowHeight) * 100;

    // Show completion message when Day 8 is done (at 400% scroll)
    if (scrollProgress >= 400 && currentDay === 8 && !completionLogged) {
        console.log("✓ All 8 days complete! Keep scrolling to reveal the image...");
        completionLogged = true;
    } else if (scrollProgress < 400) {
        completionLogged = false;
    }

    // Start fading everything after 400% scroll (after Day 8 completes)
    const animationSection = document.getElementById('animation-section');
    const fixedElements = [
        document.querySelector('.line'),
        document.querySelector('.main-title'),
        document.querySelector('.subtitle'),
        document.querySelector('.image-container'),
        document.querySelector('.horizontal-line-1'),
        document.querySelector('.horizontal-line-2'),
        document.querySelector('.sub-navigation'),
        document.querySelector('.vertical-timeline')
    ];

    if (totalScrollPercent > 400) {
        // Fade from 400% to 450% scroll (0.5 viewport for smooth transition)
        const fadeAmount = Math.min(1, (totalScrollPercent - 400) / 50);

        // Fade animation section
        if (animationSection) {
            animationSection.style.opacity = 1 - fadeAmount;
        }

        // Fade all fixed elements
        fixedElements.forEach(element => {
            if (element) {
                element.style.opacity = 1 - fadeAmount;
            }
        });
    } else {
        // Reset opacity when scrolling back up
        if (animationSection) {
            animationSection.style.opacity = 1;
        }

        fixedElements.forEach(element => {
            if (element) {
                element.style.opacity = 1;
            }
        });
    }

    const { targetTotal, day, prevDayTexts, currentDayTexts } = getTargetTextsForPosition(scrollProgress);

    const previousDay = currentDay;


    if (day !== currentDay) {
        console.log(`Progress to Day ${day} (${scrollProgress.toFixed(1)}% scroll progress)`);
        currentDay = day;
        updateTimeline();

        addDayTransitionEffect(day);

        // Only remove texts when scrolling backwards
        if (day < previousDay) {
            for (let d = day + 1; d <= 8; d++) {
                removeTextsFromDay(d);
            }
        }
        // When moving forward, keep all previous day texts on screen
    }

    const currentTotal = textElements.length;
    const difference = targetTotal - currentTotal;

    if (difference > 0) {
        // Add new texts as we progress
        const batchSize = Math.min(8, difference);
        for (let i = 0; i < batchSize; i++) {
            createRandomText();
        }
        console.log(`Day ${currentDay}: Added ${batchSize} texts (total: ${textElements.length}/${targetTotal})`);
    } else if (difference < 0 && currentDay < previousDay) {
        // Only remove texts when scrolling backwards
        const batchSize = Math.min(8, Math.abs(difference));
        for (let i = 0; i < batchSize; i++) {
            removeOldestText();
        }
        console.log(`Day ${currentDay}: Removed ${batchSize} texts (scrolling back)`);
    }
}


let updateTimeout;
function throttledUpdate() {
    if (!updateTimeout) {
        updateTimeout = setTimeout(() => {
            updateProgress();
            updateTimeout = null;
        }, 16);
    }
}


function handleNavigationClick(day) {
    const windowHeight = window.innerHeight;
    // Each day is now 50% of scroll (400% / 8 days)
    const targetScrollPercent = (day - 1) * 50;
    const targetScrollPosition = (targetScrollPercent / 100) * windowHeight;

    window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
    });
}


function init() {
    console.log("Initializing scroll-based animation...");

    window.addEventListener('scroll', throttledUpdate, { passive: true });


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

    console.log("Ready! Scroll down to progress through the 8 days.");
    console.log("   Days 1-8 span 0-400% scroll (4 viewports)");
    console.log("   Image reveals after 400% scroll");
    console.log("   Click timeline circles to jump to specific days");
}


setTimeout(() => {
    init();
}, 500);
