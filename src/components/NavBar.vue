<template>
    <nav>
        <router-link to="/" id="logoUrl"> <img :src="src" id="logo" :alt="alt"></router-link>
        <routerLink to="/">Home</routerLink>
        <routerLink to="/pedidos">Pedidos</routerLink>
        <router-link to="/teste">Teste</router-link>
      </nav>
</template>

<script lang="ts">

export default{
    name:"NavBar",
    props:["src", "alt"]
}
</script>

<style scoped>
nav{
    background-color: black;
    border-bottom: 4px solid #111;
    padding:  15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#logoUrl{
    margin: auto;
    margin-left: 0;
}

#logo{
    height: 40px;
    height: 40px;
}

nav a{
    color: yellow;
    text-decoration: none;
    margin: 12px;
    transition: .5s;

}

nav a:hover{
    color: white;
}


</style>