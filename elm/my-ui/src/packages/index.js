import navbar from './navbar'
import gotop from './gotop'


const My_404UI={}
My_404UI.install=function (Vue,opts) {
  Vue.component(navbar.name,navbar);
  Vue.component(gotop.name,gotop);
}
export default My_404UI;
