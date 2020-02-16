<template>
    <div id="simulation-chart" class="inner-window" v-show="show">
        <div id="simulation-chart-inside">
            <div id="apexChart"></div>
        </div>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';

    export default {
        name: "SimulationDiagram",
        data() {
            return {
                chart: null,
                show: false,
                showCallback: () => {
                    this.show = mainDisplayedGraph.simulation.displayLineChart();
                },
                hideCallback: () => {
                    this.show = false;
                },

                options: {
                    chart: {
                        id: 'simulation-chart-vuechart',
                        toolbar: {
                            show: false,
                            // TODO: zoom and other options
                        }
                    },
                    series: [],
                },
                stepChangedListener: (data) => {
                    this.chart.updateSeries(data.series);
                }
            }
        },

        mounted() {
            eventHub.$on('simulation-loaded', this.showCallback);
            eventHub.$on('simulation-ended', this.hideCallback);
            eventHub.$on('simulation-step-changed', this.stepChangedListener);

            this.chart = new ApexCharts(document.querySelector("#apexChart"), this.options);
            this.chart.render();
        },

        destroyed() {
            eventHub.$off('simulation-loaded', this.showCallback);
            eventHub.$off('simulation-ended', this.hideCallback);
            eventHub.$off('simulation-step-changed', this.stepChangedListener);

            this.chart.destroy()
        }
    }
</script>

<style lang="scss" scoped>
    #simulation-chart {
        top: 186px;
    }

    #simulation-chart-inside {
        margin-left: -15px;
        margin-bottom: -15px;
    }
</style>
