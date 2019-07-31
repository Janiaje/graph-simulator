<template>
    <div class="modal fade" :id="id" ref="modal" tabindex="-1" role="dialog" :aria-labelledby="id + 'ModalLabel'"
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
            },
            mountedCallback: {}
        },

        methods: {
            onClassChange(classAttrValue) {
                const classList = classAttrValue.split(' ');
                if (classList.includes('show')) {
                    this.mountedCallback();
                }
            }
        },

        mounted() {
            if (this.mountedCallback === undefined) {
                return;
            }

            this.observer = new MutationObserver(mutations => {
                for (const m of mutations) {
                    const newValue = m.target.getAttribute(m.attributeName);
                    this.$nextTick(() => {
                        this.onClassChange(newValue, m.oldValue);
                    });
                }
            });

            this.observer.observe(this.$refs.modal, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['class'],
            });
        },

        beforeDestroy() {
            if (this.mountedCallback === undefined) {
                return;
            }

            this.observer.disconnect();
        }
    }
</script>

<style scoped>

</style>
