<template>
  <div>
    <div class="header_bar">
      <span v-if="lefts"  class="lefts" @click="click_left">{{lefts}}</span>
      <slot name="left" class="lefts"></slot>
      <span class="tit">{{title}}</span>
      <slot name="right" class="increat"></slot>
      <span v-if="increat" class="increat" @click="click_right">{{increat}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        props:["title","lefts","increat"],
        name: "FourNavBar",
        methods:{
          click_left(){
            this.$emit("left_click")
          },
          click_right(){
            this.$emit("right_click")
          },
        }
    }
</script>

<style lang="stylus">
  .header_bar
    background-color #ccc
    height:44px
    line-height: 44px
    position: relative
    overflow: hidden
    &>.lefts
      position: absolute
      left:0
      font-size:20px
      z-index:10
    &>.tit
      width: 100%
      height: 100%
      position: absolute
      left: 0
      top: 0
      text-align: center
      font-size:18px
    &>.increat
      right 0
      position: absolute
      z-index:10

</style>
