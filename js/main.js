document.addEventListener("DOMContentLoaded", function() {
    const name = localStorage.getItem("userName");
    const number = localStorage.getItem("userNumber");

    if (!name || !number) {
        if (window.location.pathname.includes("register.html") === false) {
            window.location.href = "register.html";
        }
    }
});