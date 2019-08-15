<template>
    <div id="modal-container" :style="{ display: show ? 'block' : 'none' }">
        <font-awesome-icon id="spinner" icon="spinner" class="fa-spin fa-7x fa-inverse" style="text-align: center"/>
    </div>
</template>

<script>
    export default {
        name: "LoadingModal",
        data() {
            return {
                show: false,
                showCallback: () => {
                    // TODO: fixme why its not shown
                    console.log('showCallback');
                    this.show = true;
                },
                hideCallback: () => {
                    console.log('hideCallback');
                    this.show = false;
                },
            };
        },

        mounted() {
            eventHub.$on('loading-show', this.showCallback);
            eventHub.$on('loading-hide', this.hideCallback);
        },

        destroyed() {
            eventHub.$off('loading-show', this.showCallback);
            eventHub.$off('loading-hide', this.hideCallback);
        }
    }
</script>

<style lang="scss" scoped>
    h2 {
        margin: 5px 0 0;
    }

    #modal-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1051;
        width: 100%;
        height: 100%;
        outline: 0;

        overflow: hidden;
        overflow-y: auto;

        transition: opacity 0.15s linear;

        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

        text-align: center;
    }

    #spinner {
        position: relative;
        top: calc(50% - 36px);
    }
</style>
