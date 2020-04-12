<template>
    <mdb-view>
      <mdb-mask class="gradient d-flex justify-content-center align-items-center" >
        <navbar/>
        <router-view/>
      </mdb-mask>
    </mdb-view>
</template>

<script>
  import {  mdbView, mdbMask } from 'mdbvue';
  import navbar from './Navbar';

  export default {
    name: 'app',
    components: {
      mdbView,
      mdbMask,
      navbar,
    }
  }
</script>

<style scoped>

  .view {
    background-image: url('https://mdbootstrap.com/img/Photos/Others/architecture.jpg');
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