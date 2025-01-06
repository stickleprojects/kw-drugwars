<template>
  <div class="hello">
    <h1>Welcome {{ store.user.name }}</h1>
    <h2>Balance {{ store.user.balance }} {{ store.user.currency }}</h2>
    <div>
      <div v-for="city in store.cities" v-bind:key="city.name">
        <City :city="city" :user="store.user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { drugDataStore } from '@/datastore';

const store = drugDataStore();
</script>
<script>
import City from './City.vue';


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    City,
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.price {
  text-align: right;
  
}
.text {
  text-align: left;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
