//Execution

fetch(chrome.runtime.getURL('/templates/info-popup.template.html'))
    .then(r => r.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        initPopup();
    });

//Declarations

function initPopup() {
    fetchPopupData();
}

function fetchPopupData() {

}