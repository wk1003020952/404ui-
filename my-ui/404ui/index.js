import navbar from './packages/navbar/index'
import gotop from './packages/gotop/index'
import swiper from './packages/swiper/index'
import start from './packages/start/index'
import loading from './packages/loading/index'
import stepper from './packages/stepper/index'
import button from './packages/button/index'
import echartsbar from './packages/echartsbar/index'
import search from './packages/search/index'
import tabs from './packages/tabs/index'
import inputBox from './packages/inputBox/index'


const FourUI={}
FourUI.install=function (Vue,opts) {
  Vue.component(navbar.name, navbar);
  Vue.component(gotop.name, gotop);
  Vue.component(start.name, start);
  Vue.component(swiper.name, swiper);
  Vue.component(loading.name, loading);
  Vue.component(stepper.name, stepper);
  Vue.component(button.name, button);
  Vue.component(echartsbar.name, echartsbar);
  Vue.component(search.name, search);
  Vue.component(tabs.name, tabs);
  Vue.component(inputBox.name, inputBox);
}
export default FourUI;
