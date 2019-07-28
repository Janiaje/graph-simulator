<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id + 'ModalLabel'"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="id + 'ModalLabel'">
                        <slot name="header"></slot>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer" v-if="showFooter">
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
            },
            showFooter: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped>

</style>
