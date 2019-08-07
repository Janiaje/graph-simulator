<template>
    <div id="simulation-diagram" class="col-xl-3 col-md-4 col-md-4 col-sm-6 col-xs-12">
        <div id="simulation-diagram-inside">
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
                        id: 'simulation-diagram-vuechart',
                        toolbar: {
                            show: false,
                            // TODO: zoom and other options
                        }
                    }
                },
                series: [],
                stepChangedListener: (series) => {
                    // TODO: catch first call on simulation start
                    this.series = series;
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
    #simulation-diagram {
        position: fixed;
        top: 149px;
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

    #simulation-diagram-inside {
        margin-left: -15px;
        margin-bottom: -15px;
    }
</style>
