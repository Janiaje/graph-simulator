import Simulation from "./Simulation";
import SimulationStep from "./SimulationStep";

let Simulator = {

    /**
     * Giant component simulation.
     */
    runGiantComponentSimulation() {
        let firstStep = new SimulationStep(this._nodes, this._edges, []);

        let nextStepCalculationLambda = (currentStep) => {


        };

        return new Simulation(firstStep, nextStepCalculationLambda);
    }

};

export default Simulator;
