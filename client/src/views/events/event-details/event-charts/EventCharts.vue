<script setup>
import { computed } from 'vue';

const props = defineProps({
    likesList: {
        type: Array,
        required: true,
    },
    buysList: {
        type: Array,
        required: true,
    },
    ticketsLeft: {
        type: Number,
        required: true,
    }
});

const totalLikes = computed(() => props.likesList.length);
const totalBuys = computed(() => props.buysList.length);
const totalCount = computed(() => props.ticketsLeft + totalBuys.value - 1);

const chartSeries = computed(() => {
    const total = totalCount.value + totalBuys.value;
    const totalPercentage = Number(((totalCount.value / total) * 100).toFixed(1));
    const buysPercentage = Number(((totalBuys.value / total) * 100).toFixed(1));
    return [totalPercentage, buysPercentage];
});


const chartOptions = {
    chart: { type: 'pie' },
    colors: ['#e60a15', 'silver'],
    labels: ['Tickets', 'Buys'],
    legend: { position: 'bottom' },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: { width: '100%' },
                legend: { position: 'bottom' },
            },
        },
    ],
};


const chartSeries2 = computed(() => {
    const total = totalLikes.value + totalBuys.value;
    const likesPercentage = Number(((totalLikes.value / total) * 100).toFixed(2));
    const buysPercentage = Number(((totalBuys.value / total) * 100).toFixed(2));
    return [likesPercentage, buysPercentage];
});

const chartOptions2 = {
    colors: ['orange', '#e60a15'],
    labels: ['Likes', 'Buys'],
    legend: { position: 'bottom' },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: { width: '100%' },
                legend: { position: 'bottom' },
            },
        },
    ],
};


const chartSeries3 = computed(() => [
    {
        name: 'Total Count',
        data: [totalLikes.value, totalBuys.value, totalCount.value],
    },
]);

const chartOptions3 = {
    chart: { type: 'bar', background: '' },
    xaxis: { categories: ['Likes', 'Buys', 'Tickets'] },
    yaxis: { title: { text: 'Total Count' } },
    colors: ['#e60a15', 'grey'],
    //   title: { text: 'Likes vs Buys Bar Chart' }, //TODO add some good names and eventually remove h3's?
    legend: { position: 'bottom' },

};


const buyingPower = computed(() => {
    if (totalLikes.value === 0) return 100;
    const ratio = (totalLikes.value / totalBuys.value) * 100;
    return Number(ratio.toFixed(2));
});


const chartSeries4 = computed(() => [buyingPower.value]);

const chartOptions4 = {

    colors: ['#e60a15'],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: '70%',

            },
            dataLabels: {
                showOn: 'always',
                name: {
                    offsetY: -10,
                    show: true,
                    color: 'red',
                    fontSize: '14px',
                },
                value: {
                    color: '#111',
                    fontSize: '30px',
                    show: true,
                    formatter: () => `${buyingPower.value}%`,
                },
            },
        },
    },
    stroke: {
        lineCap: 'round',
    },
    labels: ['Buying Power %'],
};
</script>


<template>
    <div id="charts" class="charts">

        <div>
            <h3>Likes vs Buys vs Tickets</h3>
            <apexchart type="bar" :options="chartOptions3" :series="chartSeries3" :height="225" />
        </div>

        <div>
            <h3>Buys vs Likes</h3>
            <apexchart type="donut" :options="chartOptions2" :series="chartSeries2" :height="245" />
        </div>

        <div>
            <h3>Tickets vs Buys</h3>
            <apexchart type="pie" :options="chartOptions" :series="chartSeries" :height="245" />
        </div>

        <div>
            <h3>Buying expectancy</h3>
            <apexchart type="radialBar" :options="chartOptions4" :series="chartSeries4" :height="245" />
        </div>


    </div>
</template>

<style scoped>
.charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    text-transform: uppercase;
    background: white;
    width: 100%;
    align-items: center;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 12px;
    padding-top: 20px;
    padding-bottom: 20px;
}

.charts h3 {
    padding-bottom: 10px;
    text-align: center;
    color: black;
}
/* h3 ~ *:first-of-type{

} */
</style>
