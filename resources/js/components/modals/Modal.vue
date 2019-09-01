<template>
    <div
        :id="id"
        ref="modal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="id + 'ModalLabel'"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header" v-show="$slots.header">
                    <h4 class="modal-title" :id="id + 'ModalLabel'">
                        <slot name="header"></slot>
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-show="$slots.body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer" v-show="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            id: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                modal: null,
                events: [
                    'show.bs.modal',
                    'shown.bs.modal',
                    'hide.bs.modal',
                    'hidden.bs.modal'
                ]
            }
        },

        methods: {
            show() {
                this.modal.modal('show');
            },

            hide() {
                this.modal.modal('hide');
            },

            eventCallback(event) {
                this.$emit('modal-' + event.type);
            }
        },

        mounted() {
            this.modal = $(`#${this.id}`);

            this.events.forEach(event => {
                this.modal.on(event, this.eventCallback);
            });

            this.$parent.$on('show', this.show);
            this.$parent.$on('hide', this.hide);
        },

        destroyed() {
            this.events.forEach(event => {
                this.modal.off(event, this.eventCallback);
            });

            this.$parent.$off('show', this.show);
            this.$parent.$off('hide', this.hide);
        }
    }
</script>

<style scoped>
    .modal-body {
        padding-bottom: 0;
    }
</style>
