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

        <button type="button" class="btn btn-primary" @click="clearGraph">Clear Graph</button>
        <button type="button" class="btn btn-primary" @click="generateRandomGraph">Generate Random Graph</button>

        <div id="vis-graph" style="height: 800px"/>
    </div>
</template>

<script>
    import vis from 'vis'

    export default {
        name: "VisGraph",
        data() {
            return {
                container: null,
                options: {},
                nodes: new vis.DataSet(),
                edges: new vis.DataSet(),
                numberOfNodes: 10,
                numberOfEdges: 3,
                simpleGraph: false
            }
        },

        mounted() {
            this.container = document.getElementById('vis-graph');
            this.$options.network = new vis.Network(this.container, {
                nodes: this.nodes,
                edges: this.edges
            }, this.options);
        },

        methods: {
            clearGraph() {
                this.nodes.clear()
                this.edges.clear()
            },

            generateRandomGraph() {
                this.clearGraph()

                let nodes = [...Array(this.numberOfNodes).keys()].map((value) => {
                    return {id: value + 1, label: 'Node ' + value}
                });

                let edges = [...Array(this.numberOfEdges).keys()].map((value) => {
                    let from = Math.floor(Math.random() * this.numberOfNodes) + 1
                    let to = Math.floor(Math.random() * this.numberOfNodes) + 1

                    return {from: from, to: to}
                });

                edges = this.generateEdgesForFullGraph(this.numberOfNodes)

                this.nodes.add(nodes);
                this.edges.add(edges);
            },

            generateEdgesForFullGraph(numberOfNodes) {
                let edges = [];

                this.range(1, numberOfNodes)
                    .forEach((from) => {
                        this.range(1, numberOfNodes)
                            .splice(from, numberOfNodes - from)
                            .forEach((to) => {
                                edges.push({
                                    from: from,
                                    to: to
                                })
                            })
                    });

                return edges
            },

            range(from, to) {
                return [...Array(to - from + 1).keys()]
                    .map(value => value + from)
            }
        }
    }
</script>

<style scoped>

</style>
