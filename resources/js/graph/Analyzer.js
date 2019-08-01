import Tools from "./Tools";

let Analyzer = {

    getAnalytics() {
        let analytics = [];

        if (this._getFormattedNodeList().length !== 0) {
            let averageDegree = {
                'title': 'Average degree',
                'value': this._directed ?
                    `
                    <ul>
                        <li>Outgoing degree: ${this.getAverageDegree('outgoing')} </li>
                        <li>Incoming degree: ${this.getAverageDegree('incoming')} </li>
                    </ul>
                    ` :
                    this.getAverageDegree('degree'),
                'helpLink': 'http://networksciencebook.com/chapter/2#degree',
            };

            analytics.push(averageDegree)
        }

        return analytics;
    },

    getAverageDegree(type) {
        let nodes = this._getFormattedNodeList();
        let edges = this._getFormattedEdgeList();

        if (nodes.length === 0) {
            return [];
        }

        let summedDegree = this._fillDegrees(nodes, edges)
            .map(node => node[type])
            .reduce((a, b) => {
                return a + b;
            });

        return summedDegree / nodes.length;
    },

    _fillDegrees(nodes, edgesParameter) {
        nodes.map((node) => {
            node.outgoing = Tools.cloneArray(edgesParameter).filter((edge) => {
                return edge.from === node.id;
            }).length;

            node.incoming = Tools.cloneArray(edgesParameter).filter((edge) => {
                return edge.to === node.id;
            }).length;

            node.degree = node.outgoing + node.incoming;

            return node;
        });

        return nodes;
    }

};

export default Analyzer;
