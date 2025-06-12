document.addEventListener("DOMContentLoaded", () => {
  const actions = {
    exportCSVButton: (route) => {
      // Trigger file download by navigating to the route
      window.location.href = route;
    },
    sendCSVButton: async (route, btn) => {
      await sendRequest(route, btn, "CSV emailed to joburggenericwater@gmail.com.");
    },
    emailSubscribersButton: async (route, btn) => {
      await sendRequest(route, btn, "Newsletter sent to all subscribers.");
    }
  };

  Object.keys(actions).forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const route = btn.dataset.route;
      if (!route) return alert("Route missing for this action.");

      // Disable button and show loading
      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = "Processing...";

      try {
        await actions[id](route, btn);
      } catch (err) {
        alert(`Error: ${err.message}`);
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  });

  async function sendRequest(route, btn, successMessage) {
    const res = await fetch(route);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    alert(successMessage);
  }
});
