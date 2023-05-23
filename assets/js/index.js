// firebase.auth().onAuthStateChanged(user =>{
//   if(user){
//     window.location.href = "jogo.html"
//   }
// })

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

loginButton.addEventListener("click", function () {
  login();
});

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
    .then((response) => {
      redirectToGamePage();
    })
    .catch((error) => {
      alert(getErrorMessage(error));
      loadingHide(); // Remove o ícone de carregamento
    });
}
function recoverPassword() {
  const emailInput = document.getElementById("user");

  const email = emailInput.value;

  loading(); // Exibe o ícone de carregamento

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Um email de recuperação foi enviado para o seu endereço.");
      loadingHide(); // Remove o ícone de carregamento
    })
    .catch((error) => {
      alert("Ocorreu um erro ao enviar o email de recuperação.");
      console.error(error);
      loadingHide(); // Remove o ícone de carregamento
    });
}

function getErrorMessage(error) {
  if (error.code == "auth/wrong-password") {
    errorSenha.textContent = "Senha incorreta";
  }
  if(error.code == "auth/user-not-found"){
    errorEmail.textContent = "Parece que você nâo tem uma conta"
  }
  if (error.code == "auth/too-many-requests") {
    return "Hmm, parece que estamos cheios agora.";
  }
  return error.message;
}

function redirectToGamePage() {
  loading(); // Exibe o ícone de carregamento

  setTimeout(function () {
    window.location.href = "jogo.html";
    loadingHide()
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





