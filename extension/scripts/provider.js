const infoProviderKey = 'info-provider';

document.addEventListener('DOMContentLoaded', function() {
    getStorageValues();
    InitRadioEventListeners();
});

function InitRadioEventListeners() {
    let radios = document.querySelectorAll(`input[type=radio][name="${infoProviderKey}"]`);
    radios.forEach(radio => radio.addEventListener('change', () => {
        let storeObject = {};
        storeObject[infoProviderKey] = radio.value;

        chrome.storage.sync.set(storeObject, function(toggleOn) {
            console.log(toggleOn);
            console.log(`Value is set to ${radio.value}`);
        });
    }));
}

function getStorageValues() {
    chrome.storage.sync.get(infoProviderKey, function(obj) {
        console.log(obj[infoProviderKey]);
    });
}