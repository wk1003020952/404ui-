import navbar from './navbar'
import gotop from './gotop'
import start from './start'


const My_404UI={}
My_404UI.install=function (Vue,opts) {
  Vue.component(navbar.name,navbar);
  Vue.component(gotop.name,gotop);
  Vue.component(start.name,start);
}
export default My_404UI;
