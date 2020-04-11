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

    static createFromObject(object) {
        let edge = new Edge(object.from, object.to);
        Object.assign(edge, object);

        if (edge._weight !== undefined) {
            edge._weight = parseInt(edge._weight);
        }

        return edge;
    }

    constructor(from, to) {
        this.id = `from${from}-to${to}-${Tools.getEpochTime()}`;
        this.from = from;
        this.to = to;
        this.label = undefined;
        this._weight = null;
    }

    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = parseInt(value);
        this.label = value.toString();
    }

}

export default Edge;
