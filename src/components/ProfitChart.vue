<template>
    <b-card title="Balance over time" class="shadow p-3 mb-5 bg-white rounded">


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

    },
    data() {
        return {
            drugStore: drugDataStore(),

        }
    }
}
</script>

<style></style>
