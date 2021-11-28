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
        function: injectTemplates
    });

    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['templates/info-popup.styles.css']
    });
});

function injectTemplates() {
    fetch(chrome.runtime.getURL('/templates/info-popup.template.html'))
        .then(r => r.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            const scriptId = 'info-popup-script';
            const scriptAlreadyExists = document.getElementById(scriptId);

            if (!scriptAlreadyExists) {
                let script = document.createElement('script');
                script.id = scriptId;
                script.src = chrome.runtime.getURL('/templates/info-popup.js');
                (document.head || document.documentElement).appendChild(script);
            }
        });
}