<template>
    <div class="userinfodiv">
        <h2 class="productlistlabel">Inventory</h2>
        <b-table class="productlist" striped hover :items="user.products" :fields="fields" primary-key="id">
            <!-- <template v-slot:cell(sell)="{ item }">
                <span><b-btn v-if="canSell(item)" @click="sellItem(item)">sell</b-btn></span>
                
            </template> -->
            
        </b-table>
</div>
</template>


<script setup>
import { drugDataStore } from '@/datastore';

</script>

<script>

export default {
    name:"city-info",
    props: {
        'user':Object,
        
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

            this.drugStore.sellProduct(this.user, item.id, qty, item.price)
            
            console.log(item.id);
        },
    },
   
    data() {
        return {
        drugStore: drugDataStore(),
        fields:[
        
            {key:"name", sortable: true, tdClass:"text"},
            {key:"quantity", sortable: true, tdClass:"price", label:"Quantity Available"},
            {key:"sell"},
            
        ],
        }
    }
}
</script>

<style>
.productlistlabel {
    text-align: left;
    font-size: 1em;
}
.productlist {
    width: 75%;
}
.citydiv {
    border: 1px solid black;
    box-shadow: 10px 10px;
    margin: 40px;
    padding: 10px;
    width: 50%;
    font-family: 'Courier New', Courier, monospace;
}

.cityname {
    text-align: left;
    font-size: 2em;
}
</style>
