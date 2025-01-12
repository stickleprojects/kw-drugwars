<template>
    <b-card v-bind:title="city.name" class="shadow p-3 mb-5 bg-white rounded">

        <h2 class="productlistlabel">Products & Prices</h2>
        <b-table class="productlist" striped hover :items="city.products" :fields="fields" primary-key="id">
            <template v-slot:cell(buy)="{ item }">
                <span><b-btn @click="buyItem(item)">buy</b-btn></span>

            </template>
            <template v-slot:cell(sell)="{ item }">
                <span><b-btn v-if="canSell(item)" @click="sellItem(item)">sell</b-btn></span>

            </template>

        </b-table>
        <h2 class="productlistlabel">Destinations from here</h2>
        <b-table class="destinationList" :items="city.destinations" :fields="destinationFields" primary-key="city">
            <template v-slot:cell(goto)="{ item }">
                <span><b-btn @click="gotoCity(item)">travel to here</b-btn></span>

            </template>
        </b-table>
    </b-card>
</template>


<script setup>
import { drugDataStore } from '@/datastore';

</script>

<script>

export default {
    name: "city-info",
    props: {
        'user': Object,
        'city': Object

    },
    methods: {
        canSell(item) {
            return this.drugStore.canSell(this.user, item.id);
        },
        sellItem(item) {
            let x = prompt("how many");
            var qty = parseInt(x);
            if (isNaN(qty)) {
                return;
            }
            console.log("selling %d items", qty);

            this.drugStore.sellProduct(this.user, this.city, item.id, qty);

            console.log(item.id);
        },
        gotoCity(dest) {
            console.log(dest);
            this.drugStore.moveToCity(dest.name);
        },
        buyItem(item) {
            let x = prompt("how many");
            var qty = parseInt(x);
            if (isNaN(qty)) {
                return;
            }
            console.log("buying %d items", qty);

            this.drugStore.buyProduct(this.user, this.city, item.id, qty);


            console.log(item.id);
        }
    },

    data() {
        return {
            drugStore: drugDataStore(),
            fields: [

                { key: "name", sortable: true, tdClass: "text" },
                { key: "quantity", sortable: true, tdClass: "price", label: "Quantity Available" },
                { key: "price", sortable: true, tdClass: "price" },
                { key: "buy" },
                { key: "sell" },

            ],
            destinationFields: [
                { key: 'name', sortable: true, tdClass: "text" },
                { key: 'distance', sortable: true, tdClass: "number" },
                { key: "goto" }
            ]
        }
    }
}
</script>

<style>
.productlistlabel {
    text-align: center;
    font-size: 0.8em;
    background-color: beige;
    border-top: 1px solid black;
}


.citydiv {
    border: 1px solid black;
    box-shadow: 10px 10px;
    margin: 10px;
    padding: 10px;
    font-family: 'Courier New', Courier, monospace;
}

.cityname {
    text-align: left;
    font-size: 2em;
}

.b-table {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.8em;

}

.b-table button {
    font-size: 1em;
    padding: 0.1em 3em
}
</style>
