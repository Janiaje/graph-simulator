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
        let firstStep = new SimulationStep(graph, new Graph(), graph.getLargestComponent());
        firstStep.doesntHavePreviousStep();

        let nextStepCalculationLambda = (currentStep) => {
            let graph = currentStep.graph;

            // If the giant component reached the graph's size
            if (graph.getLargestComponent().nodes.length === graph.nodes.length) {
                return null;
            }

            let randomEdge = Generator.randomEdge(graph);
            let changesGraph = new Graph([], randomEdge);

            if (randomEdge === undefined) {
                return null;
            }

            // Must call the setter!!!
            graph.edges = graph.edges.concat(randomEdge);

            return new SimulationStep(graph, changesGraph, graph.getLargestComponent());
        };

        this._simulate(firstStep, nextStepCalculationLambda);
    },

    _simulate(firstStep, nextStepCalculationLambda) {
        this.simulation = new Simulation(firstStep, nextStepCalculationLambda);
    }
};

export default Simulator;
