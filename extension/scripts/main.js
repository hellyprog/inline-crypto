import { popupConfigurationKey } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    assignStoredValue();
    initRadioEventListeners();
});

function initRadioEventListeners() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
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

function assignStoredValue() {
    chrome.storage.sync.get(popupConfigurationKey, result => {
        if (result[popupConfigurationKey]) {
            Object.keys(result[popupConfigurationKey]).forEach((key) => {
                let checkbox = document.getElementById(key);
                checkbox.checked = result[popupConfigurationKey][key];
            });
        }
    });
}

function setStorageData(data) {
    chrome.storage.sync.set(data, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
    });
}