<template>
    <div class="form-group">
        <label v-if="label" :for="id">{{ label }}</label>
        <input
            :id="id"
            type="number"
            :min="min"
            :max="max"
            class="form-control"
            :placeholder="placeholder"
            v-model.number="inputValue"
        >
    </div>
</template>

<script>
    export default {
        name: "NumberInputWithBoundaries",
        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String
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
