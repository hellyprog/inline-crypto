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
        files: ['scripts/content-script.js']
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectInfoPopupComponent
    });

    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['info-popup-component/info-popup.styles.css']
    });
});

function injectInfoPopupComponent() {
    fetch(chrome.runtime.getURL('/info-popup-component/info-popup.template.html'))
        .then(r => r.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);

            //add script
            const scriptId = 'info-popup-script';
            const scriptAlreadyExists = document.getElementById(scriptId);

            if (!scriptAlreadyExists) {
                let script = document.createElement('script');
                script.id = scriptId;
                script.src = chrome.runtime.getURL('/info-popup-component/info-popup.js');
                (document.head || document.documentElement).appendChild(script);
            }

            //add google icons url
            const linkId = 'info-popup-link';
            const linkAlreadyExists = document.getElementById(linkId);

            if (!linkAlreadyExists) {
                let link = document.createElement('link');
                link.id = linkId;
                link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
                link.rel = 'stylesheet';
                (document.head || document.documentElement).appendChild(link);
            }
        });
}