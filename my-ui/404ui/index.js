import navbar from './packages/navbar/index'
import gotop from './packages/gotop/index'
import swiper from './packages/swiper/index'
import start from './packages/start/index'
import loading from './packages/loading/index'

const FourUI={}
FourUI.install=function (Vue,opts) {
  Vue.component(navbar.name,navbar);
  Vue.component(gotop.name,gotop);
  Vue.component(start.name,start);
  Vue.component(swiper.name,swiper);
  Vue.component(loading.name,loading);
}
export default FourUI;
