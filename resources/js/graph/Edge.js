import Colors from "./Colors";
import Tools from "./Tools";

class Edge {
    static getDefaultOptions() {
        return {
            font: {
                align: 'horizontal',
                size: 25,
                color: 'grey',
            },
            width: 4,
            color: Colors.edgeDefault,
        };
    }

    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.id = `from${from}-to${to}-${Tools.getEpochTime()}`;
        this.label = undefined;
        this._weight = null;
    }

    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = value;
        this.label = value;
    }

}

export default Edge;
