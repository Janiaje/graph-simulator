import Tools from "./Tools";
import Graph from "./Graph";

let Analyzer = {

    /**
     * Returns the average degree of the Graph.
     *
     * @param type {string}
     *
     * @returns {Number|String}
     */
    getAverageDegree(type) {
        if (this.nodes.length === 0) {
            return 'NaN';
        }

        this._fillDegrees();

        let summedDegree = this.nodes
            .map(node => node[type])
            .reduce((a, b) => {
                return a + b;
            });

        return summedDegree / this.nodes.length;
    },

    /**
     * Fills the degrees of the nodes.
     */
    _fillDegrees() {
        this._nodes.map(node => {
            node.outgoingDegree = Tools.clone(this._edges).filter(edge => edge.from === node.id).length;

            node.incomingDegree = Tools.clone(this._edges).filter(edge => edge.to === node.id).length;

            node.degree = node.outgoingDegree + node.incomingDegree;

            return node;
        });
    },

    /**
     * Determines if the Graph contains the given node or not.
     *
     * @param node {Object}
     *
     * @returns {Boolean}
     */
    containsNode(node) {
        return this.nodesKeyedById[node.id] !== undefined;
    },

    /**
     * Determines if the Graph contains the given edge or not.
     *
     * @param edge {Object}
     *
     * @returns {Boolean}
     */
    containsEdge(edge) {
        if (this.directed) {
            return this.edgesKeyedById[edge.id] !== undefined;
        }

        // TODO: codesmell
        return (
                this.edgesKeyedByFrom[edge.from] !== undefined
                && this.edgesKeyedByFrom[edge.from].filter(item => item.to === edge.to).length !== 0
            )
            || (
                this.edgesKeyedByTo[edge.to] !== undefined
                && this.edgesKeyedByTo[edge.to].filter(item => item.from === edge.from).length !== 0
            );
    },

    /**
     * Determines if the given edge is contained by the list or not.
     *
     * @param edge {Object}
     * @param list {Array.<Object>}
     * @param directed {Boolean}
     *
     * @returns {Number|Boolean}
     */
    edgeInList(edge, list, directed = false) {
        for (let i = 0; i < list.length; i++) {
            if (
                (
                    list[i].from === edge.from
                    && list[i].to === edge.to
                )
                || (
                    !directed
                    && list[i].from === edge.to
                    && list[i].to === edge.from
                )
            ) {
                return i;
            }
        }

        return false;
    },

    /**
     * Returns the adjacent nodes of a node.
     *
     * @param node {Object}
     *
     * @returns {Array.<Object>}
     */
    getAdjacentNodes(node) {
        let adjacentNodes = [];

        // TODO: code smell
        if (this.edgesKeyedByFrom[node.id] !== undefined) {
            let edgesFrom = this.edgesKeyedByFrom[node.id].map(edge => edge.to);
            adjacentNodes = adjacentNodes.concat(edgesFrom);
        }

        if (!this.directed && this.edgesKeyedByTo[node.id] !== undefined) {
            let edgesTo = this.edgesKeyedByTo[node.id].map(edge => edge.from);
            adjacentNodes = adjacentNodes.concat(edgesTo);
        }


        adjacentNodes = Tools.distinct(adjacentNodes);

        adjacentNodes = adjacentNodes.map(nodeId => this.nodesKeyedById[nodeId]);

        return adjacentNodes;
    },

    /**
     * Returns the list of components of the Graph.
     *
     * @returns {Array.<Graph>}
     */
    getComponents() {
        let components = [];
        let visited = {};

        // TODO: move into a separate simulation?
        let DFSSearch = (component, node) => {
            component[node.id] = true;
            visited[node.id] = true;

            this.getAdjacentNodes(node).forEach(node => {
                if (component[node.id] === undefined) {
                    DFSSearch(component, node);
                }
            })
        };

        this.nodes.forEach(node => {
            if (visited[node.id] !== undefined) {
                return;
            }

            let component = {};
            DFSSearch(component, node);
            components.push(component);
        });

        components = components.map(component => {
            let nodes = [];
            let edges = [];

            for (let propertyName in component) {
                if (!component.hasOwnProperty(propertyName)) {
                    return;
                }

                nodes.push(this.nodesKeyedById[propertyName]);
            }

            nodes.forEach(node => {
                let edgesKeyedByFrom = this.edgesKeyedByFrom[node.id];
                if (edgesKeyedByFrom !== undefined) {
                    edges = edges.concat(edgesKeyedByFrom);
                }
            });

            return new Graph(nodes, edges, this.directed, this.simple);
        });

        return components;
    },

    /**
     * Returns the largest component of the Graph.
     *
     * @returns {Graph}
     */
    getLargestComponent() {
        let components = this.getComponents();

        let max = Math.max(...components.map(component => component.nodes.length));

        let filtered = components.filter(component => component.nodes.length === max);

        // Can be more than one
        return filtered[0];
    }

};

export default Analyzer;
