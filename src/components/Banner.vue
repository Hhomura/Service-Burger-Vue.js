<template>
    <div class="main-banner">
        <h1>Make your burger</h1>
    </div>
</template>

<script lang="ts"> 
export default{
    name:"Banner"
}
</script>

<style scoped>

.main-banner{
    background-image: url('/img/burger.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.main-banner h1{
    color: white;
    margin-left: 50px;
    background: gray;
    padding: 20px;
    border-radius: 10px;
}

</style>