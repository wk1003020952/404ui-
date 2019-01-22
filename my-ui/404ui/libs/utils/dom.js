/* istanbul ignore next */

import Vue from 'vue'

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
/*去除首尾空格和非法字符串*/
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,'');
}

/* istanbul ignore next */
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP,function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() :letter;
  }).replace(MOZ_HACK_REGEXP,'Moz$1');
};

/* istanbul ignore next */
/*给元素添加事件*/
export const on = (function () {
  if(!isServer && document.addEventListener){
    return function (el, event, handler) {
      if(el && event && handler){
        el.addEventListener(event,handler,false)
      }
    };
  }else{
    return function (el, event, handler) {
      if(el && event && handler){
        el.attachEvent('on'+event,handler);
      }
    }
  }
})();

/* istanbul ignore next */
/*给元素事件移除*/
export const off = (function () {
  if(!isServer && document.removeEventListener){
    return function (el, event, handler) {
      if(el && event ) el.removeEventListener(event,handler,false);
    };
  }else{
    return function (el, event, handler) {
      if(el && event) el.detachEvent('on'+ event, handler);
    }
  }
})();

/* istanbul ignore next */
/*----------once-----------*/
export const once = function (el, event, fn) {
  var listener = function () {
    if(fn) fn.apply(this,arguments);
    off(el, event, listener);
  }
  on(el,event,listener);
}

/* istanbul ignore next */
export const hasClass = function (el, cls) {
  if(!el || !cls) return false;
  if(cls.indexOf(' ' !== -1)) throw new Error('class name should not contain space.');
  if(el.classList){
    return el.classList.contains(cls)
  }else{
    return (` ${el.className} `).indexOf(` ${cls} `) > -1;
  }
};
/* istanbul ignore next */
export const addClass = function (el, cls) {
  if(!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');
  for(let i = 0; i<classes.length; i++){
    var clsName = classes[i];
    if(!clsName) continue;

    if(el.classList){
      el.classList.add(clsName);
    }else{
      if(!hasClass(el,clsName)){
        curClass += ' ' + clsName;
      }
    }
  }
  if(!el.classList) el.className = curClass;

}
/* istanbul ignore next */
export const removeClass = function (el, cls) {
  if(!el || !cls ) return;
  var classes = cls.split(' ');
  var curClass = ` ${el.className} `;
  for(let i=0; i<classes.length; i++){
    let clsName = classes[i];
    if(!clsName) continue;
    if(el.classList){
      el.classList.remove(clsName)
    }else{
      if(hasClass(el,clsName)) curClass = curClass.replace(` ${clsName} `,' ');
    }
  }
  if(!el.classList) el.className = trim(curClass)
}

/* istanbul ignore next */
export const getStyle = ieVersion < 9 ? function (el, styleName) {
  if(isServer) return;
  if(!el || !styleName) return null;
  styleName = camelCase(styleName);
  if(styleName === 'float') styleName = 'styleFloat';
  try {
    switch (styleName) {
      case 'opacity' :
        try {
          return el.filters.item('alpha').opacity / 100;
        }catch (e) {
          return 1.0;
        }
      default:
        return (el.style[styleName] || el.currentStyle ? el.currentStyle[styleName] : null);
    }
  }catch (e) {
    return el.style[styleName];
  }
}:function (el, styleName) {
  if(isServer) return;
  if(!el || !styleName) return;
  styleName = camelCase(styleName);
  if(styleName === 'float') styleName = 'cssFloat';
  try {
    var computed = document.defaultView.getComputedStyle(el,'');
    return el.style[styleName] || computed ? computed[styleName] :null;
  }catch (e) {
    return el.style[styleName];
  }
} ;
/* istanbul ignore next */
export const setStyle = function (el, styleName, value) {
  if(!el || !styleName) return;
  if(typeof styleName === 'object'){
    for (let prop in styleName) {
      if(styleName.hasOwnProperty(prop)) setStyle(el,prop,styleName[prop])
    }
  }else{
    styleName = camelCase(styleName);
    if(styleName === 'opacity' && ieVersion < 9 ){
      el.style.filter = isNaN(value) ? '' : `alpha(opacity=${value*100})`;
    }else{
      el.style[styleName] = value;
    }
  }
};
