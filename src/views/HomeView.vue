<template>
      <Banner />
    <div class="main-container">
      <h1>Monte o seu Burger</h1>
      <BurgerForm/>
    </div>
</template>

<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import BurgerForm from '@/components/BurgerForm.vue';

</script>

<script lang="ts">
export default {
  components: {
    Banner,BurgerForm
  },
};
</script>



