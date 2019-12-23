import Colors from "./Colors";

let Highlighter = {

    /**
     * Highlights subGraph.
     *
     * @param subgraph {Graph}
     */
    highlightSubgraph(subgraph) {
        // TODO: code smell :\
        this.nodes.forEach(node => {

            if (subgraph.containsNode(node)) {
                node.color = Colors.nodeHighlighted;
            } else {
                node.color = Colors.nodeDefault;
            }

        });

        this.edges.forEach(edge => {

            if (subgraph.containsEdge(edge)) {
                edge.color = Colors.edgeHighlighted;
            } else {
                edge.color = Colors.edgeDefault;
            }

        });
    },

    /**
     * Sets the whole Graph's colors to default.
     */
    setToDefaultColor() {
        this.nodes.forEach(node => {
            node.color = Colors.nodeDefault;
        });

        this.edges.forEach(edge => {
            edge.color = Colors.edgeDefault;
        });
    }

};

export default Highlighter;
