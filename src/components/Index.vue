<template>
    <mdb-view>
      <mdb-mask class="gradient d-flex justify-content-center align-items-center" >
        
        <router-view/>
      </mdb-mask>
    </mdb-view>
</template>

<script>
  import {  mdbView, mdbMask } from 'mdbvue';
  

  export default {
    name: 'app',
    components: {
      mdbView,
      mdbMask,
    }
  }
</script>

<style scoped>

  .view {
    background-image: url('https://images.hdqwalls.com/wallpapers/geometry-blue-abstract-4k-3y.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    height: 100vh;
  }
  .gradient {
    background: -moz-linear-gradient(45deg, rgba(42, 27, 161, 0.7), rgba(29, 210, 177, 0.7) 100%);
  }
  
</style>