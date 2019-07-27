<template>
    <div>
        <div class="form-group">
            <label for="numberOfNodes">Nodes</label>
            <input id="numberOfNodes" type="number" class="form-control" placeholder="Number of nodes to generate"
                   v-model.number="numberOfNodes">
        </div>

        <div class="form-group">
            <label for="numberOfEdges">Email address</label>
            <input id="numberOfEdges" type="number" class="form-control" placeholder="Number of edges to generate"
                   v-model.number="numberOfEdges">
        </div>

        <div class="form-group">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="simpleGraph" v-model="simpleGraph">
                <label class="form-check-label" for="simpleGraph">Simple graph</label>
            </div>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-primary" @click="clearGraph">Clear Graph</button>
            <button type="button" class="btn btn-primary" @click="generateRandomGraph">Generate Random Graph</button>
            <button type="button" class="btn btn-primary" @click="showAnalytics" v-if="analytics.length === 0">Show
                Analytics
            </button>
        </div>

        <div class="list-group">
            <div class="row">
                <div class="col-3" v-for="info in analytics">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ info.title }}</h5>
                            <!--<small>3 days ago</small>-->
                        </div>
                        <p class="mb-1" v-html="info.value"></p>
                        <small>
                            <a :href="info.helpLink" target="_blank">Documentation</a>
                        </small>
                    </a>
                </div>
            </div>
        </div>

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
                simpleGraph: false,
                directedGraph: false,
                analytics: []
            }
        },

        mounted() {
            let container = document.getElementById('vis-graph');
            this.$options.graph = new Graph(container);
            this.generateRandomGraph();
        },

        methods: {
            clearGraph() {
                this.$options.graph.clearGraph();
            },

            generateRandomGraph() {
                this.$options.graph.generateRandomGraph();
            },

            showAnalytics() {
                this.analytics = this.$options.graph.getAnalytics(this.directedGraph);
            },
        }
    }
</script>

<style scoped>

</style>
