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
                        @change="newValue => numberOfNodes = newValue"
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
                        @change="newValue => numberOfEdges = newValue"
                    />
                </div>
            </div>

            <div class="row form-group">
                <div class="col-6">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="simpleGraph" v-model="simpleGraph">
                        <label class="custom-control-label" for="simpleGraph">Simple graph</label>
                    </div>
                </div>

                <div class="col-6">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="directedGraph" v-model="directedGraph">
                        <label class="custom-control-label" for="directedGraph">Directed graph</label>
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
    import Tools from "../../graph/Tools";

    export default {
        name: "GenerateGraphModal",
        data() {
            return {
                numberOfNodes: 5,
                numberOfEdges: 7,
                simpleGraph: true,
                directedGraph: false,
            }
        },

        methods: {
            generateRandomGraph() {
                // TODO: It is calls the setter of DisplayedGraph.simulation => sets the default color to the current graph => not needed!
                eventHub.$emit('simulation-ended');

                Tools.runWithLoadingScreen(() => {
                    let graph = Generator.generateRandomGraph(this.numberOfNodes, this.numberOfEdges, this.simpleGraph, this.directedGraph);
                    mainDisplayedGraph.display(graph);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    label.line-through {
        text-decoration: line-through;
    }
</style>
