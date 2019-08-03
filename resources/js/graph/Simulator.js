import Simulation from "./Simulation";
import SimulationStep from "./SimulationStep";
import Graph from "./Graph";
import Generator from "./Generator";
import Tools from "./Tools";

let Simulator = {

    /**
     * Giant component simulation.
     */
    runGiantComponentSimulation() {
        // TODO: make question about only nodes

        // Only use the generated graph's nodes
        let graph = Tools.clone(this._graph);
        graph.edges = [];

        let firstStep = new SimulationStep(graph, new Graph(), false);

        let nextStepCalculationLambda = (currentStep) => {
            let graph = currentStep.graph;

            let randomEdge = Generator.randomEdge(graph);
            let changesGraph = new Graph([], randomEdge);

            if (randomEdge === undefined) {
                return null;
            }

            graph.edges.push(randomEdge);

            return new SimulationStep(graph, changesGraph);
        };

        this._simulation = new Simulation(firstStep, nextStepCalculationLambda);
    }

};

export default Simulator;
