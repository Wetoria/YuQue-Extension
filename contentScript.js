let a = document.querySelector('html')
let fullscreenFlag = false
let oldScrollTop
document.onfullscreenchange = () => {
  fullscreenFlag = !fullscreenFlag
  if (fullscreenFlag) {
    oldScrollTop = a.scrollTop
  } else {
    a.scrollTop = oldScrollTop
  }
}

let lastVideoTarget

document.onkeydown = (e) => {
  let parent = document.querySelector('.ne-focused')
  let target = parent && parent.querySelector('video') || lastVideoTarget
  lastVideoTarget = target

  const videoBack = () => {
    if (!target) return;
    const step = 1; // 单位秒
    target.currentTime -= step
  }

  const videoForward = () => {
    if (!target) return;
    const step = 1; // 单位秒
    target.currentTime += step
  }
  const videoPlayAndPause = () => {
    if (!target) return;

    if (target.paused) {
      target.play()
    } else if (target.played) {
      target.pause()
    }
    e.preventDefault();
  }

  const videoSpeedUp = () => {
    if (!target) return;

    let step = 0.1
    target.playbackRate += step
  }

  const videoSpeedCut = () => {
    if (!target) return;

    let step = 0.1
    target.playbackRate -= step
  }

  const {
    code
  } = e;
  switch (code) {
    case 'ArrowLeft':
      videoBack();
      break;
    case 'ArrowRight':
      videoForward();
      break;
    case 'Space':
      videoPlayAndPause();
      break;
    case 'BracketRight':
      videoSpeedUp();
      break;
    case 'BracketLeft':
      videoSpeedCut();
      break;
  }
}
console.log('Enabled YuQue extension. Includes Video control')