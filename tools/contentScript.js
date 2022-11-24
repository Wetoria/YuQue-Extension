

const changeTocAreaWidth = () => {
  vipYQ.getStorage('catalogAreaWidth', (value) => {
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


const locationListener = {
  oldLocation: null,
  customerListener: [],
  events: [],
  checkChange() {
    let newLocation = location
    for (const listener of this.customerListener) {
      listener(this.oldLocation, newLocation)
    }
    // if (newLocation)
  },
  addListener(...args) {
    this.customerListener.push(...args)
  },
}


locationListener.addListener(() => {

})

setInterval(() => {
  locationListener.checkChange()
}, 0)
