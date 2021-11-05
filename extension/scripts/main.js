const infoProviderKey = 'info-provider';

document.addEventListener('DOMContentLoaded', () => {
    getStorageValues();
    InitRadioEventListeners();
});

function InitRadioEventListeners() {
    let radios = document.querySelectorAll(`input[type=radio][name="${infoProviderKey}"]`);
    radios.forEach(radio => radio.addEventListener('change', () => {
        let storeObject = {};
        storeObject[infoProviderKey] = radio.value;

        chrome.storage.sync.set(storeObject, () => {
            console.log(`Value is set to ${radio.value}`);

            updateContextMenu(radio.value);
        });
    }));
}

function getStorageValues() {
    chrome.storage.sync.get(infoProviderKey, (obj) => {
        let radioButtonId = obj[infoProviderKey] === 'CoinMarketCap' ? 'radio-coinmarketcap' : 'radio-coingecko';
        let radioButton = document.getElementById(radioButtonId);
        radioButton.checked = true;

        updateContextMenu(obj[infoProviderKey]);
    });
}

function updateContextMenu(titleProvider) {
    chrome.contextMenus.update('inline-crypto-cm', {
        title: 'Find %s info in ' + titleProvider,
        visible: true
    });
}