<template>
  <div class="hello">
    <Addresslist></Addresslist>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      formData:[
        {label:'姓名',placeholderTxt: '收货人姓名',inputValue: '里斯'},
        {label:'电话',placeholderTxt: '收货人手机号',inputValue: '13544463324'},
        {label:'地区',placeholderTxt: '选择省市区',inputValue: '陕西省西安市高新区'},
        {label:'详细地址',placeholderTxt: '街道门牌、楼层房间号等信息',inputValue: '绿港22号楼3101'},
        {label:'邮政编码',placeholderTxt: '邮政编码',inputValue: '009900'},
      ]
    }
  },
  methods: {
    onSave(a) {
      console.log(a)
    },
    onDel(a) {
      console.log(a)
    },
    /**
     * a  是数组，一个是checked状态，一个是form表单数据
     * @param a
     */
    onSwitch(a) {
      console.log(a[0] + '-----------')
      console.log(a[1][0].label + '-----------')
    }
  }
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
