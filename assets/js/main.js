function change(t) {
    var no = t;
    no.style.position = "absolute"
    no.style.bottom = randomNumber(10, 90)
    no.style.left = randomNumber(10, 90)
    console.log("oi")
}

function randomNumber(min, max) {
    return (Math.random() * (max - min) + min) + "%";

}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
        var noButton = document.getElementById('no');
        if (!noButton.hasAttribute('tabindex')) {
            event.preventDefault(); // Evita o comportamento padrão do navegador para a tecla Tab
            alert("Achou que ia conseguir trapacear, né? Rs");
        }
    }
});
// document.addEventListener('keydown', function (event) {
//     if (event.key === 'F12') {
//         event.preventDefault(); // Evita o comportamento padrão da tecla F12
//         alert("O uso das ferramentas de desenvolvedor não é permitido!");
//     }
// });
// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault(); // Evita o comportamento padrão do menu de contexto
// });