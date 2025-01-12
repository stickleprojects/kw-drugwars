<template>
  <div id="app">
    <GamePlaySingleCity />
  </div>
</template>

<script>
import GamePlaySingleCity from './components/GamePlaySingleCity.vue';


export default {
  name: 'App',
  components: {
    GamePlaySingleCity
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
  margin-top: 60px;
}
</style>
