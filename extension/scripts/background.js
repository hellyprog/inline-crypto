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
        function: injectedFunction
    });
});

function injectedFunction() {
    document.body.style.backgroundColor = 'orange';
}