const passwordInput = document.getElementById("register-password");
const emailInput = document.getElementById("user-email");
const confirmPasswordInput = document.getElementById("confirm-password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeIconfash = document.getElementById("eyeIconfash");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const error1 = document.getElementById("error1");
const loginButton = document.querySelector(".btn-login");
const form = document.querySelector('form').addEventListener('submit',(e)=> {
  e.preventDefault(); // Impede o envio padrão do formulário (refresh da página)
});

function register(){
  const emailR = emailInput.value;
  const passwordR = passwordInput.value;
  loading();

  if (passwordR.length < 6) {
    // Senha é menor que 6 caracteres
    passwordError.textContent = "A senha deve ter pelo menos 6 caracteres.";
    confirmPasswordError.textContent = "A senha deve ter pelo menos 6 caracteres.";
    loadingHide();
    return; // Impede o registro se a senha for inválida
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailR, passwordR)
    .then(() => {
      error1.textContent = "Email cadastrado com sucesso";
      window.location.href = "jogo.html";
      loading();
    })
    .catch(error => {
      getError(error);
      loadingHide();
    });
}

function getError(error){
  if(error.code == "auth/email-already-in-use"){
    error1.textContent = "Este e-mail já está em uso";
  }
  if(error.code == "auth/invalid-email"){
    error1.textContent = "insira um e-mail válido"
  }
  return error.message;
}

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
    passwordError.textContent = "As senhas não coincidem.";
  } else {
    confirmPasswordError.textContent = "";
    passwordError.textContent = "";
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

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);