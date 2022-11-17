const dom = document.querySelector('#outlineThumbnailSwitcher');

function setValue(key, value) {
  chrome.storage.sync.set({
    [key]: value
  });
}

document.addEventListener('DOMContentLoaded', function () {

  dom.addEventListener('change', async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
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

const outlineWidthInput = document.getElementById('catalogAreaWidth');
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get("catalogAreaWidth", ({
    catalogAreaWidth
  }) => {
    outlineWidthInput.value = catalogAreaWidth;
  })
});


outlineWidthInput.addEventListener('input', async (event) => {
  const value = event.target.value
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  setValue('catalogAreaWidth', value)
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: (width) => {
      document.querySelector('.ne-toc-normal-view').style.width = width + 'px'
    },
    args: [value],
  });
});


function bindInputEvents(target, {
  defaultValue = 1,
  min = 1,
  max = 1,
} = {}) {
  const targetInput = document.getElementById(`${target}`);
  document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(target, ({
      [target]: value
    } = {}) => {
      targetInput.value = value
      if (!value) {
        targetInput.value = defaultValue
        setValue(target, value)
      }
    })
  });

  targetInput.addEventListener('input', async (event) => {
    let value = event.target.value
    if (value >= max) {
      value = max
    }
    if (value <= min) {
      value = min
    }
    event.target.value = value
    setValue(target, value)
  });
}

bindInputEvents('forwardStep', { defaultValue: 1, min: 1, max: 30 })
bindInputEvents('backwardStep', { defaultValue: 1, min: 1, max: 30 })
bindInputEvents('speedupStep', { defaultValue: 0.1, min: 0.1, max: 16 })
bindInputEvents('speedcutStep', { defaultValue: 0.1, min: 0.1, max: 16 })



const plusBtns = document.querySelectorAll('.plus-icon')
const minusBtns = document.querySelectorAll('.minus-icon')

function addBtnEventListener(btns, negative) {
  btns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const targetName = event.target.getAttribute('data-target')
      if (!targetName) return
      const step = Number(event.target.getAttribute('data-step'))
      const minValue = Number(event.target.getAttribute('data-min'))
      const maxValue = Number(event.target.getAttribute('data-max'))
      const targetInput = document.getElementById(targetName)
      targetInput.value = Number(targetInput.value) + (negative ? -step : step)
      console.log('value is ', targetInput.value)
      if (targetInput.value < minValue) {
        targetInput.value = minValue
      }
      if (targetInput.value > maxValue) {
        targetInput.value = maxValue
      }
      setValue(targetName, targetInput.value)
  
      if (targetName === 'catalogAreaWidth') {
        let [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        });
        chrome.scripting.executeScript({
          target: {
            tabId: tab.id
          },
          function: (width) => {
            document.querySelector('.ne-toc-normal-view').style.width = width + 'px'
          },
          args: [targetInput.value],
        });
      }
    })
  })
}

addBtnEventListener(plusBtns)
addBtnEventListener(minusBtns, true)