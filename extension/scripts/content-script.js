//Execution

fetch(chrome.runtime.getURL('/templates/info-popup.template.html'))
    .then(r => r.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });

initPopup();

//Declarations

function initPopup() {
    applyPopupStyles();
    fetchPopupData();
}

function applyPopupStyles() {
    var infoPopup = document.querySelector('#info-popup');
    infoPopup.style.position = 'absolute';
    infoPopup.style.top = '50%';
    infoPopup.style.left = '50%';
    infoPopup.style.backgroundColor = 'orange';
}

function fetchPopupData() {

}