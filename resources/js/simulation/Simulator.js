import GiantComponentSimulation from "./simulations/GiantComponentSimulation";

let Simulator = {

    /**
     * Giant component simulation.
     */
    runGiantComponentSimulation() {
        // TODO: magic for each simulation class
        // TODO: calculation running loading screen

        this.simulation = new GiantComponentSimulation(this._graph);
    }

};

export default Simulator;
