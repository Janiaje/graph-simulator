import Simulation from "./Simulation";
import SimulationStep from "./SimulationStep";
import Generator from "../graph/Generator";
import Tools from "../graph/Tools";

let Simulator = {

    /**
     * Giant component simulation.
     */
    runGiantComponentSimulation() {
        // TODO: make question about only nodes
        // TODO: not working correctly for simple directed graphs

        // Only use the generated graph's nodes
        let graph = Tools.clone(this._graph);
        graph.edges = [];

        let firstStep = new SimulationStep(graph, graph.getLargestComponent());
        firstStep.doesntHavePreviousStep();

        let nextStepCalculationLambda = (currentStep) => {
            let graph = currentStep.graph;

            // If the giant component reached the graph's size
            if (graph.getLargestComponent().nodes.length === graph.nodes.length) {
                return null;
            }

            let randomEdge = Generator.randomRemainingEdge(graph);

            if (randomEdge === undefined) {
                return null;
            }

            // Must call the setter!!!
            graph.edges = graph.edges.concat(randomEdge);

            return new SimulationStep(graph, graph.getLargestComponent());
        };

        let lineChartCalculationLambda = (currentStep, steps) => {
            let numberOfNodes = currentStep.graph.nodes.length;

            let data = steps.map((step) => {
                let graph = step.graph;
                let largestComponent = graph.getLargestComponent();
                let largestComponentPercentage = largestComponent.nodes.length / numberOfNodes;
                let connectionsPerNode = (graph.edges.length * 2) / graph.nodes.length;

                return {
                    x: connectionsPerNode.toFixed(2),
                    y: largestComponentPercentage.toFixed(2)
                };
            });
            return [{
                name: 'Value',
                // name: 'Giant component fraction by connections',
                data: data,
            }];
        };

        this._simulate(firstStep, nextStepCalculationLambda, lineChartCalculationLambda);
    },

    _simulate(firstStep, nextStepCalculationLambda, lineChartCalculationLambda) {
        this.simulation = new Simulation(firstStep, nextStepCalculationLambda, lineChartCalculationLambda);
    }
};

export default Simulator;
