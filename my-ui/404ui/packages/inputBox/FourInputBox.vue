<template>
    <div class="f-inputBox">
      <span>{{label}}</span>
      <input v-model="inputValue" :type="inputType" :placeholder="inputPlaceholder" ref="input">
    </div>
</template>

<script>
    export default {
      name: "FourInputBox",
      props:{
        inputType:{
          type:String,
          default:'text',
        },
        label:{
          type:String,
          default:'姓名'
        },
        inputPlaceholder:{
          type:String,
          default:'请输入姓名'
        },
        inputValue:{
          type:String,
          default:''
        }
      },
      methods:{
        handleInputType(val){
          if(val === 'range' || !this.$refs.input) return;
          this.$refs.input.type = val;
        }
      },
      watch:{
        inputType(val){
          this.handleInputType(val)
        }
      }
    }
</script>

<style lang="stylus">
.f-inputBox
  width: 95%
  height:44px

</style>
