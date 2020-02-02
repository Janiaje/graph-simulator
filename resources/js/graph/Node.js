import Colors from "./Colors";

class Node {
    static getDefaultOptions() {
        return {
            shape: 'ellipse',
            size: 20,
            font: {
                size: 25,
                color: '#ffffff'
            },
            margin: 15,
            borderWidth: 2,
            color: Colors.nodeDefault
        };
    }

    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
}

export default Node;
