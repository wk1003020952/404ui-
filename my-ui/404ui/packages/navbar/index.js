import FourNavBar from "./src/FourNavBar"

FourNavBar.install = function (Vue,opts) {
  Vue.component(FourNavBar.name,FourNavBar)
}

export default FourNavBar
