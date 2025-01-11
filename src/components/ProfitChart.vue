<template>
  <div>
    <b-card title="profits">
      <b-container class="profitChart">
        <vline :data="data" :options="options" />
      </b-container>

    </b-card>

  </div>

</template>


<script setup>
import { drugDataStore } from '@/datastore';
import { Line as vline } from 'vue-chartjs';
import { CategoryScale, Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
)
</script>

<script>

const store = drugDataStore();

const storeData = storeToRefs(store);

const data = computed(() => ({
  labels: [...Array(storeData.balance_data.value.length).keys()],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: storeData.balance_data.value.map(x => x.balance)
    }
  ]
}))

const options = {
  responsive: true,
  maintainAspectRatio: false
}
export default {
  name: "city-info",
  props: {
    'user': Object,

  },
  components: {
    vline
  }
}
</script>

<style>
.profitChart {
  height: 150px;
  display: block;
}
</style>
