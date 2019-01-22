<template>
    <p>
      <span @click="jian" ref="p">-</span>
      <span class="num">{{this.min||num}}</span>
      <span @click="add">+</span>
    </p>
</template>

<script>
    export default {
        props:["step","min","max"],
        name: "FourStepper",
        data(){
          return{
            num:1,
            m:"",
          }
        },
        mounted(){
          this.m=this.min
        },
        methods:{
          jian(){
            if (this.min){
              if (this.min==this.m){
                this.min=this.m
                this.$refs.p.style.color='#ccc'
              } else {
                this.min=this.min - this.step||1;
              }
              this.$emit("change",this.min)
            }else {
              if (this.num<=1){
                this.$refs.p.style.color='#ccc'
                this.num=0;
              }else {
                this.num=this.num - this.step||1;
              }
              this.$emit("change",this.num)
            }
          },
          add(){
            if (this.max){
              if (this.min==this.max){
                this.min=this.max
              } else{
                this.min=this.min+this.step||1
              }
              this.$emit("change",this.min)
            }else {
              this.num=this.num+this.step||1
              this.$emit("change",this.num)
            }
          }
        }
    }
</script>

<style scoped lang="stylus">
p
  width 140px
  height 38px
  line-height 38px
  border 1px solid  #ebedf0
  span
    margin 0
    padding 0
    display inline-block
    height 100%
    width 44px
    text-align center
    color black
    font-size 16px
  span.num
    color #7d7e80
    width 40px
    border-right 1px solid  #ebedf0
    border-left  1px solid  #ebedf0
</style>
