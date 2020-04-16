<template>
    <div :id="randomUniqueId"></div>
</template>

<script>
    import ApexCharts from "apexcharts";
    import Tools from "../graph/Tools";
    import ApexChartDefaultOptions from "./ApexChartDefaultOptions";

    export default {
        name: "ApexChart",
        props: {
            options: {
                default: () => {
                    return ApexChartDefaultOptions.lineChart();
                }
            },
            series: {
                required: true
            },
        },

        data() {
            let randomUniqueId = 'chartId-' + Date.now() + '-' + Tools.randomIntBetween(1, 1000);

            return {
                randomUniqueId: randomUniqueId,
                chart: null,
            }
        },

        mounted() {
            let options = this.options;
            options.series = this.series;

            let domElement = document.querySelector('#' + this.randomUniqueId);
            this.chart = new ApexCharts(domElement, options);
            this.chart.render();
        },

        watch: {
            series() {
                this.chart.updateSeries(this.series);
            },
        },

        destroyed() {
            this.chart.destroy();
        }
    }
</script>

<style scoped>

</style>
