<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #434343;
  margin-top: 60px;
}

.fa-user {
  color: white;
}

.logo {
  height: 40px;
  position: relative;
  top: -3px;
}

.navbar-brand {
  font-size: 1.7em;
}

.brand-bar {
  position: relative;
  top: -3px;
}


</style>
