(() => {
  const form = document.querySelector("#auth-form");
  const mode = document.body.dataset.authMode;
  const submitButton = form.querySelector(".auth-submit");
  const message = document.querySelector("#auth-message");
  const fields = {
    name: document.querySelector("#auth-name"),
    email: document.querySelector("#auth-email"),
    password: document.querySelector("#auth-password")
  };
  const errors = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    password: document.querySelector("#password-error")
  };

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = fields.password;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.setAttribute("aria-label", show ? "Hide password" : "Show password");
      button.setAttribute("aria-pressed", String(show));
      input.focus();
    });
  });

  function setError(fieldName, text) {
    const input = fields[fieldName];
    errors[fieldName].textContent = text;
    input?.setAttribute("aria-invalid", String(Boolean(text)));
    input?.closest(".input-shell")?.classList.toggle("has-error", Boolean(text));
  }

  function validateField(name) {
    if (name === "name") {
      const value = fields.name.value.trim();
      return !value ? "Choose a name for your explorer profile." : value.length > 24 ? "Keep your explorer name under 25 characters." : "";
    }
    if (name === "email") {
      const value = fields.email.value.trim();
      return !value ? "Enter your email address." : !fields.email.validity.valid ? "Enter a valid email address, like name@example.com." : "";
    }
    const password = fields.password.value;
    return !password ? "Enter your password." : password.length < 8 ? "Your password must be at least 8 characters." : password.length > 128 ? "Password must be 128 characters or fewer." : "";
  }

  function validate() {
    const names = mode === "register" ? ["name", "email", "password"] : ["email", "password"];
    const invalid = names.filter((name) => {
      const error = validateField(name);
      setError(name, error);
      return Boolean(error);
    });
    return invalid.length === 0;
  }

  function showMessage(text, kind = "error") {
    message.hidden = false;
    message.dataset.kind = kind;
    message.textContent = text;
  }

  function clearMessage() {
    message.hidden = true;
    message.textContent = "";
    delete message.dataset.kind;
  }

  Object.entries(fields).forEach(([name, input]) => {
    if (!input) return;
    input.addEventListener("input", () => {
      setError(name, "");
      clearMessage();
    });
    input.addEventListener("blur", () => {
      if (input.value.trim() || input.getAttribute("aria-invalid") === "true") setError(name, validateField(name));
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();
    if (!validate()) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    form.classList.add("is-loading");
    submitButton.disabled = true;
    const payload = { email: fields.email.value.trim().toLowerCase(), password: fields.password.value };
    if (mode === "register") payload.name = fields.name.value.trim();
    try {
      const result = await window.CosmicAccount.request(`/users/${mode}`, { method: "POST", body: JSON.stringify(payload) });
      localStorage.setItem("cosmic-campsite-session", JSON.stringify(result));
      showMessage(mode === "login" ? "Access confirmed. Opening your flight log…" : "Explorer account ready. Preparing your flight log…", "success");
      window.setTimeout(() => { window.location.assign("progress.html"); }, 550);
    } catch (error) {
      if (error instanceof TypeError) {
        showMessage("Mission control is offline. Start the backend and try again.");
      } else {
        showMessage(error.message || "We could not complete sign in. Check your details and try again.");
      }
      submitButton.disabled = false;
      form.classList.remove("is-loading");
    }
  });
})();
