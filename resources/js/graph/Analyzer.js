class Analyzer {

    getAverageDegree(graph, type) {
        if (graph.nodes.length === 0) {
            return [];
        }

        graph.fillDegrees();

        let summedDegree = graph.nodes
            .map(node => node[type])
            .reduce((a, b) => {
                return a + b;
            });

        return summedDegree / graph.nodes.length;
    }

    getLargestSubgraph(graph) {

    }
}

export default Analyzer;
