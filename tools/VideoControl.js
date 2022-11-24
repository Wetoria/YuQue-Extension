
let lastVideoTarget

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
  vipYQ.getStorage('backwardStep', (value) => {
    target.currentTime -= Number(value)
  })
})

const videoForward = baseFunc((target) => {
  vipYQ.getStorage('forwardStep', (value) => {
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
  vipYQ.getStorage('speedupStep', (value) => {
    let newValue = target.playbackRate + Number(value)
    if (newValue >= 16) {
      newValue = 16
    }
    target.playbackRate = newValue
  })
})

const videoSpeedCut = baseFunc((target) => {
  vipYQ.getStorage('speedcutStep', (value) => {
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


let a = document.querySelector('html')
let isFullscreen = false
let oldScrollTop = 0
let recordScrollTop = () => {
  oldScrollTop = a.scrollTop
}
const addFullscreenBtnListener = () => {
  const btns = document.querySelectorAll('[class*=Fullscreen-module_button]')
  btns.forEach((item) => {
    item.addEventListener('click', () => {
      recordScrollTop()
    })
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
