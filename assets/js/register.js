const passwordInput = document.getElementById("register-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeIconfash = document.getElementById("eyeIconfash");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

eyeIcon.addEventListener("click", function() {
  togglePasswordVisibility(passwordInput, eyeIcon);
});

eyeIconfash.addEventListener("click", function() {
  togglePasswordVisibility(confirmPasswordInput, eyeIconfash);
});

function togglePasswordVisibility(inputField, iconElement) {
  if (inputField.type === "password") {
    inputField.type = "text";
    iconElement.classList.remove("fa-eye");
    iconElement.classList.add("fa-eye-slash");
  } else {
    inputField.type = "password";
    iconElement.classList.remove("fa-eye-slash");
    iconElement.classList.add("fa-eye");
  }
}

function validatePassword() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = "As senhas não coincidem.";

  } else {
    confirmPasswordError.textContent = "";
  }
}

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);
