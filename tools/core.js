window.vipYQ = {
  setStorage(key, value) {
    chrome.storage.sync.set({ [key]: value });
  },
  getStorage(key, fn) {
    chrome.storage.sync.get(key, ({ [key]: value }) => {
      fn(value)
    })
  },
  isReadingSFE() {
    const baseUrl = 'https://www.yuque.com/wetoria/simplest-frontend'
    const { href } = location
    if (href.startsWith(baseUrl) && href.length > baseUrl.length) {
      return true
    }
    return false
  },
  isNotReadingSFE() {
    return !isReadingSFE()
  }
}