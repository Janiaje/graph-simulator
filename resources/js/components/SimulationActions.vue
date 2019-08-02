<template>
    <div id="simulation-actions" class="col-xl-2 col-md-3 col-sm-3 col-xs-12">
        <div class="row">
            <div class="col-3">
                <button type="button" class="btn btn-default" @click="slower">
                    <font-awesome-icon icon="minus"/>
                </button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-default .text-display-button">
                    Speed: {{ speed }}
                </button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-default" @click="faster">
                    <font-awesome-icon icon="plus"/>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-2 col-md-offset-1">
                <button type="button" class="btn btn-default" @click="$emit('firstStep')">
                    <font-awesome-icon icon="fast-backward"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" @click="$emit('previousStep')">
                    <font-awesome-icon icon="step-backward"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" @click="play = !play">
                    <font-awesome-icon icon="play" v-if="!play"/>
                    <font-awesome-icon icon="pause" v-if="play"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" @click="$emit('nextStep')">
                    <font-awesome-icon icon="step-forward"/>
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-default" @click="$emit('lastStep')">
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
                speed: 5,
                play: false,
            }
        },

        methods: {
            faster() {
                if (this.speed >= 10) {
                    return;
                }

                this.speed++;
            },

            slower() {
                if (this.speed <= 1) {
                    return;
                }

                this.speed--;
            },
        },

        watch: {
            speed: function (value) {
                this.$emit('speedChanged', value);
            },

            play: function (value) {
                if (value) {
                    this.$emit('start');
                    return;
                }

                this.$emit('stop');
            },
        }
    }
</script>

<style lang="scss" scoped>
    #simulation-actions {
        position: fixed;
        top: 65px;
        left: 10px;
        z-index: 955;

        padding: 0;

        overflow: hidden;

        outline: 0;

        /*border: 1px rgba(0, 0, 0, 0.25) solid;*/
        border-radius: 20px;

        box-shadow: inset 0 0 0.4rem rgba(0, 0, 0, 0.25);
        background: white;

        .col-2, .col-3, .col-4, .col-6 {
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

    .text-display-button {
        cursor: initial !important;
    }


</style>
