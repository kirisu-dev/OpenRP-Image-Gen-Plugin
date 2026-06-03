const enabled =
    document.getElementById("enabled");

chrome.storage.local.get(
    ["enabled"],
    (data) => {

        enabled.checked =
            data.enabled !== false;

    }
);

enabled.addEventListener(
    "change",
    () => {

        chrome.storage.local.set({
            enabled: enabled.checked
        });

    }
);