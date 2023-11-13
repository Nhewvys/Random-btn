document.getElementById('logout-button').addEventListener('click', function() {
    createLoading()
    setTimeout(() => {
        
        firebase.auth().signOut().then(function() {
            
            window.location.href = 'index.html'; // Redirecione para a página de login ou para onde desejar
        }).catch(function(error) {
            // Ocorreu um erro durante o logout
            console.error(error);
        });
    }, 1000);
});
