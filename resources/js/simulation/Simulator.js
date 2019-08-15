import GiantComponentSimulation from "./simulations/GiantComponentSimulation";

let Simulator = {

    /**
     * Giant component simulation.
     */
    runGiantComponentSimulation() {
        // TODO: magic for each simulation class
        // TODO: calculation running loading screen

        console.log('show');
        eventHub.$emit('loading-show');
        console.log('showed');
        this.simulation = new GiantComponentSimulation(this._graph);
        console.log('hide');
        eventHub.$emit('loading-hide');
        console.log('hidden');
    }

};

export default Simulator;
