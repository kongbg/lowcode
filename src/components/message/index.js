import { Message } from 'element-ui'
let obj = null
const customMessage = (options) => {
  if(obj) {
    obj.close()
  }
  Message.closeAll()
  obj = Message(options)
}

['error', 'success', 'info', 'warning'].forEach(type => {
  customMessage[type] = options => {
    if(typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return customMessage(options)
  }
})
export const message =  customMessage