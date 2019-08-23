<template>
    <modal :id="'question'">
        <template v-slot:header v-if="question.header !== undefined">
            {{ question.header }}
        </template>

        <template v-slot:body>
            <div v-if="question.fields !== undefined && question.fields.length !== 0" class="form-group"
                 v-for="field in question.fields">
                <label :for="field.id">{{ field.label }}</label>

                <select v-if="field.type === 'select'" class="form-control" :id="field.id" v-model="field.value">
                    <option v-for="option in field.options">{{ option.text }}</option>
                </select>

                <input v-if="field.type === 'text'" type="text" class="form-control" :id="field.id"
                       v-model="field.value">

                <input v-if="field.type === 'number'" type="number" class="form-control" :id="field.id"
                       v-model="field.value"
                       :min="field.min" :max="field.max">
            </div>
        </template>

        <template v-slot:footer>
            <button
                type="button" class="btn btn-secondary"
                v-if="question.cancel !== undefined"
                @click="cancelCallback"
                data-dismiss="modal"
            >
                {{ question.cancel.text }}
            </button>
            <button
                type="button"
                class="btn btn-primary"
                @click="okCallback"
                data-dismiss="modal"
            >
                {{ question.ok.text }}
            </button>
        </template>
    </modal>
</template>

<script>
    import Tools from "../../graph/Tools";

    export default {
        name: "QuestionModal",
        data() {
            return {
                question: {},
                questionDefaults: {
                    header: undefined,
                    fields: [
                        // {
                        //     id: 'something',
                        //     type: 'select',
                        //     label: 'Something',
                        //     options: [
                        //         {
                        //             text: 'A1',
                        //             value: 'A1'
                        //         }
                        //     ]
                        // },
                        // {
                        //     id: 'something',
                        //     type: 'text',
                        //     label: 'Something'
                        // },
                        // {
                        //     id: 'something',
                        //     type: 'number',
                        //     label: 'Something',
                        //     min: 1,
                        //     max: 10,
                        // },
                    ],
                    cancel: {
                        text: 'Cancel',
                        callback: () => {
                            // console.log('Question Cancel button pressed');
                        }
                    },
                    ok: {
                        text: 'OK',
                        callback: () => {
                            // console.log('Question OK button pressed');
                        }
                    }
                },
            };
        },

        methods: {
            questionCallback(data) {
                this.setToDefaults();
                Object.assign(this.question, data);
                this.$emit('show');
            },

            okCallback() {
                this.finished(this.question.ok.callback);
            },

            cancelCallback() {
                this.finished(this.question.cancel.callback);
            },

            finished(callback) {
                let inputValues = {};
                this.question.fields.forEach(field => {
                    inputValues[field.id] = field.value;
                });

                callback(inputValues);
                this.setToDefaults();
            },

            setToDefaults() {
                this.question = Tools.clone(this.questionDefaults);
            }
        },

        created() {
            this.setToDefaults();
        },

        mounted() {
            eventHub.$on('question', this.questionCallback);
        },

        destroyed() {
            eventHub.$off('question', this.questionCallback);
        }
    }
</script>

<style scoped>

</style>
