document.addEventListener("DOMContentLoaded", () => {
  const colorPicker = document.getElementById("colorPicker");
  const unlockCheckbox = document.getElementById("unlockCheckbox");

  chrome.storage.sync.get(["color", "unlock"], (result) => {
    if (result.color) colorPicker.value = result.color;
    if (typeof result.unlock === "boolean") unlockCheckbox.checked = result.unlock;
  });

  colorPicker.addEventListener("input", () => {
    chrome.storage.sync.set({ color: colorPicker.value });
  });

  unlockCheckbox.addEventListener("change", () => {
    chrome.storage.sync.set({ unlock: unlockCheckbox.checked });
  });
});
