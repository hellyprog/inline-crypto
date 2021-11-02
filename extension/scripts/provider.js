var radios = document.querySelectorAll('input[type=radio][name="info_provider"]');
radios.forEach(radio => radio.addEventListener('change', () => alert(radio.value)));