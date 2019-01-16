<template>
  <div>
    <div class="header_bar">
      <slot name="left" class="iconfont"></slot>
      <span class="tit">{{title}}</span>
      <slot name="right" class="increat"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        props:["title"],
        name: "NavBar"
    }
</script>

<style lang="stylus">
  .header_bar
    background-color #ccc
    height:.44rem
    line-height: .44rem
    position: relative
    overflow: hidden
    &>.iconfont
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
