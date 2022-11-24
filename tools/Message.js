function initMessage() {
  const messageDom = document.createElement('span')
  const prefix = '【语雀插件】'

  messageDom.innerHTML = prefix + '加载成功'
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
      msg = prefix + (msg || '加载成功')
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
window.Message = vipYQ.Message = Message