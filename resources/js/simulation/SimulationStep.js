import Graph from "../graph/Graph";

class SimulationStep {

    constructor(graph, toHighlight = new Graph, hasPreviousStep = true) {
        this._graph = graph;
        this._graph.highlightSubgraph(toHighlight);

        this._hasPreviousStep = hasPreviousStep;
        this._hasNextStep = true;

        this._lineChartData = undefined;
    }

    get graph() {
        return this._graph;
    }

    get hasPreviousStep() {
        return this._hasPreviousStep;
    }

    get hasNextStep() {
        return this._hasNextStep;
    }

    doesntHaveNextStep() {
        this._hasNextStep = false;
    }

    get lineChartData() {
        return this._lineChartData;
    }

    set lineChartData(value) {
        this._lineChartData = value;
    }

}

export default SimulationStep;
