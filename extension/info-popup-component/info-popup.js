function copyContract(e) {
    debugger;
    var data = [new ClipboardItem({ "text/plain": new Blob([e.innerText], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(function() {
        console.log("Copied to clipboard successfully!");
    }, function() {
        console.error("Unable to write to clipboard. :-(");
    });
}

function popupBackgroundClick() {
    let infoPopup = document.getElementById("info-popup-background");
    infoPopup.remove();
}