chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'inline-crypto-cm',
        contexts: ['selection'],
        title: 'Default',
        visible: false
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info.selectionText);
});