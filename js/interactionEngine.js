export function initFlipCards() {
    const flipCardsWrapper = document.querySelectorAll(".card-wrapper");
    const longPressTime = 300;
    let pressTimer = null;
    let isLongPress = false;

    function flipCard(cardWrapper) {
        cardWrapper.classList.toggle('is-flipped');
    }

    flipCardsWrapper.forEach(cardWrapper => {
        const flipCardElement = cardWrapper.querySelector('.flip-card');
        const projectLink = cardWrapper.querySelector('.project-link');

        cardWrapper.addEventListener('touchstart', (e) => {
            if (flipCardElement.classList.contains('is-flipped')) return;
            pressTimer = setTimeout(() => {
                isLongPress = true;
                flipCard(cardWrapper);
                e.preventDefault();
            }, longPressTime);
        }, { passive: false });

        cardWrapper.addEventListener('touchend', (e) => {
            clearTimeout(pressTimer);
            if (isLongPress) {
                e.preventDefault();
                isLongPress = false;
            } else if (flipCardElement.classList.contains('is-flipped')) {
                e.preventDefault();
                flipCard(cardWrapper);
            }
        }, { passive: false });

        projectLink.addEventListener('click', (e) => {
            if (isLongPress) {
                e.preventDefault();
                isLongPress = false;
            }
            if (flipCardElement.classList.contains('is-flipped')) {
                if (!e.target.closest('.view-link') && !e.target.closest('.like-btn')) {
                    e.preventDefault();
                    flipCard(cardWrapper);
                }
            }
        });
    });
}

export function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.card-wrapper');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const maxTilt = 12;
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

export function initSoundEffects() {
    const hoverSoundSrc = "../SOUNDS/HOVER_EFFECT.wav";
    document.querySelectorAll(".project-card, .card-wrapper, a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            const sound = new Audio(hoverSoundSrc);
            sound.volume = 0.3;
            sound.play().catch(() => {});
        });
    });
}

export function triggerConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        c.style.cssText = `position:absolute;width:10px;height:10px;background:${colors[Math.floor(Math.random()*colors.length)]};left:${Math.random()*100}%;animation:confetti-fall ${Math.random()*3+2}s linear forwards;`;
        container.appendChild(c);
    }
    setTimeout(() => container.remove(), 5000);
}

export function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

export function initGameFloater() {
    if (document.querySelector('.game-floater')) return;

    const floater = document.createElement('a');
    floater.href = "about.html#game-section";
    floater.className = "game-floater";
    floater.innerHTML = `<div class="floater-icon"><i class="fas fa-gamepad"></i></div><span class="floater-text">Brain Storming?</span>`;
    document.body.appendChild(floater);
}

export function initWeather() {
    const widget = document.querySelector('.weather-widget');
    if (!widget) return;

    async function fetchWeather(lat, lon) {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await res.json();
            widget.innerHTML = `<span>🌡️</span> <span>${data.current_weather.temperature}°C</span>`;
        } catch (e) {
            widget.innerHTML = `<span>⚠️</span> <span>Weather Unavailable</span>`;
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(p => fetchWeather(p.coords.latitude, p.coords.longitude), () => fetchWeather(19.076, 72.877));
    }
}

export function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
}