const passwordInput = document.getElementById("register-password");
const emailInput = document.getElementById("user-email");
const confirmPasswordInput = document.getElementById("confirm-password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeIconfash = document.getElementById("eyeIconfash");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const form = document.querySelector('form').addEventListener('submit',(e)=> {
  e.preventDefault(); // Impede o envio padrão do formulário (refresh da página)
});

function register(){
  const emailR = emailInput.value;
  const passwordR = passwordInput.value
  firebase.auth().createUserWithEmailAndPassword(emailR, passwordR).then(() =>{
    alert("Email cadastrado com sucesso")
    window.location.href = "jogo.html";
  }).catch(error =>{
    alert(getError(error))
  })
}

function getError(error){
  if(error.code == "auth/email-already-in-use"){
    return "Este e-mail já esta em uso"
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
    passwordError.textContent = "As senhas não coincidem."

  } else {
    confirmPasswordError.textContent = "";
    passwordError.textContent = ""
  }
}

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);
