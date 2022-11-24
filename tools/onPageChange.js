const changeTocAreaWidth = () => {
  vipYQ.getStorage('catalogAreaWidth', (value) => {
    const tocArea = document.querySelector('.ne-toc-normal-view')
    if (tocArea) {
      tocArea.style.width = value + 'px'
    }
  })
  vipYQ.getStorage('tocSwitchChecked', (checked) => {
    document.querySelectorAll('.ne-toc-normal-view .ne-toc-item').forEach((item) => {
      item.style.height = checked ? 'unset' : '22px';
      item.style.whiteSpace = checked ? 'unset' : 'nowrap';
    })
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