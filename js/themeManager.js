export function applyTheme(theme) {
    const themeToggleBtn = document.getElementById("theme-toggle");
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

export function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
}

export function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        savedTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    applyTheme(savedTheme);

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