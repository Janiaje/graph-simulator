let Analyzer = {

    getAnalytics(directed) {
        return [
            {
                'title': 'Average degree',
                'value': directed ?
                    `
                    <ul>
                        <li>Outgoing degree: ${this.getAverageDegree('outgoing')} </li>
                        <li>Incoming degree: ${this.getAverageDegree('incoming')} </li>
                    </ul>
                    ` :
                    this.getAverageDegree('degree'),
                'helpLink': 'http://networksciencebook.com/chapter/2#degree',
            }
        ];
    },

    getAverageDegree(type) {
        let nodes = this._getFormattedNodeList();
        let edges = this._getFormattedEdgeList();

        let summedDegree = this._fillDegrees(nodes, edges)
            .map(node => node[type])
            .reduce((a, b) => {
                return a + b;
            });

        return summedDegree / nodes.length;
    },

    _fillDegrees(nodes, edgesParameter) {
        nodes.map((node) => {
            node.outgoing = this._cloneArray(edgesParameter).filter((edge) => {
                return edge.from === node.id;
            }).length;

            node.incoming = this._cloneArray(edgesParameter).filter((edge) => {
                return edge.to === node.id;
            }).length;

            node.degree = node.outgoing + node.incoming;

            return node;
        });

        return nodes;
    }

};

export default Analyzer;
