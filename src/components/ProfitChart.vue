<template>
<div>
<h1>line chart here</h1>
<vline :data="chartdata"/>

<h1> line chart above here</h1>
</div>

</template>


<script setup>
import { drugDataStore } from '@/datastore';
import { Line  as vline } from 'vue-chartjs';
 import { CategoryScale, Chart as ChartJS,LinearScale, PointElement, LineElement, Tooltip  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
)
</script>

<script>

export default {
    name: "city-info",
    props: {
        'user': Object,

    },
    data() {
        return {
            drugStore: drugDataStore(),

            chartdata:{
            labels:['jan','feb','mar'],
            datasets:[
                {
                    label:'data one',
                    data:[40,30,100]
                }
            ]
            }
        }
    },
    components: {
        vline
    }
}
</script>

<style></style>
