<template>
    <div :style="`flex-direction:${direction}`" class="tabWrapper">
      <div ref="tabWrapper" class="tabList">
        <ul>
          <li :class="{curLi:tid==isCurClass}" @click="curCon(tid)" class="tabItem" v-for="(t,tid) in tabList" :key="tid">{{t}}</li>
        </ul>
      </div>
      <div ref="conWrapper" class="con">
        <ul>
          <li v-if="curC" class="curCon">{{curC}}</li>
          <li v-if="!curC" class="conItem" v-for="(c,cid) in conList" :key="cid">{{c}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "FourTabs",
      data(){
        return{
          curC:'',
          isCurClass:0
        }
      },
      props:{
        tabList:{
          type:Array,
          default(){
            return ['tab1', 'tab2', 'tab3', 'tab4','tab5', 'tab6', 'tab7', 'tab8',]
          }
        },
        conList:{
          type:Array,
          default(){
            return ['con1', 'con2','con3','con4','con5','con6','con7','con8']
          }
        },
        direction:{
          type:String,
          default(){
            return ''
          }
        },
      },
      methods:{
        curCon(id){
          let temp = this.isCurClass;
          this.isCurClass = id;
          if(temp === this.isCurClass) return
          this.$emit('fClick',id)
          if(this.conList){
            this.conList.filter((item,cid) =>{
              if(cid===id){
                return this.curC = item
              }
            })
          }
        }
      }
    }
</script>

<style lang="stylus">
  .tabWrapper
    position: relative
    width: 100%
    height:50%
    max-height: 600px
    background: #f4f5f6
    overflow: hidden
    display: flex
  .tabList::-webkit-scrollbar
    display: none;
  .tabList
    position: relative
    flex: 0 0 80px
    height: 100%
    border-right: 1px solid #ccc
    overflow-y: auto
    li
      text-align: center
      line-height:44px
      border-bottom:1px solid #eee
      &.curLi
        color: #ffffff
        background:yellowgreen
  .con::-webkit-scrollbar
    display: none;
  .con
    position: relative
    flex:1
    height: 100%
    overflow: auto
    ul
      height: 120%
      padding:10px 14px
      li
        height: 100%
        width: 100%

</style>
