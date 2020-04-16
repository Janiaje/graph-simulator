<template>
    <modal :id="'question'">
        <template v-slot:header v-if="question.header !== undefined">
            {{ question.header }}
        </template>

        <template v-slot:body>
            <div v-for="section in question.body">

                <div v-if="section.type === 'text'" class="form-group">
                    <h5 v-if="section.title !== undefined">{{ section.title }}</h5>
                    <div v-html="section.body"/>
                </div>

                <div v-if="section.type === 'form-group'" class="form-group">
                    <h5 v-if="section.title !== undefined">{{ section.title }}</h5>

                    <div v-for="item in section.body">
                        <div v-if="item.type.includes('input-')">
                            <label v-if="item.label !== undefined" :for="item.id">{{ item.label }}</label>

                            <select
                                v-if="item.type === 'input-select'"
                                class="form-control"
                                :id="item.id"
                                v-model="item.value"
                            >
                                <option v-for="option in item.options" :value="option.value">{{ option.text }}</option>
                            </select>

                            <input
                                v-if="item.type === 'input-text'"
                                type="text"
                                class="form-control"
                                :id="item.id"
                                v-model="item.value"
                            >

                            <input
                                v-if="item.type === 'input-number'"
                                type="number"
                                class="form-control"
                                :id="item.id"
                                v-model="item.value"
                            >

                            <number-input-with-boundaries
                                v-if="item.type === 'input-number-with-boundaries'"
                                :id="item.id"
                                :min="item.min"
                                :max="item.max"
                                :startingValue="item.value"
                                @change="newValue => item.value = newValue"
                            />
                        </div>
                    </div>
                </div>

                <div
                    v-if="section.type === 'alert' && section.body !== undefined"
                    class="alert"
                    :class="'alert-' + section.alert_type"
                    role="alert"
                >
                    <font-awesome-icon
                        v-if="section.alert_type === 'danger'"
                        icon='exclamation-triangle'
                    />

                    <span v-html="section.body"/>
                </div>

            </div>
        </template>

        <template v-slot:footer v-if="question.footer">
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
    // TODO: rename to something useful instead of 'Question'
    import Tools from "../../graph/Tools";

    export default {
        name: "QuestionModal",
        data() {
            return {
                question: {},
                questionDefaults: {
                    header: undefined,
                    body: [
                        // {
                        //     type: 'form-group',
                        //     title: 'Some section title!',
                        //     body: [
                        //         {
                        //             type: 'text',
                        //             body: 'Some text...'
                        //         },
                        //         {
                        //             id: 'something',
                        //             type: 'input-select',
                        //             title: 'Something',
                        //             options: [
                        //                 {
                        //                     text: 'A1',
                        //                     value: 'A1'
                        //                 }
                        //             ],
                        //             value: 'A1'
                        //         },
                        //         {
                        //             id: 'something',
                        //             type: 'input-text',
                        //             title: 'Something',
                        //             value: 'A1'
                        //         },
                        //         {
                        //             id: 'something',
                        //             type: 'input-number',
                        //             title: 'Something',
                        //             value: '123'
                        //         },
                        //         {
                        //             id: 'something',
                        //             type: 'input-number-with-boundaries',
                        //             title: 'Something',
                        //             min: 1,
                        //             max: 10,
                        //             value: '123'
                        //         },
                        //     ]
                        // },
                        // {
                        //     type: 'alert',
                        //     alert_type: 'danger',
                        //     header: 'Some title',
                        //     body: 'Some text...'
                        // },
                    ],
                    footer: true,
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

            collectInputsValues() {
                let inputValues = {};
                this.question.body.forEach(section => {
                    if (section.type !== 'form-group') {
                        return;
                    }

                    section.body.forEach(item => {
                        if (!item.type.includes("input-")) {
                            return;
                        }

                        inputValues[item.id] = item.value;
                    });
                });

                return inputValues;
            },

            finished(callback) {
                let inputValues = this.collectInputsValues();
                this.setToDefaults();

                callback(inputValues);
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
