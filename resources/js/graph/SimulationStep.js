class SimulationStep {

    // TODO: update it to handle directed graphs

    constructor(nodes, edges, changes, hasPreviousStep = true, hasNextStep = null) {
        this._nodes = nodes;
        this._edges = edges;
        this._changes = changes;

        this._hasPreviousStep = hasPreviousStep;
        this._hasNextStep = hasNextStep;

    }

    get nodes() {
        // TODO: color them according to the changes
        return this._nodes;
    }

    get edges() {
        // TODO: color them according to the changes
        return this._edges;
    }

    get changes() {
        return this._changes;
    }

    get hasPreviousStep() {
        return this._hasPreviousStep;
    }

    get hasNextStep() {
        return this._hasNextStep;
    }

    itHasNextStep() {
        this._hasNextStep = true;
    }

};

export default SimulationStep;
