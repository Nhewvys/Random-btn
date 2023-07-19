const passwordInput = document.getElementById("register-password");
const emailInput = document.getElementById("user-email");
const confirmPasswordInput = document.getElementById("confirm-password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeIconfash = document.getElementById("eyeIconfash");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const error1 = document.getElementById("error1");
const loginButton = document.querySelector(".btn-login");
const form = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário (refresh da página)
  register();
});

function validatePassword() {
  const passwordR = passwordInput.value;
  const confirmPasswordR = confirmPasswordInput.value;

  confirmPasswordError.textContent = "";
  passwordError.textContent = "";

  if (passwordR.length < 6) {
    // Senha é menor que 6 caracteres
    passwordError.textContent = "A senha deve ter pelo menos 6 caracteres.";
    return false; // Impede o registro se a senha for inválida
  }

  if (passwordR !== confirmPasswordR) {
    confirmPasswordError.textContent = "As senhas não coincidem.";
    return false; // Impede o registro se as senhas não coincidirem
  }

  return true; // Senhas válidas
}

function register() {
  const emailR = emailInput.value;
  const passwordR = passwordInput.value;
  loading();

  if (!validatePassword()) {
    loadingHide();
    return; // Impede o registro se a validação das senhas falhar
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailR, passwordR)
    .then(() => {
      error1.textContent = "Email cadastrado com sucesso";
      window.location.href = "jogo.html";
      loadingHide();
    })
    .catch((error) => {
      getError(error);
      loadingHide();
    });
}

function getError(error) {
  if (error.code == "auth/email-already-in-use") {
    error1.textContent = "Este e-mail já está em uso";
  }
  if (error.code == "auth/invalid-email") {
    error1.textContent = "insira um e-mail válido";
  }
  // Se houver outros códigos de erro que você queira tratar, adicione aqui
}

eyeIcon.addEventListener("click", function () {
  togglePasswordVisibility(passwordInput, eyeIcon);
});

eyeIconfash.addEventListener("click", function () {
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

function loading() {
  const loadingIcon = document.createElement("i");
  loadingIcon.className = "fa-solid fa-spinner fa-spin";
  loginButton.innerHTML = "Carregando...";
  loginButton.disabled = true;
  loginButton.prepend(loadingIcon);
}

function loadingHide() {
  loginButton.innerHTML = "Logar";
  loginButton.disabled = false;
}

passwordInput.addEventListener("onchange", validatePassword);
confirmPasswordInput.addEventListener("onchange", validatePassword);
