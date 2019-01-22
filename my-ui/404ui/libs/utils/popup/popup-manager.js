import Vue from 'vue'
import { addClass, removeClass } from '../dom'

let hasModal = false;

const getModal = function () {
  if(Vue.prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
  if(modalDom){
    hasModal = true;
  }else{
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove',function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.addEventListener('click',function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    })
  };

  return modalDom;
}

const instances = {};

const PopupManager = {
  zIndex:2000,

  modalFade:true,
  
  getInstance:function (id) {
    return instances[id];
  },
  register:function (id, instance) {
    if(id && instance){
      instances[id] = instance;
    }
  },
  deregister:function (id) {
    if(id){
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex:function () {
    return PopupManager.zIndex++;
  },
  modalStack:[],
  doOnModalClick:function () {
    let topItem = PopupManager.modalStack[PopupManager.modalStack.length-1];
    if(!topItem) return;
    const instance = PopupManager.getInstance(topItem.id);
    if(instance && instance.closeOnClickModal){
      instance.close();
    }
  },
  openModal:function (id,zIndex,dom,modalClass,modalFade) {
    if(Vue.prototype.$isServer) return
    if(!id || zIndex === undefined) return
    this.modalFade = modalFade;

    const modalStack = this.modalStack;
    modalStack.forEach(item=>{
      if(item.id===id) return
    });
    //获取dom
    const modalDom = getModal();
    addClass(modalDom,'v-modal');
    //添加v-modal-enter
    if(this.modalDom && !hasModal){
      addClass(modalDom,'v-modal-enter')
    }
    //循环添加class名
    if(modalClass){
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(item=>{addClass(modalDom,item)})
    };
    //移出v-modal-enter
    setTimeout(()=>{
      removeClass(modalDom,'v-modal-enter')
    },200);
    //modalDom添加进去
    if(dom && dom.parentNode && dom.parentNode.type !==11){
      dom.parentNode.appendChild(modalDom);
    }else{
      document.body.appendChild(modalDom);
    };
    if(zIndex){ modalDom.style.zIndex = zIndex; };
    modalDom.style.display = '';

    this.modalStack.push({id: id, zIndex: zIndex, modalClass: modalClass })
  },
  closeModal:function (id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();
    if(modalStack.length > 0){
      const topItem = modalStack[modalStack.length-1];
      if(topItem.id === id){
        if(topItem.modalClass){
          let classArr = topItem.modalClass.trim().split(/\s+/);
            classArr.forEach(item=>{ removeClass(modalDom,item)});
        }
        modalStack.pop();//删除并返回数组的最后一个元素
        if(modalStack.length>0){
          modalDom.style.zIndex = modalStack[modalStack.length-1].zIndex;
        }
      }else{
        for(let i = modalStack.length-1;i>=0;i--){
          if(modalStack[i].id===id){
            modalStack.splice(i,1);
            break;
          }
        }
      }
    }
    if(modalStack.length === 0){
      if(this.modalFade){
        addClass(modalDom,'v-modal-leave');
      }
      setTimeout(()=>{
        if(modalStack.length === 0 ) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        removeClass(modalDom,'v-modal-leave')
      },200)
    }
  }
};
!Vue.prototype.$isServer && window.addEventListener('keydow',function(event){
  if(event.keyCode === 27){//ESC
    if(PopupManager.modalStack.length > 0){
      const topItem = PopupManager.modalStack[PopupManager.modalStack.length-1];
      if(!topItem) return;
      const instance = PopupManager.getInstance(topItem.id);
      if(instance.closeOnPressEscape) instance.close();
    }
  }
})
export default PopupManager;
