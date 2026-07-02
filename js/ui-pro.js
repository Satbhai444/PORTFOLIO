document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Registration Wall Skip (if on index.html) ---
    const regForm = document.getElementById('register-form');
    if (regForm) {
        const skipBtn = document.createElement('button');
        skipBtn.type = 'button';
        skipBtn.innerText = 'Skip to Portfolio';
        skipBtn.className = 'skip-reg-btn'; // We'll add some CSS for this too
        skipBtn.style.marginTop = '10px';
        skipBtn.style.background = 'transparent';
        skipBtn.style.border = 'none';
        skipBtn.style.color = 'rgba(255,255,255,0.6)';
        skipBtn.style.cursor = 'pointer';
        skipBtn.style.fontSize = '0.9rem';
        skipBtn.style.textDecoration = 'underline';

        skipBtn.addEventListener('click', () => {
            window.location.href = 'home.html';
        });

        regForm.appendChild(skipBtn);
    }

    // --- 2. Custom Context Menu ---
    // Inject Menu HTML
    const menuHTML = `
        <div id="custom-context-menu">
            <div class="context-menu-item" data-action="home"><i class="fas fa-home"></i> Home</div>
            <div class="context-menu-item" data-action="projects"><i class="fas fa-code"></i> Projects</div>
            <div class="context-menu-item" data-action="about"><i class="fas fa-user"></i> About Me</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="flashlight"><i class="fas fa-lightbulb"></i> Toggle Spotlight</div>
            <div class="context-menu-item" data-action="theme"><i class="fas fa-adjust"></i> Toggle Theme</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="copy"><i class="fas fa-copy"></i> Copy Link</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    const menu = document.getElementById('custom-context-menu');

    function showMenu(x, y) {
        // Prevent menu from going off-screen
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const menuWidth = 220;
        const menuHeight = 280;

        let posX = x;
        let posY = y;

        if (x + menuWidth > windowWidth) posX = x - menuWidth;
        if (y + menuHeight > windowHeight) posY = y - menuHeight;

        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
        menu.classList.add('visible');
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showMenu(e.clientX, e.clientY);
    });

    // --- Mobile Long Press ---
    let touchTimer;
    document.addEventListener('touchstart', (e) => {
        // Only trigger if not clicking on an interactive element like a link or button
        if (e.target.closest('a, button, input, textarea')) return;

        touchTimer = setTimeout(() => {
            const touch = e.touches[0];
            showMenu(touch.clientX, touch.clientY);
        }, 600); // 600ms for long press
    });

    document.addEventListener('touchend', () => {
        clearTimeout(touchTimer);
    });

    document.addEventListener('click', () => {
        menu.classList.remove('visible');
    });


    // Menu Actions
    menu.addEventListener('click', (e) => {
        const item = e.target.closest('.context-menu-item');
        if (!item) return;

        const action = item.dataset.action;
        switch (action) {
            case 'home': window.location.href = 'home.html'; break;
            case 'projects': window.location.href = 'projects.html'; break;
            case 'about': window.location.href = 'about.html'; break;
            case 'flashlight': toggleSpotlight(); break;
            case 'theme':
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
                break;
            case 'copy':
                navigator.clipboard.writeText(window.location.href);
                alert('Copied URL to clipboard! 🎉');
                break;
        }
    });

    // --- 3. Spotlight Effect ---
    // Inject Spotlight HTML
    const spotlightHTML = `<div id="spotlight-overlay"></div>`;
    document.body.insertAdjacentHTML('beforeend', spotlightHTML);

    const spotlight = document.getElementById('spotlight-overlay');
    let spotlightActive = false;

    function toggleSpotlight() {
        spotlightActive = !spotlightActive;
        if (spotlightActive) {
            spotlight.classList.add('active');
        } else {
            spotlight.classList.remove('active');
        }

        // Update flashlight buttons if they exist
        document.querySelectorAll('.flashlight-toggle').forEach(btn => {
            btn.classList.toggle('active', spotlightActive);
        });
    }

    document.addEventListener('mousemove', (e) => {
        if (!spotlightActive) return;
        document.documentElement.style.setProperty('--x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    });

    // Add Spotlight Toggle to Nav (Dynamic Injection)
    const navRight = document.querySelector('nav .right') || document.querySelector('nav');
    if (navRight) {
        const sToggle = document.createElement('button');
        sToggle.className = 'flashlight-toggle';
        sToggle.innerHTML = '<i class="fas fa-lightbulb"></i>';
        sToggle.title = 'Toggle Spotlight Mode';
        sToggle.style.marginLeft = '15px';
        sToggle.addEventListener('click', toggleSpotlight);

        // Find theme toggle to place it nearby
        const themeT = document.getElementById('theme-toggle');
        if (themeT) {
            themeT.parentNode.insertBefore(sToggle, themeT);
        } else {
            navRight.appendChild(sToggle);
        }
    }
});
