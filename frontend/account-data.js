(() => {
  const SESSION_KEY = "cosmic-campsite-session";
  const API_BASE = window.COSMIC_API_URL || "http://localhost:5000/api";

  function session() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
    catch { return null; }
  }

  async function request(path, options = {}) {
    const current = session();
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (current?.token) headers.Authorization = `Bearer ${current.token}`;
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    let result = {};
    try { result = await response.json(); } catch { /* Keep an empty response for non-JSON errors. */ }
    if (response.status === 401 && current?.token) {
      localStorage.removeItem(SESSION_KEY);
      window.dispatchEvent(new CustomEvent("cosmic-auth-expired"));
    }
    if (!response.ok) {
      const error = new Error(result.message || "The request could not be completed.");
      error.status = response.status;
      throw error;
    }
    return result;
  }

  function storageKey(baseKey) {
    const current = session();
    return current?.user?.id ? `${baseKey}:${current.user.id}` : baseKey;
  }

  async function hydrateProgress() {
    if (!session()?.token) return null;
    const data = await request("/progress");
    localStorage.setItem(storageKey("cosmic-campsite-quiz-attempts"), JSON.stringify(data.quizAttempts || []));
    localStorage.setItem(storageKey("cosmic-campsite-mission-history"), JSON.stringify(data.missionHistory || []));
    localStorage.setItem(storageKey("cosmic-campsite-explorer-profile"), JSON.stringify(data.profile || {}));
    return data;
  }

  async function saveQuizAttempt(attempt) {
    if (!session()?.token) return null;
    return request("/progress/quizzes", { method: "POST", body: JSON.stringify(attempt) });
  }

  async function saveMissionActivity(activity) {
    if (!session()?.token) return null;
    return request("/progress/missions", { method: "POST", body: JSON.stringify(activity) });
  }

  async function updateProfile(profile) {
    if (!session()?.token) return { user: null };
    return request("/users/profile", { method: "PATCH", body: JSON.stringify(profile) });
  }

  window.CosmicAccount = {
    apiBase: API_BASE,
    session,
    request,
    storageKey,
    hydrateProgress,
    saveQuizAttempt,
    saveMissionActivity,
    updateProfile,
    isSignedIn: () => Boolean(session()?.token)
  };

  const current = session();
  const loginLink = document.querySelector(".nav-account .nav-login");
  const joinLink = document.querySelector(".nav-account .button-outline");
  const accountNav = document.querySelector(".nav-account");
  if (current?.token && loginLink && accountNav) {
    loginLink.href = "progress.html";
    loginLink.textContent = "My flight log";
    if (joinLink) joinLink.remove();
    const signOut = document.createElement("button");
    signOut.className = "nav-login sign-out-button";
    signOut.type = "button";
    signOut.textContent = "Sign out";
    signOut.addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      window.location.assign("index.html");
    });
    accountNav.append(signOut);
  }
})();
