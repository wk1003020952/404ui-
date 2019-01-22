<template>
  <div class="hello">
    <button @click="bm1">22222</button>
    <four-tabs></four-tabs>
    <four-input-box label="哈哈" inputValue="111" inputType="text"></four-input-box>
  </div>
</template>

<script>
  import {MessageBox} from '../../404ui/packages/message-box'
export default {
  name: 'HelloWorld',
  methods: {
    showLi(index){
      console.log(index)
    },
    bm1(){
      MessageBox.confirm(111);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  div.hello
    height 1800px
</style>
<style lang="stylus">
  .hello
    width: 100%
    height: 100%
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
