<template>
    <div id="simulation-chart" class="col-xl-3 col-md-4 col-md-4 col-sm-6 col-xs-12">
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
            eventHub.$on('simulation-step-changed', this.stepChangedListener);
        },

        destroyed() {
            eventHub.$off('simulation-step-changed', this.stepChangedListener);
        }
    }
</script>

<style lang="scss" scoped>
    #simulation-chart {
        position: fixed;
        top: 186px;
        left: 10px;
        z-index: 955;

        padding: 0;

        overflow: hidden;

        outline: 0;

        /*border: 1px rgba(0, 0, 0, 0.25) solid;*/
        border-radius: 15px;

        box-shadow: inset 0 0 0.4rem rgba(0, 0, 0, 0.25);
        background: white;
    }

    #simulation-chart-inside {
        margin-left: -15px;
        margin-bottom: -15px;
    }
</style>
