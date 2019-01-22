import Vue from 'vue'
import msgBoxVue from './message-box.vue'

let MessageBoxConstructor = Vue.extend(msgBoxVue);

let CONFIRM_TEXT = '确认';
let CANCEL_TEXT = '取消';
let msgQueue = [];
let currentMsg,instance;

let defaults = {
  title:'提示',
  message:'',
  type:'',//input框type类型
  showInput: false,
  showClose:true,
  modalFade:false,
  lockScroll:false,
  closeOnClickModal:true,
  inputValue:null,
  inputPlaceholder: '',//占位符：‘’；
  inputPattern:null,//input模式
  inputValidator:null,//input验证器
  inputErrorMessage: '',//input错误信息：''
  showCancelButton:false,//是否显示取消按钮：否
  showConfirmButton:true,//是否显示确认按钮：是
  confirmButtonPosition:'right',//确认按钮的位置，默认right
  confirmButtonHighlight:false,//高亮
  cancelButtonHighlight:false,//高亮
  confirmButtonText: CONFIRM_TEXT,//确认按钮的默认文字
  cancelButtonText: CANCEL_TEXT,//取消按钮的文字
  confirmButtonClass: '',//确认键的class
  cancelButtonClass:'',//取消键的class
};
let merge = function (target) {
  for(let i=0; i<arguments.length;i++){
    let source = arguments[i] || {};
    for(let prop in source){
      if(source.hasOwnProperty(prop)){
        let value = source[prop];
        if(value !==undefined) target[prop] = value
      }
    }
  }
  return target
};

const defaultCallBack = action =>{
  if(currentMsg){
    let callback = currentMsg.callback;
    if(typeof callback === 'function'){
      if(instance.showInput){
        callback(instance.inputValue,action);
      }else{callback(action)}
    }
    if(currentMsg.resolve){
      var $type = currentMsg.options.$type;
      if($type === 'confirm' || $type === 'prompt'){
        if(action === 'confirm'){
          if(instance.showInput){
            currentMsg.resolve({value: instance.inputValue, action })
          }else{
            currentMsg.resolve(action);
          }
        }else if(action === 'cancel' && currentMsg.reject){
          currentMsg.reject(action)
        }
      }else{
        currentMsg.resolve(action)
      }
    }
  }
}


let initInstance = function () {
  instance = new MessageBoxConstructor({el:document.createElement('div')})
  instance.callback = defaultCallBack;
}

let showNextMsg = ()=>{
  if(!instance) initInstance();
  if(!instance.value || instance.closeTimer){
    if(msgQueue.length>0){
      currentMsg = msgQueue.shift()
      let options = currentMsg.options;
      for(let prop in options){
        if(options.hasOwnProperty(prop)){
          instance[prop] = options[prop];
        }
      }
      if(options.callback === undefined){
        instance.callback = defaultCallBack;
      }
      ['modal','showClose','closeOnClickModal','closeOnPressEscape'].forEach((prop)=>{
        if(instance[prop] === undefined) instance[prop] = true
      })
      document.body.appendChild(instance.$el);
      Vue.nextTick(()=>{
        instance.value = true;
      })
    }
  }
};

let MessageBox = function (options, callback) {
  if(typeof options === 'string'){
    options = { title:options };
    if(arguments[1]) options.message = arguments[1];
    if(arguments[2]) options.type = arguments[2];
  }else if(options.callback && !callback){
    callback = options.callback;
  }
  if(typeof Promise !== "undefined"){
    return new Promise(function (resolve, reject) {// eslint-disable-line
      msgQueue.push({
        options:merge({},defaults, MessageBox.defaults || {} , options),
        callback :callback,
        resolve: resolve,
        reject: reject
      });
      showNextMsg();
    })
  }else {
    msgQueue.push({
      options:merge({},defaults,MessageBox.defaults || {},options),
      callback:callback
    });
    showNextMsg();
  }
};

MessageBox.setDefaults = (defaults)=> {
  MessageBox.defaults = defaults;
};
MessageBox.alert = (msg,title,options)=>{
  if(typeof title ==='object'){
    options = title;
    title  = ''
  }
  return MessageBox(merge({
    title:title,
    message:msg,
    $type:'alert',
    closeOnPressEscape:false,
    closeOnClickModal:false
  },options));
};
MessageBox.confirm = (msg,title,options)=>{
  if(typeof  title ==='object') { options = title ;title = ''; }
  return MessageBox(merge({
    title:title,
    message:msg,
    $type : 'confirm',
    showConfirmButton: true
  }),options);
};
MessageBox.prompt = (msg,title,options)=>{
  if(typeof title === 'object') options = title; title = '';
  return MessageBox(merge({
    title:title,
    message:msg,
    showCancelButton:true,
    showInput:true,
    $type : 'prompt',
  },options))
};
MessageBox.close = ()=>{
  if(!instance ) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

export default MessageBox;
export {MessageBox};


