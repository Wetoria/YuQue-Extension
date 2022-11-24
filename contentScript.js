function initMessage() {
  const messageDom = document.createElement('span')
  const prefix = '【极简化前端-语雀插件】'

  messageDom.innerHTML = prefix + '视频控制功能加载成功'
  messageDom.style = `
    position: fixed;
    background: #16AF58;
    padding: 10px 20px;
    z-index: 999;
    transition: all 0.5s;
    border: 1px solid #16AF58;
    color: white;
    border-radius: 10px;
    font-weight: 500;
  `
  const topValue = '-44px'
  const rightValue = 'calc(50% - 77px)'

  messageDom.style.top = topValue
  messageDom.style.right = rightValue

  document.body.append(messageDom)
  const Message = {
    alert() {
      setTimeout(() => {
        // messageDom.style.right = '20px'
        messageDom.style.top = '20px'
  
        setTimeout(() => {
          // messageDom.style.right = rightValue
          messageDom.style.top = topValue
        }, 3000)
      })
    },
    setContent(msg) {
      msg = prefix + (msg || '视频控制功能加载成功')
      messageDom.innerHTML = msg
    },
    notify(msg) {
      this.setContent(msg)
      this.alert()
    }
  }
  return Message
}
const Message = initMessage()


let a = document.querySelector('html')
let isFullscreen = false
let oldScrollTop = 0
let recordScrollTop = () => {
  oldScrollTop = a.scrollTop
}
const addFullscreenBtnListener = () => {
  const btns = document.querySelectorAll('[class*=Fullscreen-module_button]')
  btns.forEach((item) => {
    item.onclick = () => {
      recordScrollTop()
    }
  })
}
document.onfullscreenchange = () => {
  isFullscreen = !isFullscreen
  const doSthWhenOpen = () => {
  }
  const doSomethingWhenClose = () => {
      a.scrollTop = oldScrollTop
  }
  if (isFullscreen) {
    doSthWhenOpen()
  } else {
    doSomethingWhenClose()
  }
}

let lastVideoTarget
const SIMPLEST_FRONTEND = 'simplestFrontend'
function setStorage(key, value) {
  chrome.storage.sync.set({ [key]: value });
}
function getStorage(key, fn) {
  chrome.storage.sync.get(key, ({ [key]: value }) => {
    fn(value)
  })
}

function getTarget() {
  let parent = document.querySelector('.ne-focused')
  let target = parent && parent.querySelector('video') || lastVideoTarget
  lastVideoTarget = target
  return target
}

function baseFunc(fn) {
  return (...args) => {
    let target = getTarget();
    if (!target) return
    fn(target, ...args)
  }
}

const videoBack = baseFunc((target) => {
  getStorage('backwardStep', (value) => {
    target.currentTime -= Number(value)
  })
})

const videoForward = baseFunc((target) => {
  getStorage('forwardStep', (value) => {
    target.currentTime += Number(value)
  })
})
const videoPlayAndPause = baseFunc((target, event) => {
  if (target.paused) {
    target.play()
  } else if (target.played) {
    target.pause()
  }
  event.preventDefault();
})

const videoSpeedUp = baseFunc((target) => {
  getStorage('speedupStep', (value) => {
    let newValue = target.playbackRate + Number(value)
    if (newValue >= 16) {
      newValue = 16
    }
    target.playbackRate = newValue
  })
})

const videoSpeedCut = baseFunc((target) => {
  getStorage('speedcutStep', (value) => {
    let newValue = target.playbackRate - Number(value)
    if (newValue <= 0) {
      newValue = 0.1
    }
    target.playbackRate = newValue
  })
})

const resetSpeed = baseFunc((target) => {
  target.playbackRate = 1
})


document.onkeydown = (event) => {
  
  const {
    code
  } = event;
  switch (code) {
    case 'ArrowLeft':
      videoBack(event);
      break;
    case 'ArrowRight':
      videoForward(event);
      break;
    case 'Space':
      videoPlayAndPause(event);
      break;
    case 'BracketRight':
      videoSpeedUp(event);
      break;
    case 'BracketLeft':
      videoSpeedCut(event);
      break;
    case 'Backslash':
      resetSpeed(event);
      break;
  }
}

const changeTocAreaWidth = () => {
  getStorage('catalogAreaWidth', (value) => {
    const tocArea = document.querySelector('.ne-toc-normal-view')
    if (tocArea) {
      tocArea.style.width = value + 'px'
    }
  })
}



window.onload = () => {
  Message.notify()
  changeTocAreaWidth()
  addFullscreenBtnListener()
}
