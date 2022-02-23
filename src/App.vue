<template>
  <div id="app">
    <button @click="clear">clear</button><button @click="clearAll">clear all</button>
    <nav>
      <router-link to="/">Boolean</router-link> |
      <router-link to="/Array">Array</router-link> |
      <router-link to="/ObjectTarget">ObjectTarget</router-link> |
      <router-link to="/ObjectExclude">ObjectExclude</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import dataCache from "../util/dataCache.umd.js"
export default {
  methods: {
    clear(){
      dataCache.clear(this.$route.path);
      location.reload();
    },
    clearAll(){
      dataCache.clear();
      location.reload();
    },
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
