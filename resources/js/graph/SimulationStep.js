class SimulationStep {

    constructor(graph, changesGraph, hasPreviousStep = true, hasNextStep = true) {
        this._graph = graph;
        this._changesGraph = changesGraph;

        this._hasPreviousStep = hasPreviousStep;
        this._hasNextStep = hasNextStep;
    }

    get graph() {
        this._changesGraph;
        // TODO: color them according to the changes
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
};

export default SimulationStep;
