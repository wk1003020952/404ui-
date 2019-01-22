<template>
  <transition name="fade">
    <div class="go_T" v-if="go" @click="gotop">
      <div v-if="txt">{{txt}}</div>
      <slot name="go_T"></slot>
    </div>
  </transition>
</template>

<script>
    export default {
        props:["scrolT","txt"],
        name: "FourGoTop",
      data(){
        return{
          go:false
        }
      },
      mounted(){
        window.addEventListener('scroll', this.handle)
      },
      methods:{
        handle(){
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop>this.scrolT||700){
            this.go=true
          }else {
            this.go=false
          }
        },
        gotop(){
          console.log("gotop")
          document.documentElement.scrollTop = document.body.scrollTop = 0
        }
      }
    }
</script>

<style scoped lang="stylus">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  div.go_T
    position fixed
    bottom 50px
    right 12px
    z-index 10
    width 55px
    height 55px
    cursor pointer

</style>
