<template>
    <div id="simulation-actions" class="inner-window" v-show="show">
        <div class="row">
            <div class="col-3">
                <button @click="stop">
                    <font-awesome-icon icon="times"/>
                </button>
            </div>
            <div class="col-9">
                <button class="text-display-button">
                    Step: {{ currentStep }} / {{ maxStep }}
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <button @click="slower">
                    <font-awesome-icon icon="minus"/>
                </button>
            </div>
            <div class="col-4">
                <button class="text-display-button">
                    Speed: {{ speed }}
                </button>
            </div>
            <div class="col-4">
                <button @click="faster">
                    <font-awesome-icon icon="plus"/>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-2 col-md-offset-1">
                <button onclick="mainDisplayedGraph.simulation.firstStep()">
                    <font-awesome-icon icon="fast-backward"/>
                </button>
            </div>
            <div class="col-2">
                <button onclick="mainDisplayedGraph.simulation.previousStep()">
                    <font-awesome-icon icon="step-backward"/>
                </button>
            </div>
            <div class="col-4">
                <button @click="playPause">
                    <font-awesome-icon icon="play" v-if="!playing"/>
                    <font-awesome-icon icon="pause" v-if="playing"/>
                </button>
            </div>
            <div class="col-2">
                <button onclick="mainDisplayedGraph.simulation.nextStep()">
                    <font-awesome-icon icon="step-forward"/>
                </button>
            </div>
            <div class="col-2">
                <button onclick="mainDisplayedGraph.simulation.lastStep()">
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
                show: false,
                showCallback: () => {
                    // TODO: make only one toggle lambda
                    this.show = true;
                },
                hideCallback: () => {
                    // TODO: make only one toggle lambda
                    this.show = false;
                },

                speed: 1,
                maxSpeed: 10,
                minSpeed: 1,
                speedStepMS: 500,

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
                this.interval = setInterval(this.intervalHandler, this.speedStepMS);
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
                eventHub.$emit('simulation-ended');
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
            eventHub.$on('simulation-loaded', this.showCallback);
            eventHub.$on('simulation-ended', this.hideCallback);
            eventHub.$on('simulation-step-changed', this.stepChangedListener);
            eventHub.$on('simulation-pause', this.pauseListener);
        },

        destroyed() {
            eventHub.$off('simulation-loaded', this.showCallback);
            eventHub.$off('simulation-ended', this.hideCallback);
            eventHub.$off('simulation-step-changed', this.stepChangedListener);
            eventHub.$off('simulation-pause', this.pauseListener);
        }
    }
</script>

<style lang="scss" scoped>
    #simulation-actions {
        top: 65px;
    }
</style>
