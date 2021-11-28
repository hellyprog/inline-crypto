chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'inline-crypto-cm',
        contexts: ['selection'],
        title: 'Search info about "%s" coin'
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectInfoPopupComponent
    });

    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['info-popup-component/info-popup.styles.css']
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/content-script.js']
    });
});

function injectInfoPopupComponent() {
    fetch(chrome.runtime.getURL('/info-popup-component/info-popup.template.html'))
        .then(r => r.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            const scriptId = 'info-popup-script';
            const scriptAlreadyExists = document.getElementById(scriptId);

            if (!scriptAlreadyExists) {
                let script = document.createElement('script');
                script.id = scriptId;
                script.src = chrome.runtime.getURL('/info-popup-component/info-popup.js');
                (document.head || document.documentElement).appendChild(script);
            }
        });
}