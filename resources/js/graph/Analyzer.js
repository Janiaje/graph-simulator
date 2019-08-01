import Tools from "./Tools";

let Analyzer = {

    getAverageDegree(type) {
        if (this._nodes.length === 0) {
            return [];
        }

        this._fillDegrees();

        let summedDegree = this._nodes
            .map(node => node[type])
            .reduce((a, b) => {
                return a + b;
            });

        return summedDegree / this._nodes.length;
    },

    _fillDegrees() {
        this._nodes.map((node) => {
            node.outgoing = Tools.cloneArray(this._edges).filter((edge) => {
                return edge.from === node.id;
            }).length;

            node.incoming = Tools.cloneArray(this._edges).filter((edge) => {
                return edge.to === node.id;
            }).length;

            node.degree = node.outgoing + node.incoming;

            return node;
        });
    }

};

export default Analyzer;
