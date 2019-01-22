<template>
    <div>
        <input type="button"
               :value="value?value:move1"
               :class="size?size:move2"
               :style="{color:col?col:move3, background:bg?bg:move4}">
    </div>
</template>

<script>
    export default {
        name: "FourButton",
        props:{
            value:String,
            size:String,
            col:String,
            bg:String
        },
        data(){
            return{
                move1:"默认",
                move2:"small",
                move3:"white",
                move4:"#ccc"
            }
        },
        methods:{
            button(){

            }
        },
        mounted(){
        }

    }
</script>

<style scoped>
   input{
     border: none;
     border-radius: 3px;
     font-size: 16px;
   }
  .big{
    width: 120px;
    height: 45px;
  }
   .normal{
     width: 80px;
     height: 45px;
   }
   .small{
     width: 60px;
     height: 45px;
   }
</style>
