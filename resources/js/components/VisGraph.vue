<template>
    <div>
        <div class="form-group">
            <label for="numberOfNodes">Nodes</label>
            <input id="numberOfNodes" type="number" min="1" class="form-control"
                   placeholder="Number of nodes to generate"
                   v-model.number="numberOfNodes">
        </div>

        <div class="form-group">
            <label for="numberOfEdges">Edges</label>
            <input id="numberOfEdges" type="number" min="1" class="form-control"
                   placeholder="Number of edges to generate"
                   v-model.number="numberOfEdges">
        </div>

        <div class="form-group">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="simpleGraph" v-model="simpleGraph">
                <label class="form-check-label" for="simpleGraph">Simple graph</label>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="directedGraph" v-model="directedGraph">
                <label class="form-check-label" for="directedGraph">Directed graph</label>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="physicsAllowed" v-model="physicsAllowed">
                <label class="form-check-label" for="physicsAllowed">Physics allowed</label>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="clearGraph">Clear Graph</button>
        <button type="button" class="btn btn-primary" @click="generateRandomGraph">Generate Random Graph</button>

        <div id="vis-graph" style="height: 800px"/>
    </div>
</template>

<script>
    import Graph from "../graph/Graph";

    export default {
        name: "VisGraph",
        data() {
            return {
                numberOfNodes: 10,
                numberOfEdges: 3,
                simpleGraph: true,
                directedGraph: false,
                physicsAllowed: true
            }
        },

        mounted() {
            let container = document.getElementById('vis-graph');
            this.$options.graph = new Graph(container);
        },

        methods: {
            clearGraph() {
                this.$options.graph.clearGraph();
            },

            generateRandomGraph() {
                this.$options.graph.generateRandomGraph(this.numberOfNodes, this.numberOfEdges, this.simpleGraph, this.directedGraph);
            },
        },

        watch: {
            physicsAllowed: function (value) {
                this.$options.graph.physicsAllowed(value);
            }
        }
    }
</script>

<style scoped>

</style>
