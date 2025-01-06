<template>
  <div class="hello">
    <h1>Welcome {{ user.name }}</h1>
    <h2>Balance {{ user.balance }} {{ user.currency }}</h2>
    <div>
      <div v-for="city in cities" v-bind:key="city.name">
        <City :city="city" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import City from './City.vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    City
  },
  data() {
    return {
      user: {
        name:"kieron",
        balance:214.34,
        currency:"GBP",
        products:[
          { id: 1, name: "heroin",  quantity: 23}
        ]
      },
      cities:[
      { name:"london", products:[
        { id: 1, name: "heroin", price: 23.23, quantity: 23}
      ]},
      { name:"new york", products:[
        { id: 1, name: "heroin", price: 93.23, quantity: 33},
        { id: 2, name: "coke", price: 113.23, quantity: 100},
        { id: 3, name: "peanuts", price: 116.23, quantity: 100}
      ]},
      
    ]
    }
  }
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
