chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'inline-crypto-cm',
        contexts: ['selection'],
        title: 'Default',
        visible: false
    });
});