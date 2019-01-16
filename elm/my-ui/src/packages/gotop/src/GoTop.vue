<template>
  <transition name="fade">
    <div class="go_T" v-if="go" @click="gotop">
      <slot name="go_T"></slot>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "GoTop",
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
          if (scrollTop>500){
            this.go=true
          }else {
            this.go=false
          }
        },
        gotop(){
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
    bottom 1rem
    right .12rem
    z-index 10
    width .55rem
    height .55rem
    cursor pointer

</style>
