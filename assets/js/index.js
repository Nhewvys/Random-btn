const passwordInput = document.getElementById("senha");
const eyeIcon = document.getElementById("eyeIcon");
const loginButton = document.querySelector(".btn-login");
const errorEmail = document.getElementById("error-email");
const errorSenha = document.getElementById("error-senha");
const form = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário (refresh da página)
});

eyeIcon.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
});

loginButton.addEventListener("click", login);

passwordInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    login();
  }
});

function login() {
  const usernameInput = document.getElementById("user");
  const passwordInput = document.getElementById("senha");

  const username = usernameInput.value;
  const password = passwordInput.value;

  loading(); // Exibe o ícone de carregamento

  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(() => {
      redirectToGamePage();
    })
    .catch((error) => {
      getErrorMessage(error);
      loadingHide(); // Remove o ícone de carregamento
    })

}

function recoverPassword() {
  const emailInput = document.getElementById("user");
  const email = emailInput.value;

  loading(); // Exibe o ícone de carregamento

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Um email de recuperação foi enviado para o seu endereço.");
    })
    .catch((error) => {
      alert("Ocorreu um erro ao enviar o email de recuperação.");
      console.error(error);
    })
    .finally(() => {
      loadingHide(); // Remove o ícone de carregamento
    });
}

function getErrorMessage(error) {
  errorEmail.textContent = "";
  errorSenha.textContent = "";

  switch (error.code) {
    case "auth/wrong-password":
      errorSenha.textContent = "Senha incorreta";
      break;
    case "auth/user-not-found":
      errorEmail.textContent = "Parece que você não tem uma conta";
      break;
    case "auth/invalid-email":
      errorEmail.textContent = "Insira um email válido";
      break;
    case "auth/too-many-requests":
      alert("Hmm, parece que estamos cheios agora.");
      break;
    default:
      console.error(error);
      alert("Ocorreu um erro ao fazer login.");
  }
}

function redirectToGamePage() {
  loading(); // Exibe o ícone de carregamento

  setTimeout(function () {
    window.location.href = "jogo.html";
  }, 1000);
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
