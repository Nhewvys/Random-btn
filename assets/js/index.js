const passwordInput = document.getElementById("senha");
const eyeIcon = document.getElementById("eyeIcon");
const loginButton = document.querySelector(".btn-login");

eyeIcon.addEventListener("click", function() {
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

loginButton.addEventListener("click", function() {
  login();
});

passwordInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    login();
  }
});

function login() {
  const usernameInput = document.getElementById("user");
  const passwordInput = document.getElementById("senha");

  const username = usernameInput.value;
  const password = passwordInput.value;
  firebase.auth().signInWithEmailAndPassword(username, password).then(response =>{
    redirectToGamePage()

}).catch(error =>{
    alert(error.code)

});
}
function recoverPassword() {
  const usernameInput = document.getElementById("user");
  const username = usernameInput.value;

  firebase.auth().sendPasswordResetEmail(username)
    .then(() => {
      
      alert("Um email de recuperação foi enviado para o seu endereço.");
    })
    .catch(error => {
      alert("Ocorreu um erro ao enviar o email de recuperação.");
      console.error(error);
    });
}

function redirectToGamePage() {
  // Exibir ícone de carregamento
  const loadingIcon = document.createElement('i');
  loadingIcon.className = 'fa-solid fa-spinner fa-spin';
  loginButton.innerHTML = 'Carregando...';
  loginButton.disabled = true;
  loginButton.prepend(loadingIcon);
  
  // Redirecionar após 3 segundos
  setTimeout(function() {
    window.location.href = "jogo.html";

    loadingIcon.remove();
    loginButton.disabled = false;
    loginButton.innerHTML = 'Logar';
  }, 1000);

}


