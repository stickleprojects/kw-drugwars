<template>
  <div>
    <b-card title="profits">
      <v-container class="profitChart">
        <vline :data="chartdata" :options="chartOptions" />
      </v-container>

    </b-card>

  </div>

</template>


<script setup>
import { drugDataStore } from '@/datastore';
import { Line as vline } from 'vue-chartjs';
import { CategoryScale, Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

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

      chartdata: {
        labels: ['jan', 'feb', 'mar'],
        datasets: [
          {
            label: 'data one',
            data: [40, 30, 100]
          }
        ]
      },
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: true,
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label(tooltipItems, data) {
              const { datasetIndex, index } = tooltipItems;
              const value = data.datasets[datasetIndex].data[index];
              if (parseInt(value, 10) > 999) {
                return ` ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
              }
              return ` ${value}`;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 300,
      },
    }
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
