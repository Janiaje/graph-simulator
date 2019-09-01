import DisplayedAnalysis from "../DisplayedAnalysis";

class AverageDegreeAnalysis extends DisplayedAnalysis {

    static getName() {
        return 'Average degree';
    }

    static getDescription() {
        let graph = mainDisplayedGraph.graph;
        let value;

        if (graph.directed) {
            value = `
                    <ul>
                        <li>Outgoing degree: ${graph.getAverageDegree('outgoingDegree')} </li>
                        <li>Incoming degree: ${graph.getAverageDegree('incomingDegree')} </li>
                    </ul>
                    `;
        } else {
            value = graph.getAverageDegree('degree');
        }

        return `
            <h6>Value: ${value}</h6>
            <h6>More info: <a href="http://networksciencebook.com/chapter/2#degree" target="_blank">link</a></h6>
        `;
    }

}

export default AverageDegreeAnalysis;
