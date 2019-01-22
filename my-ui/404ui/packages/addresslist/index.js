import add from "./src/Addresslist"

add.install = function (Vue,opts) {
  Vue.component(add.name,add)
}

export default add
