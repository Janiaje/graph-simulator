let Highlighter = {

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

    _colorEdgeDefault: {
        color: '#3490dc',
        highlight: '#36aeff',
        hover: '#349ae8',
    },

    _colorNodeChanged: {
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

    _colorEdgeChanged: {
        color: '#7be141',
        highlight: '#8dff48',
        hover: '#86f044',
    },

    highlightSubgraph(subgraph) {
        // TODO: code smell :\
        this.nodes.forEach(node => {

            if (subgraph.containsNode(node)) {
                node.color = this._colorNodeChanged;
            } else {
                node.color = this._colorNodeDefault;
            }

        });

        this.edges.forEach(edge => {

            if (subgraph.containsEdge(edge)) {
                edge.color = this._colorEdgeChanged;
            } else {
                edge.color = this._colorEdgeDefault;
            }

        });
    },

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
