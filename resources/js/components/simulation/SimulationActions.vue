<template>
    <!-- TODO: out from the window on xs-12 -->
    <div id="simulation-actions" class="col-xl-3 col-md-4 col-md-4 col-sm-6 col-xs-12">
        <div class="row">
            <div class="col-3">
                <button type="button" class="btn btn-default" onclick="mainDisplayedGraph.simulation.stop()">
                    <font-awesome-icon icon="times"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" @click="slower">
                    <font-awesome-icon icon="minus"/>
                </button>
            </div>
            <div class="col-5">
                <button type="button" class="btn text-display-button">
                    Speed: {{ speed }}
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" @click="faster">
                    <font-awesome-icon icon="plus"/>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-2 col-md-offset-1">
                <button type="button" class="btn btn-default" onclick="mainDisplayedGraph.simulation.firstStep()">
                    <font-awesome-icon icon="fast-backward"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" onclick="mainDisplayedGraph.simulation.previousStep()">
                    <font-awesome-icon icon="step-backward"/>
                </button>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-default" @click="playPause">
                    <font-awesome-icon icon="play" v-if="!play"/>
                    <font-awesome-icon icon="pause" v-if="play"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" onclick="mainDisplayedGraph.simulation.nextStep()">
                    <font-awesome-icon icon="step-forward"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" onclick="mainDisplayedGraph.simulation.lastStep()">
                    <font-awesome-icon icon="fast-forward"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimulationActions",
        data() {
            return {
                speed: mainDisplayedGraph.simulation.speed,
                play: false,
                pausedListener: () => {
                    this.play = false;
                }
            }
        },

        methods: {
            slower() {
                mainDisplayedGraph.simulation.slower();
                this.speed = mainDisplayedGraph.simulation.speed;
            },

            faster() {
                mainDisplayedGraph.simulation.faster();
                this.speed = mainDisplayedGraph.simulation.speed;
            },

            playPause() {
                this.play = !this.play;

                if (this.play) {
                    mainDisplayedGraph.simulation.play();
                    return;
                }

                mainDisplayedGraph.simulation.pause();
            }
        },

        mounted() {
            eventHub.$on('simulation-paused', this.pausedListener);
        },

        destroyed() {
            eventHub.$off('simulation-paused', this.pausedListener);
        }
    }
</script>

<style lang="scss" scoped>
    #simulation-actions {
        position: fixed;
        top: 65px;
        left: 10px;
        z-index: 955;

        padding: 0 15px;

        overflow: hidden;

        outline: 0;

        /*border: 1px rgba(0, 0, 0, 0.25) solid;*/
        border-radius: 15px;

        box-shadow: inset 0 0 0.4rem rgba(0, 0, 0, 0.25);
        background: white;

        .col-2, .col-3, .col-4, .col-5, .col-6 {
            padding: 0;
        }
    }

    button, button:focus {
        width: 100%;
        height: 100%;

        box-shadow: inset 0 0 0.4rem rgba(0, 0, 0, 0.25);
        /*border: 1px rgba(0, 0, 0, 0.25) solid;*/
        border-radius: 0;

        outline: none;
    }

    button.btn-default:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    button.btn-default:active {
        background: rgba(0, 0, 0, 0.15);
    }

    .text-display-button {
        cursor: unset !important;
    }
</style>
