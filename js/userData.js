export function saveUserData(name, number) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userNumber", number);
}

export function getUserName() {
    return localStorage.getItem("userName");
}

export function initRegistrationForm() {
    const form = document.getElementById("register-form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const number = document.getElementById("number").value;
            saveUserData(name, number);
            window.location.href = "index.html";
        });
    }
}