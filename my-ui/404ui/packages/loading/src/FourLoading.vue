<template>
  <div class="line-spin-fade-loader">
   <div v-for="(i,inedx) in arr" :key="inedx" :style="'backgroundColor:'+color"></div>
  </div>
</template>

<script>
    export default {
        props:["color"],
        name: "FourLoading",
        data(){
          return{
            arr:[1,2,3,4,5,6,7,8]
          }
        }
    }
</script>

<style scoped lang="stylus">
  .line-spin-fade-loader {
    position: relative;
    transform: scale(1);
    left 50px
    top 30px
  }
  .line-spin-fade-loader > div:nth-child(1) {
    top: 20px;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(2) {
    top: 13.63636px;
    left: 13.63636px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 20px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.60s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.60s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(4) {
    top: -13.63636px;
    left: 13.63636px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(5) {
    top: -20px;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(6) {
    top: -13.63636px;
    left: -13.63636px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -20px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
  }

  .line-spin-fade-loader > div:nth-child(8) {
    top: 13.63636px;
    left: -13.63636px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
  }

  .line-spin-fade-loader > div {
    background-color: #1487FF;
    width: 2px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    width: 5px;
    height: 15px;
  }

  @-webkit-keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
</style>
