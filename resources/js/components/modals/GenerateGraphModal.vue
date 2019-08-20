<template>
    <modal :id="'generateGraph'">
        <template v-slot:header>
            Generate graph
        </template>

        <template v-slot:body>
            <div class="row">
                <div class="col-6">
                    <number-input-with-boundaries
                        :id="'numberOfNodes'"
                        :label="'Nodes'"
                        :min="1"
                        :max="150"
                        :startingValue="numberOfNodes"
                        :placeholder="'Number of nodes'"
                        @change="(newValue) => numberOfNodes = newValue"
                    />
                </div>

                <div class="col-6">
                    <number-input-with-boundaries
                        :id="'numberOfEdges'"
                        :label="'Edges'"
                        :min="0"
                        :max="1000"
                        :startingValue="numberOfEdges"
                        :placeholder="'Number of edges'"
                        @change="(newValue) => numberOfEdges = newValue"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="simpleGraph" v-model="simpleGraph">
                            <label class="form-check-label" for="simpleGraph">Simple graph</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="directedGraph" v-model="directedGraph">
                            <label class="form-check-label" for="directedGraph">Directed graph</label>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="form-group">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="physicsAllowed"
                                   v-model="physicsAllowed">
                            <label class="form-check-label" for="physicsAllowed">Physics allowed</label>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" ref="generate" data-dismiss="modal"
                    @click="generateRandomGraph">
                Generate
            </button>
        </template>
    </modal>
</template>

<script>
    import Generator from "../../graph/Generator";

    export default {
        name: "GenerateGraphModal",
        data() {
            return {
                numberOfNodes: 5,
                numberOfEdges: 7,
                simpleGraph: true,
                directedGraph: false,
                physicsAllowed: true
            }
        },

        methods: {
            generateRandomGraph() {
                eventHub.$emit('simulation-ended');
                let graph = Generator.generateRandomGraph(this.numberOfNodes, this.numberOfEdges, this.simpleGraph, this.directedGraph);
                mainDisplayedGraph.display(graph);
            }
        },

        watch: {
            physicsAllowed: function (value) {
                mainDisplayedGraph.physicsAllowed(value);
            }
        }
    }
</script>

<style lang="scss" scoped>
    label.line-through {
        text-decoration: line-through;
    }
</style>
