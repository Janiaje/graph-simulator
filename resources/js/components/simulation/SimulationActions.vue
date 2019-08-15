<template>
    <!-- TODO: out from the window on xs-12 => media => right 20px -->
    <div id="simulation-actions" class="col-xl-3 col-md-4 col-md-4 col-sm-6 col-xs-12">
        <div class="row">
            <div class="col-3">
                <button type="button" class="btn btn-default" @click="stop">
                    <font-awesome-icon icon="times"/>
                </button>
            </div>
            <div class="col-9">
                <button type="button" class="btn text-display-button">
                    Step: {{ currentStep }} / {{ maxStep }}
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <button type="button" class="btn btn-default" @click="slower">
                    <font-awesome-icon icon="minus"/>
                </button>
            </div>
            <div class="col-4">
                <button type="button" class="btn text-display-button">
                    Speed: {{ speed }}
                </button>
            </div>
            <div class="col-4">
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
                    <font-awesome-icon icon="play" v-if="!playing"/>
                    <font-awesome-icon icon="pause" v-if="playing"/>
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
                speed: 1,
                maxSpeed: 10,
                minSpeed: 1,
                speedStepMS: 1000,

                interval: undefined,
                intervalHandler: () => mainDisplayedGraph.simulation.nextStep(this.speed),

                playing: false,
                pauseListener: () => this.pause(),

                currentStep: 0,
                maxStep: 0,
                stepChangedListener: data => {
                    this.currentStep = data.currentStep;
                    this.maxStep = data.maxStep;
                }
            }
        },

        methods: {
            _setInterval() {
                this.interval = setInterval(this.intervalHandler, 500);
            },

            _clearInterval() {
                this.interval = clearInterval(this.interval);
            },

            _restartInterval() {
                this._clearInterval();
                this._setInterval();
            },

            slower() {
                if (this.speed <= this.minSpeed) {
                    return;
                }

                this.speed--;
            },

            faster() {
                if (this.speed >= this.maxSpeed) {
                    return;
                }

                this.speed++;
            },

            playPause() {
                if (this.playing) {
                    this.pause();
                    return;
                }

                this.play();
            },

            play() {
                this.playing = true;

                mainDisplayedGraph.physicsAllowed(false);

                this._setInterval();
            },

            pause() {
                this.playing = false;

                mainDisplayedGraph.physicsAllowed(true);

                this._clearInterval();
            },

            stop() {
                mainDisplayedGraph.simulation = undefined;
                eventHub.$emit('simulation-stopped');
            }
        },

        watch: {
            speed: function (value) {
                this.speed = value;

                if (this.interval === undefined) {
                    return;
                }

                this._restartInterval();
            }
        },

        mounted() {
            eventHub.$on('simulation-step-changed', this.stepChangedListener);
            eventHub.$on('simulation-pause', this.pauseListener);
        },

        destroyed() {
            eventHub.$off('simulation-step-changed', this.stepChangedListener);
            eventHub.$off('simulation-pause', this.pauseListener);
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

        .col-2, .col-3, .col-4, .col-5, .col-6, .col-9 {
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
