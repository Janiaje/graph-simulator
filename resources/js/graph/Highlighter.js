let Highlighter = {

    /**
     * Default color settings for nodes.
     * @type {Object}
     */
    _colorNodeDefault: {
        background: '#3490dc',
        border: '#3781ea',
        highlight: {
            background: '#36aeff',
            border: '#3b8eff'
        },
        hover: {
            background: '#349ae8',
            border: '#378cf5'
        },
    },

    /**
     * Default color settings for edges.
     * @type {Object}
     */
    _colorEdgeDefault: {
        color: '#3490dc',
        highlight: '#36aeff',
        hover: '#349ae8',
    },

    /**
     * Highlight color settings for nodes.
     * @type {Object}
     */
    _colorNodeHighlighted: {
        background: '#7be141',
        border: '#50b413',
        highlight: {
            background: '#8dff48',
            border: '#71ff1b'
        },
        hover: {
            background: '#86f044',
            border: '#61da17'
        },
    },

    /**
     * Highlight color settings for edges.
     * @type {Object}
     */
    _colorEdgeHighlighted: {
        color: '#7be141',
        highlight: '#8dff48',
        hover: '#86f044',
    },

    /**
     * Highlights subGraph.
     *
     * @param subgraph {Graph}
     */
    highlightSubgraph(subgraph) {
        // TODO: code smell :\
        this.nodes.forEach(node => {

            if (subgraph.containsNode(node)) {
                node.color = this._colorNodeHighlighted;
            } else {
                node.color = this._colorNodeDefault;
            }

        });

        this.edges.forEach(edge => {

            if (subgraph.containsEdge(edge)) {
                edge.color = this._colorEdgeHighlighted;
            } else {
                edge.color = this._colorEdgeDefault;
            }

        });
    },

    /**
     * Sets the whole Graph's colors to default.
     */
    setToDefaultColor() {
        this.nodes.forEach(node => {
            node.color = this._colorNodeDefault;
        });

        this.edges.forEach(edge => {
            edge.color = this._colorEdgeDefault;
        });
    }

};

export default Highlighter;
