<template>
  <div :style="styl">
    <div class="tit">
      <ul class="flex titlist">
        <li class="blue"><</li>
        <li>Addresslist</li>
        <li><img ></li>
      </ul>
    </div>
    <h3 class="he">基础用法</h3>
    <div class="con">
      <ul>
        <li v-for="(p,i) in addressInfo" class="flex" @click="bian(i)" ref="bians">
          <div><p class="aa"></p></div>
          <div><span>{{p.name}}</span><span>{{p.phone}}</span><p>{{p.dizhi}}</p></div>
          <div><img ></div>
        </li>
      </ul>
      <div class="foot">
        <input type="button" value="新增地址" class="int1" @click="show">
      </div>
      <div class="fl" v-if="di" ref="dd">新增地址</div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Addresslist",
      props:{
          addressInfo:{
            type:Array,
            default(){
              return [
                {name:"张三",phone:"13134141421",dizhi:"浙江省杭州市西湖区文三路 138号 东方通信大厦 7 楼 501 室"},
                {name:"李四",phone:"131541421",dizhi:"浙江省杭州市西湖区文三路 138号 东方通信大厦 7 楼 501 室"}
              ]
            }
          }
      },
      data(){
        return{
          styl:"height: 100%;width: 100%",
          di:false,
        }
      },
      methods:{
        bian(i){
          var a = i
          this.$refs.bians[i].style.background = "#ccc"
          this.$emit('aaa',i)
          setTimeout((i)=> {
            this.$refs.bians[a].style.background = "#fff"
          },100)
        },
        show() {
          this.di=true,
            setTimeout(()=>{
              this.di=false
            },200)
        }
      }
    }
</script>

<style scoped>
  .fl{background: #666666;position: relative;color: white;top: 50%;left: 90%;padding: 5px;border-radius: 2px}
  .foot{width: 100%;height: 100%;}
  .tit{width: 100%;height: 70px;line-height: 70px}
  .flex{height:100%;width: 100%;display: flex;}
  .blue{color: #00B7FF;
    padding: 0;}
  *{font-size: 16px;color: #333333;font-weight: 200}
  .titlist li:nth-child(1){width: 30px}
  .titlist li:nth-child(2){flex: 1;text-align: center}
  .titlist li:nth-child(3){width: 60px}
  .titlist li:nth-child(3) img{margin: 0 auto;padding-top: 20px}
  .he{padding-left: 20px;background: #ececec;height: 50px;line-height: 50px}
  .con ul{width: 100%;margin: 0 auto}
  .con li div:nth-child(1){width: 40px;padding-left: 10px}
  .con li div:nth-child(2){flex: 1}
  .con li div:nth-child(3){width: 30px}
  .con li:nth-child(3) img{margin-top: 20px}
  .con li{height: 80px;line-height: 40px;padding-bottom: 10px}
  p{line-height: 20px}
  .aa{border: 1px solid #ccc;border-radius: 50%;width: 15px;height: 15px;margin-top:30px }
  .foot{position: fixed;top:530px;width: 100%;height: 60px }
  .int1{width:100%;height: 100%;background: #f44;color: #ffffff;border: 0}

</style>
