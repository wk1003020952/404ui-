<template>
    <div @click="toggleE" :width="`${size}px`" :class="{'four-switch-on':checked}" class="four-switch">
      <div class="four-switch__node"></div>
    </div>
</template>

<script>
    export default {
      name: "FourSwitch",
      data(){
        return{
        }
      },
      props:{
        activeColor:{
          type:String,
          default:''
        },
         inactiveColor:{
          type: String,
          default: ''
        },
        size:{
          type:Number,
          default:''
        },
        checked:{
          type:Boolean,
          default:false
        },
        name:{
          type:String,
          default:''
        }
      },
      methods:{
        toggleE(){
          if(this.$isServer) return
          this.checked = !this.checked
          if (this.checked && this.activeColor) {
            document.getElementsByClassName("four-switch")[0].style.backgroundColor=this.activeColor
          }else if(!this.checked && this.inactiveColor){
            document.getElementsByClassName("four-switch-on")[0].style.backgroundColor=this.inactiveColor
          }
          this.$emit('change',this.checked)
        }
      }
    }
</script>

<style lang="stylus">
.four-switch
  position: relative
  display: inline-block
  width:62px;
  height:32px;
  background: #fff
  border:1px solid rgba(0, 0, 0, 0.1)
  border-radius 100px
  transition .3s
  &.four-switch-on
    background: deepskyblue
    .four-switch__node
      left:50%

.four-switch__node
  position: absolute
  top:0
  left: 0
  z-index:1
  transition .3s
  width: 50%
  height: 100%
  background: #ffffff
  border-radius 100%
  box-shadow 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);

</style>
