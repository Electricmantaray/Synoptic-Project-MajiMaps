// Handles the interactions of the main page
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById("logoutBtn");

    // Handles the lougout button and rerouting on the admin screen
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {

            fetch('/logout', { method: 'get' })
                .then(() => {
                    window.location.href = '/';
                })
                .catch(console.error);
        });
    }


    // Live character counter - counts down from 255
    const descriptionTextarea = document.getElementById("description");
    const counter = document.getElementById("descriptionCounter");

    if (descriptionTextarea && counter) {
        descriptionTextarea.addEventListener("input", () => {
            // responds dynamically to users typing
            const currentLength = descriptionTextarea.value.length;
            counter.textContent = `${currentLength} / 255`;
        });
    }
});