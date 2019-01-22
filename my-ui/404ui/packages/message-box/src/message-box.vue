<template>
    <div class="f">
      <transition name="msgbox-bounce">
        <div class="f-msgbox" v-show="value">
          <div class="msg-header" v-if="title !==''">
            <div class="msg-title">{{title}}</div>
          </div>
          <div class="msg-content">
            <div class="msg-message" v-html="message"></div>
            <div class="msg-input" v-show="showInput">
              <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
              <div class="msg-errormsg" :style="{visibility:!!editorErrorMessage ? 'visible' : 'hidden' }">{{editorErrorMessage}}</div>
            </div>
          </div>
          <div class="msg-btns">
            <button :class="[cancelButtonClasses]" v-show="showCancelButton" @click="handleAction('cancel')">{{cancelButtonText}}</button>
            <button :class="[confirmButtonClasses]" v-show="showConfirmButton" @click="handleAction('confirm')">{{confirmButtonText}}</button>
          </div>
        </div>
      </transition>
    </div>
</template>

<script type="text/babel">
  let CANCEL_TEXT = '取消';
  let CONFIRM_TEXT = '确定';
  import Popup from '../../../libs/utils/popup/index'

  export default {
    mixins:[Popup],

    props:{
      modal:{
        default:true
      },
      showClose:{
        type:Boolean,
        default: true
      },
      lockScroll:{
        type: Boolean,
        default:true
      },
      closeOnClickModal:{
        default:true
      },
      closeOnPressEscape:{
        default:true
      },
      inputType:{
        type:String,
        default:'text',
      },
    },

    computed:{
      confirmButtonClasses(){
        let classes = 'msg-btn msg-confirm'+ this.confirmButtonClass;
        if(this.confirmButtonHighlight){
          classes += 'msg-confirm-highlight'
        }
        return classes
      },
      cancelButtonClasses(){
        let classes = 'msg-btn msg-cancel'+this.cancelButtonClass;
        if(this.cancleButtonHighlight){
          classes += 'msg-cancel-highlight'
        }
        return classes;
      }
    },

    methods:{
      doClose(){
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();
        setTimeout(()=>{
          if(this.model && this.bodyOverflow !=='hidden'){
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        },200);
        this.opened = false;
        if(!this.transition){
          this.doAfterClose();
        }
      },
      handleAction(action){
        if(this.$type === 'prompt' && action ==='confirm' && this.validate()){
          return;
        }
        var callback  = this.callback;
        this.value = false;
        callback(action)
      },
      /*验证，证实*/
      validate(){
        if(this.$type === 'prompt'){
          var inputPattern = this.inputPattern;
          if(inputPattern && !inputPattern.test(this.inputValue || '')){
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法！';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if(inputValidator === 'function'){
            var validateResult = inputValidator(this.inputValue);
            if(validateResult === false){
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法！';
              this.$refs.input.classList.add('invalid');
              return false;
            }
            if(typeof validateResult === 'string'){
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        this.$refs.input.classList.remove('invalid');
        return true;
      },
      handleInputType(val){
        if(val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },

    watch:{
      inputValue(){
        if(this.$type === 'prompt'){
          this.validate();
        }
      },

      value(val){
        this.handleInputType(this.inputType);
        if(val && this.$type === 'prompt'){
          setTimeout(()=>{
            if(this.$refs.input){
              this.$refs.input.focus();
            }
          },500)
        }
      },

      inputType(val){
        this.handleInputType(val)
      }
    },
    data(){
      return{
        title:'',
        message:'',
        type:'',
        showInput:false,//是否显示input框
        inputValue:null,
        inputPlaceholder:'',
        inputPattern:null,//输入模式
        inputValidator:null,//输入查验
        inputErrorMessage:'',
        showConfirmButton:true,//显示确认按钮
        showCancelButton:false,//不显示关闭按钮
        cancelButtonText:CANCEL_TEXT,//取消按钮的text
        confirmButtonText:CONFIRM_TEXT,//确认按钮的text
        confirmButtonClass:'',
        editorErrorMessage:null,//错误信息，默认没有
        callback:null//
      }
    }

  }
</script>

<style lang="stylus">
.f {
    .f-msgbox {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      background-color: #fff;
      width: 85%;
      border-radius: 3px;
      font-size: 16px;
      -webkit-user-select: none;
      overflow: hidden;
      backface-visibility: hidden;
      transition: .2s

      .msg-header {
        padding: 15px 0 0;
      }

      .msg-content {
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
      }

      .msg-input {
        padding-top: 15px;
        & input {
            border: 1px solid #dedede;
            border-radius: 5px;
            padding: 4px 5px;
            width: 100%;
            appearance: none;
            outline: none;
        }
        & input.invalid {
            border-color: #ff4949;
            &:focus {
               border-color: #ff4949;
            }
        }
      }

      .msg-errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
      }

      .msg-title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      .msg-message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
      }

      .msg-btns {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;
      }

      .msg-btn {
        line-height: 35px;
        display: block;
        background-color: #fff;
        flex: 1;
        margin: 0;
        border: 0;

        &:focus {
           outline: none;
        }

        &:active {
           background-color: #fff;
        }
      }

      .msg-cancel {
        width: 50%;
        border-right: 1px solid #ddd;
        &:active {
           color: #000;
        }
      }

      .msg-confirm {
        color: #26a2ff;
        width: 50%;
        &:active {
           color: #26a2ff;
        }
      }
    }
}

  .msgbox-bounce-enter {
    opacity: 0;
    transform:translate3d(-50%, -50%, 0) scale(.7);
  }
  .msgbox-bounce-leave-active{
    opacity: 0;
    transform:translate3d(-50%, -50%, 0) scale(.9);
  }
</style>
<style src = '../../../libs/stylus/popup.css'></style>
