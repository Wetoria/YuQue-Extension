let defaultOutlineWidth = 280;
let catalogAreaWidth = defaultOutlineWidth;

let forwardStep = 1
let backwardStep = 1
let speedupStep = 0.1
let speedcutStep = 0.1

const defaultValues = {
  catalogAreaWidth,
  forwardStep,
  backwardStep,
  speedupStep,
  speedcutStep,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultValues);
  console.log('Default outlineWidth  set to ', outlineWidth);
});