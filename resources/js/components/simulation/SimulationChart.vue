<template>
    <div id="simulation-chart" class="inner-window" v-show="show">
        <div id="simulation-chart-inside">
            <apexchart width="500" type="line" :width="'100%'" :options="options" :series="series"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimulationDiagram",
        data() {
            return {
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
                    }
                },
                series: [],
                stepChangedListener: (data) => {
                    this.series = data.series;
                }
            }
        },

        mounted() {
            eventHub.$on('simulation-loaded', this.showCallback);
            eventHub.$on('simulation-ended', this.hideCallback);
            eventHub.$on('simulation-step-changed', this.stepChangedListener);
        },

        destroyed() {
            eventHub.$off('simulation-loaded', this.showCallback);
            eventHub.$off('simulation-ended', this.hideCallback);
            eventHub.$off('simulation-step-changed', this.stepChangedListener);
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
