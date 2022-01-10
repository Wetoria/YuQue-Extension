let defaultOutlineWidth = 280;
let outlineWidth = defaultOutlineWidth;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ outlineWidth });
  console.log('Default outlineWidth  set to ', outlineWidth);
});