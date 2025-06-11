// Handles the interactions of the main page
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById("logoutBtn");


    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            
            fetch('/logout', { method: 'POST' })
                .then(() => {
                    window.location.href = '/';
                })
                .catch(console.error);
        });
    }


        // Live character counter
        const descriptionTextarea = document.getElementById("description");
        const counter = document.getElementById("descriptionCounter");

        if (descriptionTextarea && counter) {
            descriptionTextarea.addEventListener("input", () => {
                const currentLength = descriptionTextarea.value.length;
                counter.textContent = `${currentLength} / 255`;
            });
        }
    });