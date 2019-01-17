<template>
  <div class="hello">
    <four-start :score="4.5" :size="24"></four-start>
    <four-go-top>
      <span slot="go_T">返回顶部</span>
    </four-go-top>
    <four-loading :color="color"></four-loading>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      color:"#ccc"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  div.hello
    height 1800px
</style>
<style>
  .swiper-pagination-bullet-active{
    opacity: 1 !important;
    background: #007aff !important;
  }
  .swiper-pagination-bullet {
    width: 14px ;
    height: 2px;
    display: inline-block;
    background: #000;
    opacity: .2;
    border-radius: 0}
</style>
