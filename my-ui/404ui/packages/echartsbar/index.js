import FourEChat from "./src/FourEChat"

FourEChat.install = function (Vue,opts) {
  Vue.component(FourEChat.name,FourEChat)
}

export default FourEChat
