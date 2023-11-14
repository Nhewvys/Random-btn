const body = document.querySelector('body');

function createLoading() {
    // Ocultar elementos existentes
    const div = document.createElement('div');
    const wrapLoader = document.createElement('div');
    wrapLoader.classList.add('wrapLoader');
    div.classList.add('loader');
    div.style.position = 'absolute';
    body.appendChild(wrapLoader);
    wrapLoader.appendChild(div)
}
function removeLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();

    }
}
createLoading()