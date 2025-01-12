<template>
    <div class="hello">
        <h1>Welcome {{ store.user.name }}</h1>
        <h2>Balance {{ store.user.balance }} {{ store.user.currency }}</h2>
        <div>
            <b-row>
                <b-col>
                    <b-container fluid="sm">

                        <ProfitChart :user="store.user" />
                        <UserInfo :user="store.user" />
                    </b-container>
                </b-col>
                <b-col>
                    <b-container fluid="xl">
                        <City :city="store.getCurrentCity()" :user="store.user" />

                    </b-container>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script setup>
import { drugDataStore } from '@/datastore';

const store = drugDataStore();
</script>
<script>
import City from './City.vue';
import UserInfo from './UserInfo.vue';
import ProfitChart from './ProfitChart.vue';


export default {
    name: 'GamePlay',

    components: {
        City,

    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.price {
    text-align: right;

}

.text {
    text-align: left;
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
