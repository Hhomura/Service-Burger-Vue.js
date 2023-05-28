<template>
      <NavBar :src="src" :alt="alt"/>
  <RouterView />
      <Footer/>  
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

</script>

<script lang="ts">

export default{
  data(){
    return{
      src: "/public/img/logo.png" ,
      alt:"Make your Burger",
    }
  }
}

</script>

<style>

*{
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


.main-container{
  margin: 50px;
  min-height: 250px;
}

h1{
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: black;
}

</style>
