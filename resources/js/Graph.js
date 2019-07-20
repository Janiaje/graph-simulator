import vis from 'vis'

class Graph {

    /**
     * @param container HTML element
     * @param options Object
     */
    constructor(container, options = {}) {
        this._options = options;

        this._nodes = new vis.DataSet();
        this._edges = new vis.DataSet();

        this._network = new vis.Network(container, {
            nodes: this._nodes,
            edges: this._edges
        }, this._options)
    }

    /**
     * Delete all nodes and edges.
     */
    clearGraph() {
        this._nodes.clear();
        this._edges.clear();
    }

    /**
     * Generate random graph
     */
    generateRandomGraph(fullGraph) {
        this.clearGraph();

        let numberOfNodes = 5;

        let nodes = [...Array(numberOfNodes).keys()].map((value) => {
            return {id: value + 1, label: 'Node ' + value}
        });

        // let edges = [...Array(this.numberOfEdges).keys()].map((value) => {
        //     let from = Math.floor(Math.random() * numberOfNodes) + 1;
        //     let to = Math.floor(Math.random() * numberOfNodes) + 1;
        //
        //     return {from: from, to: to}
        // });

        let edges = this._generateEdgesForFullGraph(numberOfNodes);

        this._nodes.add(nodes);
        this._edges.add(edges);
    }

    /**
     * Generate edges for full graph
     */
    _generateEdgesForFullGraph(numberOfNodes) {
        let edges = [];

        this._range(1, numberOfNodes)
            .forEach((from) => {
                this._range(1, numberOfNodes)
                    .splice(from, numberOfNodes - from)
                    .forEach((to) => {
                        edges.push({
                            from: from,
                            to: to
                        })
                    })
            });

        return edges
    }

    /**
     * Create range (array containing all the numbers from-to the given parameters)
     */
    _range(from, to) {
        return [...Array(to - from + 1).keys()]
            .map(value => value + from)
    }
}

export default Graph;
