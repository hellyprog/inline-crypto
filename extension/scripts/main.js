import { popupConfigurationKey, contextMenuId } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    initRadioEventListeners();
});

function initRadioEventListeners() {
    let checkboxes = document.querySelectorAll(`input[type=checkbox]`);
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', () => {
        chrome.storage.sync.get(popupConfigurationKey, result => {
            let storeObject = result;
            storeObject = storeObject ? storeObject : {};
            storeObject[popupConfigurationKey] = {
                ...storeObject[popupConfigurationKey],
                [checkbox.name]: checkbox.checked
            };

            setStorageData(storeObject);
        });
    }));
}

function setStorageData(data) {
    chrome.storage.sync.set(data, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
    });
}