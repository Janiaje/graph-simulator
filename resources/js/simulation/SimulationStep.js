class SimulationStep {

    constructor(graph, toHighlight) {
        this._graph = graph;
        this._graph.highlightSubgraph(toHighlight);

        this._hasPreviousStep = true;
        this._hasNextStep = true;

    }

    get graph() {
        return this._graph;
    }

    get hasPreviousStep() {
        return this._hasPreviousStep;
    }

    doesntHavePreviousStep() {
        this._hasPreviousStep = false;
    }

    get hasNextStep() {
        return this._hasNextStep;
    }

    doesntHaveNextStep() {
        this._hasNextStep = false;
    }
}

export default SimulationStep;
