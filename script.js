// --- FLIP CARD / TOUCH AND HOLD LOGIC (Applied to all .card-wrapper elements) ---

const flipCardsWrapper = document.querySelectorAll(".card-wrapper");
const longPressTime = 300; // 0.3 seconds for Touch and Hold flip
let pressTimer = null;
let isLongPress = false;


function flipCard(cardWrapper) {
    // Toggles the 'is-flipped' class on the card wrapper
    cardWrapper.classList.toggle('is-flipped');
}

// Function to handle the end of touch (lift finger)
const handleTouchEnd = (e, cardWrapper, projectLink, flipCardElement) => {
    clearTimeout(pressTimer);

    if (isLongPress) {
        // 1. If it was a long press, prevent the default link opening action.
        e.preventDefault();
        isLongPress = false;
    } else {
        // 2. If it was a quick tap, and the card is already flipped, we flip it back.
        if (flipCardElement.classList.contains('is-flipped')) {
            e.preventDefault(); // Block link action when user taps back to flip back
            flipCard(cardWrapper);
        }
    }
};

// Function to handle the start of touch
const handleTouchStart = (e, cardWrapper, projectLink, flipCardElement) => {
    // If the card is already flipped, starting a touch means the user wants to interact with the back, so don't start the flip timer.
    if (flipCardElement.classList.contains('is-flipped')) {
        clearTimeout(pressTimer);
        return;
    }

    // Start the timer for long press
    pressTimer = setTimeout(() => {
        isLongPress = true;
        flipCard(cardWrapper); // Flip the card
        // CRITICAL: Prevent the default tap-to-link behavior immediately after flip trigger
        e.preventDefault();
    }, longPressTime);
};


flipCardsWrapper.forEach(cardWrapper => {
    const flipCardElement = cardWrapper.querySelector('.flip-card');
    const projectLink = cardWrapper.querySelector('.project-link');

    // Add touch listeners for flip control (passive: false is necessary to use preventDefault)
    cardWrapper.addEventListener('touchstart', (e) => handleTouchStart(e, cardWrapper, projectLink, flipCardElement), { passive: false });
    cardWrapper.addEventListener('touchend', (e) => handleTouchEnd(e, cardWrapper, projectLink, flipCardElement), { passive: false });
    cardWrapper.addEventListener('touchcancel', (e) => handleTouchEnd(e, cardWrapper, projectLink, flipCardElement), { passive: false });

    // CRITICAL FIX: Block immediate navigation on the final link tap if we are flipping
    projectLink.addEventListener('click', (e) => {
        // If a long press was registered, block the navigation
        if (isLongPress) {
            e.preventDefault();
            isLongPress = false; // Reset the flag

            // On PC, if the link is clicked while flipped, it should open the link.
            // On mobile, if they tap on the flipped card, we flip it back unless they tap the view-link.
        }

        // If the card is flipped, but the user clicks anywhere *except* the view-link, flip it back.
        if (flipCardElement.classList.contains('is-flipped')) {
            if (!e.target.closest('.view-link') && !e.target.closest('.like-btn')) {
                e.preventDefault(); // Block link open
                flipCard(cardWrapper); // Flip back
            }
        }
    });

    // --- PC HOVER CLEANUP / GENERAL FLIPBACK ---
    // If user clicks the front card, allow link. If they click the back card (and not the view link), flip back.
    cardWrapper.addEventListener('click', (e) => {
        // Check if the click was intended to flip back the card
        if (flipCardElement.classList.contains('is-flipped') && !e.target.closest('.view-link')) {
            flipCard(cardWrapper);
            e.preventDefault(); // Block the link click on the anchor tag underneath
        }
    });

});


// --- Your existing code (for Theme Toggle, Hamburger, etc.) remains here ---

// Theme toggle functionality (The existing theme functions must be here)
let themeToggleBtn;

// Function to apply theme
function applyTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-mode");
        if (themeToggleBtn) {
            themeToggleBtn.textContent = "☀️";
            themeToggleBtn.setAttribute("aria-pressed", "true");
            themeToggleBtn.title = "Switch to dark mode";
        }
    } else {
        document.body.classList.remove("light-mode");
        if (themeToggleBtn) {
            themeToggleBtn.textContent = "🌙";
            themeToggleBtn.setAttribute("aria-pressed", "false");
            themeToggleBtn.title = "Switch to light mode";
        }
    }
    localStorage.setItem("theme", theme);
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
}

// Initialize theme on page load
function initTheme() {
    themeToggleBtn = document.getElementById("theme-toggle");
    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        // Check system preference
        savedTheme = window.matchMedia("(prefers-color-scheme: light)")
            .matches
            ? "light"
            : "dark";
    }
    applyTheme(savedTheme);

    // Event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
        themeToggleBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
}

// --- Registration Form Logic ---
function initRegistrationForm() {
    const form = document.getElementById("register-form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const number = document.getElementById("number").value;
            localStorage.setItem("userName", name);
            localStorage.setItem("userNumber", number);
            window.location.href = "home.html";
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initRegistrationForm();

    // Dynamic Copyright Year
    document.getElementById("current-year").textContent =
        new Date().getFullYear();

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.style.setProperty(
            "--animation-duration",
            "0s"
        );
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('nav ul');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinksContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active') && !navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // (Add all your remaining 15+ functions here like scroll progress, typed.js, contact form, etc.)
});

// --- Hover Sound Logic (Re-implemented and simplified) ---

// Zaroori note: Aapka original code sound ko play karta tha har mouseenter par. Hum use dobara add kar rahe hain.
const hoverSoundSrc = "../SOUNDS/HOVER_EFFECT.wav";

document.addEventListener("DOMContentLoaded", () => {
    // We target all interactive elements including the new cards
    document.querySelectorAll(".project-card, .card-wrapper, a, button, .card-side").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            const sound = new Audio(hoverSoundSrc);
            sound.volume = 0.5; // optional: control volume
            sound.play().catch((err) => {
                // Catch browser autoplay errors silently in console
                console.log("Hover sound blocked:", err);
            });
        });
    });

    // Your existing theme initialization runs here
    initTheme();

    // Dynamic Copyright Year (moved here as this is DOMContentLoaded logic)
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // (Rest of your existing DOMContentLoaded code follows here)
});


// (Your existing functions like toggleTheme, applyTheme, initTheme, validateField, etc. must remain above this)
// (Your existing long JS code follows here)

// --- Active navigation link highlighting ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        const currentFile = (location.pathname || '').split('/').pop() || 'home.html';
        document.querySelectorAll('nav a').forEach((a) => {
            const href = a.getAttribute('href');
            if (!href) return;
            // If the href matches the current file, mark it active (handle empty path for home)
            if (href === currentFile || (href === 'home.html' && (currentFile === '' || currentFile === 'index.html' || currentFile === 'home.html'))) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }
        });
    } catch (err) {
        console.error('Error setting active nav link:', err);
    }
});

// --- Skill Bar Animation on Scroll ---
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    let animated = false;

    function animateSkills() {
        if (animated) return;

        const skillsSection = document.querySelector('.skills-section');
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            animated = true;
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    const skillFill = item.querySelector('.skill-fill');
                    const skillPercent = item.querySelector('.skill-percent');
                    const targetWidth = parseInt(skillPercent.textContent);

                    skillFill.style.width = '0%';
                    skillFill.style.transition = 'width 1.5s ease-out';

                    setTimeout(() => {
                        skillFill.style.width = targetWidth + '%';

                        // Trigger confetti if skill reaches 100%
                        if (targetWidth === 100) {
                            triggerConfetti(item);
                        }
                    }, 100);
                }, index * 200);
            });
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on load
});

// --- Confetti Effect ---
function triggerConfetti(skillItem) {
    // Simple confetti effect using DOM elements
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
@keyframes confetti-fall {
    0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(confettiStyle);

// --- 3D Tilt & Shine Effect for Project Cards ---
document.addEventListener('DOMContentLoaded', () => {
    const tiltCards = document.querySelectorAll('.card-wrapper');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation degrees
            const maxTilt = 12;
            
            // Calculate rotation (inverted Y for natural tilt)
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            
            // Calculate shine position (percentage)
            const shineX = (x / rect.width) * 100;
            const shineY = (y / rect.height) * 100;
            
            // Apply transform (remove transition for instant response)
            card.style.transition = 'none';
            // We use scale(1.05) to give it a "lift" effect, replacing the static hover lift
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Update CSS variables for shine
            card.style.setProperty('--shine-x', `${shineX}%`);
            card.style.setProperty('--shine-y', `${shineY}%`);
        });

        card.addEventListener('mouseleave', () => {
            // Restore transition and reset transform to default
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            card.style.transform = ''; 
        });
    });
});

// --- Project Like Button Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const likeBtns = document.querySelectorAll('.like-btn');

    likeBtns.forEach(btn => {
        const projectId = btn.dataset.projectId;
        const icon = btn.querySelector('i');
        
        // Load saved state
        if (localStorage.getItem(`like_${projectId}`) === 'true') {
            btn.classList.add('liked');
            icon.classList.remove('far');
            icon.classList.add('fas');
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop bubbling to card wrapper

            const isLiked = btn.classList.toggle('liked');
            
            if (isLiked) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                localStorage.setItem(`like_${projectId}`, 'true');
                
                // Animation
                icon.style.animation = 'heartPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                setTimeout(() => icon.style.animation = '', 400);
                
                // Trigger Confetti
                triggerConfetti();
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                localStorage.removeItem(`like_${projectId}`);
            }
        });
    });

    // --- Double Tap / Double Click to Like ---
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    
    cardWrappers.forEach(wrapper => {
        let lastTap = 0;
        
        // Double Click (Desktop)
        wrapper.addEventListener('dblclick', (e) => {
            e.preventDefault();
            handleDoubleTapLike(wrapper);
        });

        // Double Tap (Mobile)
        wrapper.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
                handleDoubleTapLike(wrapper);
            }
            lastTap = currentTime;
        });
    });

    function handleDoubleTapLike(wrapper) {
        const btn = wrapper.querySelector('.like-btn');
        if (!btn) return;

        if (!btn.classList.contains('liked')) {
            btn.click(); // Trigger the click listener to Like
        } else {
            // Already liked: Re-trigger animations
            const icon = btn.querySelector('i');
            icon.style.animation = 'none';
            icon.offsetHeight; // Trigger reflow
            icon.style.animation = 'heartPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => icon.style.animation = '', 400);
            triggerConfetti();
            
            // Instagram-style big heart pop
            const bigHeart = document.createElement('i');
            bigHeart.className = 'fas fa-heart big-heart-pop';
            wrapper.appendChild(bigHeart);
            setTimeout(() => bigHeart.remove(), 1000);
        }
    }
});

// --- Smooth Scrolling & Back to Top Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll for Anchor Links (e.g., Skip to Main, internal sections)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Matches fixed nav height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// --- Mini Typing Test Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById("typing-text");
    const inpField = document.getElementById("typing-input");
    const tryBtn = document.getElementById("typing-btn");
    const timeTag = document.getElementById("timer");
    const wpmTag = document.getElementById("wpm");
    const accuracyTag = document.getElementById("accuracy");

    // Only run if elements exist
    if (!typingText || !inpField || !tryBtn) return;

    let timer,
        maxTime = 60,
        timeLeft = maxTime,
        charIndex = 0,
        mistakes = 0,
        isTyping = false;

    const paragraphs = [
        "The quick brown fox jumps over the lazy dog. It is a pangram, which means it uses every letter of the alphabet.",
        "Web development is the work involved in developing a website for the Internet or an intranet.",
        "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript specification.",
        "Coding is not just about writing code, it is about solving problems and creating solutions that help people.",
        "React is a free and open-source front-end JavaScript library for building user interfaces based on components.",
        "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans.",
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language."
    ];

    function loadParagraph() {
        const ranIndex = Math.floor(Math.random() * paragraphs.length);
        typingText.innerHTML = "";
        paragraphs[ranIndex].split("").forEach(char => {
            let span = `<span>${char}</span>`;
            typingText.innerHTML += span;
        });
        
        const spans = typingText.querySelectorAll("span");
        if(spans.length > 0) spans[0].classList.add("active");
        
        // Focus input when clicking on the text box area
        const boxContainer = document.getElementById("typing-box-container");
        if(boxContainer) {
            boxContainer.addEventListener("click", () => inpField.focus());
        }
    }

    function initTyping() {
        let characters = typingText.querySelectorAll("span");
        let typedChar = inpField.value.split("")[charIndex];

        if (charIndex < characters.length && timeLeft > 0) {
            if (!isTyping) {
                timer = setInterval(initTimer, 1000);
                isTyping = true;
            }
            
            if (typedChar == null) { // Backspace
                if (charIndex > 0) {
                    charIndex--;
                    if (characters[charIndex].classList.contains("incorrect")) {
                        mistakes--;
                    }
                    characters[charIndex].classList.remove("correct", "incorrect");
                }
            } else {
                if (characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }
            
            characters.forEach(span => span.classList.remove("active"));
            if (charIndex < characters.length) {
                characters[charIndex].classList.add("active");
            } else {
                clearInterval(timer);
                inpField.disabled = true;
                tryBtn.innerText = "Completed! Restart?";
            }

            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            
            wpmTag.innerText = wpm;
            let accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100);
            accuracy = accuracy < 0 || !accuracy || accuracy === Infinity ? 100 : accuracy;
            accuracyTag.innerText = accuracy + "%";
        } else {
            clearInterval(timer);
            inpField.value = "";
        }
    }

    function initTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timeTag.innerText = timeLeft + "s";
            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpmTag.innerText = wpm;
        } else {
            clearInterval(timer);
            inpField.disabled = true;
            tryBtn.innerText = "Time's Up! Try Again";
        }
    }

    function resetGame() {
        loadParagraph();
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = mistakes = 0;
        isTyping = false;
        inpField.value = "";
        timeTag.innerText = timeLeft + "s";
        wpmTag.innerText = 0;
        accuracyTag.innerText = "100%";
        inpField.disabled = false;
        inpField.focus();
        tryBtn.innerText = "Restart";
    }

    tryBtn.addEventListener("click", resetGame);
    inpField.addEventListener("input", initTyping);
});

// --- Tech Stack Memory Game Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('memory-board');
    const movesDisplay = document.getElementById('memory-moves');
    const restartBtn = document.getElementById('memory-restart');
    
    if (!board) return;

    // Do not inject on the registration page (index.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) return;

    // Inject Floating Button if missing (Auto-setup for About Page)
    const gameSection = board.closest('section') || board.parentElement;
    if (gameSection) {
        if (!gameSection.id) gameSection.id = "game-section";
        
        if (!document.querySelector('.game-floater')) {
            const floater = document.createElement('a');
            floater.href = "#game-section";
            floater.className = "game-floater";
            floater.setAttribute('aria-label', 'Play Game');
            floater.innerHTML = `<div class="floater-icon"><i class="fas fa-gamepad"></i></div><span class="floater-text">Brain Storming?</span>`;
            document.body.appendChild(floater);
        }
    }

    const icons = [
        'fa-html5', 'fa-css3-alt', 'fa-js', 'fa-react', 
        'fa-node', 'fa-python', 'fa-git-alt', 'fa-npm'
    ];
    
    let cards = [...icons, ...icons]; // Duplicate for pairs
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matches = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        board.innerHTML = '';
        shuffle(cards).forEach(icon => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.icon = icon;
            
            const frontFace = document.createElement('div');
            frontFace.classList.add('memory-face', 'memory-front');
            frontFace.innerHTML = `<i class="fab ${icon}"></i>`;
            
            const backFace = document.createElement('div');
            backFace.classList.add('memory-face', 'memory-back');
            backFace.innerHTML = `<i class="fas fa-code"></i>`;
            
            card.appendChild(frontFace);
            card.appendChild(backFace);
            
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
        resetBoardState();
        moves = 0;
        matches = 0;
        if(movesDisplay) movesDisplay.innerText = moves;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        moves++;
        if(movesDisplay) movesDisplay.innerText = moves;
        
        let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

        if (isMatch) {
            disableCards();
            matches++;
            if (matches === icons.length) {
                setTimeout(() => {
                    if (typeof triggerConfetti === 'function') triggerConfetti();
                    restartBtn.innerText = "You Won! Play Again?";
                }, 500);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoardState();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoardState();
        }, 1000);
    }

    function resetBoardState() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    if(restartBtn) {
        restartBtn.addEventListener('click', () => {
            restartBtn.innerText = "Restart Game";
            createBoard();
        });
    }

    // Initialize
    createBoard();
});

// --- Global Game Button Injector (For Projects & Contact pages) ---
document.addEventListener('DOMContentLoaded', () => {
    // 0. Do not inject on the registration page (index.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) return;

    // 1. Check if button already exists (Hardcoded or injected by Memory Game logic)
    if (document.querySelector('.game-floater')) return;

    // 2. If not, inject a button pointing to the Home page game section
    const floater = document.createElement('a');
    floater.href = "about.html#game-section";
    floater.className = "game-floater";
    floater.setAttribute('aria-label', 'Play Game');
    floater.innerHTML = `<div class="floater-icon"><i class="fas fa-gamepad"></i></div><span class="floater-text">Brain Storming?</span>`;
    document.body.appendChild(floater);
});

// --- Tic-Tac-Toe Logic (Contact Page) ---
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('ttt-board');
    const statusDisplay = document.getElementById('ttt-status');
    const restartBtn = document.getElementById('ttt-restart');
    const winsDisplay = document.getElementById('ttt-wins');
    const lossesDisplay = document.getElementById('ttt-losses');
    const drawsDisplay = document.getElementById('ttt-draws');

    if (!board || !statusDisplay || !restartBtn) return;

    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let currentPlayer = "X"; // User is X
    let wins = 0, losses = 0, draws = 0;
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function initGame() {
        board.innerHTML = "";
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusDisplay.innerText = "Your Turn (X)";
        statusDisplay.style.color = "var(--text-color)";
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('ttt-cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== "X") return;

        handlePlayerMove(clickedCell, clickedCellIndex);
    }

    function handlePlayerMove(cell, index) {
        gameState[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add('taken', 'x');
        
        if (checkResult()) return;

        currentPlayer = "O";
        statusDisplay.innerText = "Bot is thinking...";
        
        setTimeout(botMove, 500 + Math.random() * 500);
    }

    function botMove() {
        if (!gameActive) return;
        let available = gameState.map((v, i) => v === "" ? i : null).filter(v => v !== null);
        let moveIndex;

        const findWinningMove = (player) => {
            for (let i of available) {
                let tempState = [...gameState];
                tempState[i] = player;
                if (checkWin(tempState, player)) return i;
            }
            return null;
        };

        moveIndex = findWinningMove("O"); // 1. Try to win
        if (moveIndex === null) moveIndex = findWinningMove("X"); // 2. Block player
        if (moveIndex === null && gameState[4] === "") moveIndex = 4; // 3. Pick center
        if (moveIndex === null) moveIndex = available[Math.floor(Math.random() * available.length)]; // 4. Random

        const cell = board.children[moveIndex];
        gameState[moveIndex] = "O";
        cell.innerText = "O";
        cell.classList.add('taken', 'o');

        if (checkResult()) return;
        currentPlayer = "X";
        statusDisplay.innerText = "Your Turn (X)";
    }

    function checkWin(state, player) {
        return winningConditions.some(c => c.every(i => state[i] === player));
    }

    function checkResult() {
        if (checkWin(gameState, currentPlayer)) {
            statusDisplay.innerText = currentPlayer === "X" ? "You Won! 🎉" : "Bot Won! 🤖";
            statusDisplay.style.color = currentPlayer === "X" ? "var(--success-color)" : "var(--error-color)";
            gameActive = false;
            if (currentPlayer === "X") {
                wins++;
                if (winsDisplay) winsDisplay.innerText = wins;
                if (typeof triggerConfetti === 'function') triggerConfetti();
            } else {
                losses++;
                if (lossesDisplay) lossesDisplay.innerText = losses;
            }
            return true;
        }
        if (!gameState.includes("")) {
            statusDisplay.innerText = "It's a Draw! 🤝";
            gameActive = false;
            draws++;
            if (drawsDisplay) drawsDisplay.innerText = draws;
            return true;
        }
        return false;
    }

    restartBtn.addEventListener('click', initGame);
    initGame();
});

// --- Konami Code Easter Egg ---
document.addEventListener('DOMContentLoaded', () => {
    const konamiCode = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a"
    ];
    let currentPosition = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const requiredKey = konamiCode[currentPosition];
        
        // Check for match (case-insensitive for letters)
        if (key === requiredKey || key.toLowerCase() === requiredKey.toLowerCase()) {
            currentPosition++;
            
            if (currentPosition === konamiCode.length) {
                activateEasterEgg();
                currentPosition = 0;
            }
        } else {
            currentPosition = 0;
        }
    });

    function activateEasterEgg() {
        // 1. Trigger Confetti multiple times for "fireworks"
        if (typeof triggerConfetti === 'function') {
            triggerConfetti();
            setTimeout(() => triggerConfetti(), 400);
            setTimeout(() => triggerConfetti(), 800);
        }

        // 2. Toggle Rainbow Mode
        document.body.classList.toggle('konami-mode');

        // 3. Show Notification
        const notification = document.createElement('div');
        notification.className = 'konami-notification';
        notification.innerHTML = '🎮 Konami Code Activated! God Mode ON 🚀';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
});

// --- Real-time Weather Widget ---
document.addEventListener('DOMContentLoaded', () => {
    const footerContent = document.querySelector('.footer-content');
    // Fallback for pages without .footer-content structure
    const targetContainer = footerContent || document.querySelector('footer');
    
    if (!targetContainer) return;

    const weatherWidget = document.createElement('div');
    weatherWidget.className = 'weather-widget';
    weatherWidget.innerHTML = `
        <span class="weather-icon">🌍</span>
        <span class="weather-text">Locating...</span>
    `;

    // Insert logic: Try to place it nicely
    const socialIcons = targetContainer.querySelector('.social-icons');
    if (socialIcons) {
        targetContainer.insertBefore(weatherWidget, socialIcons);
    } else {
        targetContainer.appendChild(weatherWidget);
    }

    async function fetchWeather(lat, lon, locationName = null) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            if (!response.ok) throw new Error('Weather API Error');
            const data = await response.json();
            
            const { temperature, weathercode } = data.current_weather;
            
            // Simple WMO Code Mapping
            const getIcon = (code) => {
                if (code === 0) return '☀️';
                if (code <= 3) return '🌤️';
                if (code <= 48) return '🌫️';
                if (code <= 67) return '🌧️';
                if (code <= 77) return '❄️';
                if (code <= 82) return '🌦️';
                if (code <= 99) return '⛈️';
                return '🌡️';
            };

            const icon = getIcon(weathercode);
            const displayText = locationName 
                ? `Coding from ${locationName} ${temperature}°C` 
                : `${temperature}°C`;

            weatherWidget.innerHTML = `<span class="weather-icon">${icon}</span> <span class="weather-text">${displayText}</span>`;
        } catch (error) {
            console.error(error);
            weatherWidget.innerHTML = `<span class="weather-icon">⚠️</span> <span class="weather-text">Weather Unavailable</span>`;
        }
    }

    // Geolocation Logic
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // Default to Mumbai if denied/error
                fetchWeather(19.0760, 72.8777, "Mumbai");
            }
        );
    } else {
        // Default to Mumbai if not supported
        fetchWeather(19.0760, 72.8777, "Mumbai");
    }
});
// --- Whack-a-Bug Game Logic ---
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const holes = document.querySelectorAll('.hole');
    if (holes.length === 0) return;
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    const scoreBoard = document.querySelector('.score');
    if (scoreBoard) scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    const scoreBoard = document.querySelector('.score');
    if (scoreBoard) scoreBoard.textContent = score;
    
    // Hit marker effect
    const marker = document.createElement('div');
    marker.className = 'hit-marker';
    marker.textContent = '+1';
    marker.style.left = `${e.pageX}px`;
    marker.style.top = `${e.pageY}px`;
    document.body.appendChild(marker);
    setTimeout(() => marker.remove(), 500);
}

document.addEventListener('DOMContentLoaded', () => {
    const bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => bug.addEventListener('click', bonk));
    
    const startBtn = document.querySelector('.start-game-btn');
    if (startBtn) startBtn.addEventListener('click', startGame);
});
