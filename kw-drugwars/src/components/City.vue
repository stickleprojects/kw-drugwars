<template>
    <div class="citydiv">
        <h1 class="cityname">{{city.name}}</h1>
        <h2 class="productlistlabel">Products & Prices</h2>
        <b-table class="productlist" striped hover :items="city.products" :fields="fields" primary-key="id">
            <template v-slot:cell(buy)="{ item }">
                <span><b-btn @click="buyItem(item)">buy</b-btn></span>
                
            </template>
           
        </b-table>
</div>
</template>

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

<script>

export default {
    name:"city-info",
    props: {
        
        'user': {
            name: String,
            balance: Number
        },
        'city': {
            name: String,
            products:[
                {id: String, name: String, price: Number, quantity:Number}
            ]
        }
    },
    methods: {
        buyItem(item) {
            let x=prompt("how many");
            var qty = parseInt(x);
            if(isNaN(qty)) {
                return;
            }
            console.log("buying %d items", qty);

            if(qty > item.quantity) {
                alert("thats too many, we only have " + item.quantity +" available!");
                return;
            }

            const total =qty * item.price;
            if(total > this.user.balance) {
                alert("Sorry " + this.user.name +", but you cant afford that, its " + total +" and you only have " + this.user.balance);
                return;
            }
            console.log(item.id);
        }
    },
    data() {
        return {
        
        fields:[
        
            {key:"name", sortable: true, tdClass:"text"},
            {key:"quantity", sortable: true, tdClass:"price", label:"Quantity you can buy"},
            {key:"price", sortable: true, tdClass:"price"},
            {key:"buy", sortable: true, tdClass:"price"},
            
        ],
        }
    }
}
</script>