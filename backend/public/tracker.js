function getSessionId() {
  let session = localStorage.getItem("session_id");
  if (!session) {
    session = "sess_" + Math.random().toString(36).substring(2);
    localStorage.setItem("session_id", session);
  }
  return session;
}

function sendEvent(type, extra = {}) {
  const API_URL = document.currentScript?.src.replace("/tracker.js", "") || "";
  fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: getSessionId(),
      event_type: type,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      ...extra,
    }),
  });
}

window.onload = () => {
  sendEvent("page_view");
};

let lastClickTime = 0;
document.addEventListener("click", (e) => {
  const now = Date.now();
  if (now - lastClickTime < 500) return;
  lastClickTime = now;
  sendEvent("click", {
    x: e.clientX,
    y: e.clientY,
  });
});
