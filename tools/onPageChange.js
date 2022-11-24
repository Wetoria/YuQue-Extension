const changeTocAreaWidth = () => {
  vipYQ.getStorage('catalogAreaWidth', (value) => {
    const tocArea = document.querySelector('.ne-toc-normal-view')
    if (tocArea) {
      tocArea.style.width = value + 'px'
    }
  })
}

const autoExecute = () => {
  changeTocAreaWidth()
  addFullscreenBtnListener()
}

// 监听语雀页面变化
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
  autoExecute()
})

observer.observe(document.querySelector('body'), {
  childList: true
})

window.onload = () => {
  Message.notify()
}