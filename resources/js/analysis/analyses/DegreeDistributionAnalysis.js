import DisplayedAnalysis from "../DisplayedAnalysis";
import ApexChartDefaultOptions from "../../components/ApexChartDefaultOptions";
import Tools from "../../graph/Tools";

class DegreeDistributionAnalysis extends DisplayedAnalysis {

    /**
     * Returns the name of the Analysis.
     *
     * @returns {string}
     */
    static getName() {
        return 'Degree distribution';
    }

    /**
     * Returns the description HTML for the Analysis.
     *
     * @returns {{type: string, body: string}[]}
     */
    static getQuestionBody() {
        let graph = mainDisplayedGraph.graph;
        graph.fillDegrees();

        let chartData = {};

        let nodes = graph.nodes;
        nodes.forEach(node => {
            let counter = chartData[node.degree]
            if (counter === undefined) {
                counter = 0;
            }

            counter++;

            chartData[node.degree] = counter;
        });

        let roundTo2Decimals = value => Tools.round(value, 2);

        let xaxisCategories = Object.keys(chartData)
            .map(roundTo2Decimals);

        let dataPoints = Object.values(chartData)
            .map(value => value / nodes.length)
            .map(roundTo2Decimals);

        let chartOptions = ApexChartDefaultOptions.barChart();
        chartOptions.xaxis = {
            categories: xaxisCategories,
        };

        return [
            {
                type: 'chart',
                options: chartOptions,
                series: [
                    {
                        name: 'Value',
                        data: dataPoints
                    }
                ],
            },
        ]
    }

}

export default DegreeDistributionAnalysis;
