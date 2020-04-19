<template>
    <input
        :id="id"
        type="number"
        :min="min"
        :max="max"
        class="form-control"
        :placeholder="placeholder"
        v-model.number="inputValue"
    >
</template>

<script>
    export default {
        name: "NumberInputWithBoundaries",
        props: {
            id: {
                type: String,
                required: true
            },
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            },
            startingValue: {
                required: true
            },
            placeholder: {
                type: String,
                default: ''
            }
        },

        computed: {
            inputValue: {
                get() {
                    return this.startingValue;
                },

                set(newValue) {
                    this.$emit('change', newValue);
                    return newValue;
                }
            }
        },

        watch: {
            inputValue(newValue) {
                if (newValue > this.max) {
                    // TODO: make some visual feedback
                    this.inputValue = this.max;
                }
            }
        }
    }
</script>

<style scoped>

</style>
