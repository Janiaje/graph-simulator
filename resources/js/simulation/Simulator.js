let Simulator = {

    /**
     * Giant component simulation.
     */
    runSimulation(simulation) {
        // TODO: calculation running loading screen

        console.log('show');
        eventHub.$emit('loading-show');
        console.log('showed');
        this.simulation = new simulation(this._graph);
        console.log('hide');
        eventHub.$emit('loading-hide');
        console.log('hidden');
    }

};

export default Simulator;
