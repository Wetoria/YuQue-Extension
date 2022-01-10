const dom = document.querySelector('#outlineThumbnailSwitcher');

document.addEventListener('DOMContentLoaded', function() {

  dom.addEventListener('change', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (checked) => {
        document.querySelectorAll('.ne-toc-normal-view .ne-toc-item').forEach((item) => {
          item.style.height = checked ? 'unset' : '22px';
          item.style.whiteSpace = checked ? 'unset' : 'nowrap';
        })
      },
      args: [dom.checked],
    });
  });
});

const outlineWidthInput =  document.getElementById('outlineWidthInput');
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get("outlineWidth", ({ outlineWidth }) => {
    outlineWidthInput.value = outlineWidth;
  })
});


outlineWidthInput.addEventListener('input', async (event) => {
  const value = event.target.value
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (width) => {
      document.querySelector('.ne-toc-normal-view').style.width = width + 'px'
      chrome.storage.sync.set({ outlineWidth: width });
    },
    args: [value],
  });
});
