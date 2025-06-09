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
});