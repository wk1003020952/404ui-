<template>
  <div class="address">
    <div class="form">
      <div class="inputbox" v-if="formInfo" v-for="(f,fid) in formInfo" :key="fid">
        <span class="lable">{{f.label}}</span><input class="inputC" v-model="f.inputValue" :placeholder="f.placeholderTxt">
      </div>
    </div>
    <div v-if="showDefAdd" class="defAdd">
      <span>设为默认收货地址</span>
      <four-switch @change="changeDetail"></four-switch>
    </div>
    <div class="btns">
      <button class="btn saveBtn" @click.prevent="saveEvent">{{saveBtnTxt}}</button>
      <button class="btn delBtn" @click.prevent="delEvent">{{delBtnTxt}}</button>
    </div>
  </div>
</template>

<script>
  import FourSwitch from '../switch/index'
    export default {
      name: "FourAddressEdit",
      data(){
        return{
        }
      },
      props:{
        formInfo:{
          type:Array,
          default(){
              return [
                {label:'姓名',placeholderTxt: '收货人姓名',inputValue: '里斯'},
                {label:'电话',placeholderTxt: '收货人手机号',inputValue: '13544463324'},
                {label:'地区',placeholderTxt: '选择省市区',inputValue: '陕西省西安市高新区'},
                {label:'详细地址',placeholderTxt: '街道门牌、楼层房间号等信息',inputValue: '绿港22号楼3101'},
                {label:'邮政编码',placeholderTxt: '邮政编码',inputValue: '009900'},
              ]
          }
        },
        inputType:{
          type:String,
          default:'text',
        },
        saveBtnTxt:{
          type:String,
          default(){
            return '保存'
          }
        },
        delBtnTxt:{
          type:String,
          default(){
            return '删除'
          }
        },
        showDefAdd:{
          type:Boolean,
          default:true
        }
      },
      methods:{
        handleInputType(val){
          if(val === 'range' || !this.$refs.input) return;
          this.$refs.input.type = val;
        },
        saveEvent(){
          this.$emit('save',this.formInfo)
        },
        delEvent(){
          this.$emit('delete',this.formInfo);
        },
        changeDetail(a){
          console.log(this.formInfo)
          this.$emit('change',[a,this.formInfo])
        }
      },
      watch:{
        inputType(val){
          this.handleInputType(val)
        }
      },
      components:{FourSwitch}
    }
</script>

<style lang="stylus">
.address
  background: #f6f5f4
  height 100%
.form
  width: 100%
  margin-top: 10px
  padding-left:20px
  background: #fff
.inputbox
  width: 100%
  display: flex
  align-items center
  line-height:44px
  border-bottom:1px solid #eee
  font-size:16px
  .lable
    flex: 1
  .inputC
    flex:3
.defAdd
  padding:0  20px
  margin-bottom 10px
  line-height:45px
  background: #fff
  display: flex
  justify-content: space-between
  align-items center
.btns
  width: 100%
  display: flex
  flex-direction:column
  justify-content center
.btn
  width: 90%
  height:40px
  border-radius 3px
  background: #fff
  margin:10px auto
  font-size:16px
.saveBtn
  background: #f40
  color #fff
.delBtn
  border 1px solid #ebedf0
</style>
