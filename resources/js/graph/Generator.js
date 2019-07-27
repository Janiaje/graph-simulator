let Generator = {
    /**
     * Generate random graph.
     */
    generateRandomGraph(fullGraph) {
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

        this._updateGraph(nodes, edges);
    },

    /**
     * Generate edges for full graph.
     *
     * @param numberOfNodes int
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

};

export default Generator;
