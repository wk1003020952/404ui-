import FourSwiper from "./src/FourSwiper"

FourSwiper.install = function (Vue,opts) {
  Vue.component(FourSwiper.name,ESwiper)
}

export default FourSwiper
