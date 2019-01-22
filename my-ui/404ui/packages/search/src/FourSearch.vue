<template>
  <div  class="headerWrap">
    <div class="hbtm hBg">
      <div class="searchBox">
        <i v-if="iconSearch" :class="`iconfont ${iconSearch}`"></i>
        <input v-if="searchList" type="text" @input="isshow(keyword)"  v-model="keyword" :placeholder="placeholderTxt">
      </div>
    </div>
    <div ref="search" v-show="keyword"  class="search-content">
      <ul>
        <li v-for="(item,id) in list" :key="id" @click="curClick(item)" class="search-item border-btm">
          <span>{{item}}</span>
        </li>
        <li v-show="noData" class="search-itme border-btm">
          没有找到匹配数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name:"FourSearch",
      data() {
        return {
          keyword: '',//获取文本框的值
        }
      },
      props: {
        searchList: Array,
        placeholderTxt:{type:String,default:'输入关键词'},
        iconSearch:String,
      },
      created(){
      },
      methods: {
        curClick(c){
          this.$emit('curClick',c)
        },
        isshow(a){
          this.$emit("show",a)
        },
      },
      computed:{
        noData(){
          if(this.list){
            return !this.list.length
          }
        },
        list(){
          if(!this.searchList) return;
          let result=[];
          if(this.searchList){
            result = this.searchList.filter(val=>
              val.indexOf(this.keyword)!==-1
            )
            return result
          }
        }
      }
    }
  </script>

<style scoped lang="stylus">
$hbg=linear-gradient(90deg,#0af,#0085ff);
.headerWrap
  position:relative
  width: 100%
  height 100%
  z-index:10
.hbtm
  position: absolute
  z-index:10
  top:0
  width: 100%
  height: 50px
  background: $hbg
  display: flex
  justify-content center
  align-items center
  .searchBox
    display: inline-block
    width:85%
    height:30px
    line-height: 30px
    padding-left:15px
    -webkit-border-radius: 100px
    -moz-border-radius: 100px
    border-radius: 100px
    background: #fff

    &>.iconfont
      color: #777


.search-content
  width: 100%
  height: 100%
  min-height: 400px
  position: absolute;
  top:55px
  left: 0
  ul
    width: 100%
    min-height: 110%
    background: #fff
    li
      line-height:50px
      margin-left:15px;
      background: #fff;
      color: #666
      border-bottom: 1px solid #cccccc
      span
        width: 85%
        display: inline-block

</style>
