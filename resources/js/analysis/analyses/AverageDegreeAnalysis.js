import DisplayedAnalysis from "../DisplayedAnalysis";

class AverageDegreeAnalysis extends DisplayedAnalysis {

    /**
     * Returns the name of the Analysis.
     *
     * @returns {string}
     */
    static getName() {
        return 'Average degree';
    }

    /**
     * Returns the description HTML for the Analysis.
     *
     * @returns {{type: string, body: string}[]}
     */
    static getQuestionBody() {
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

        let descriptionText = `
            <h6>Value: ${value}</h6>
            <h6>More info: <a href="http://networksciencebook.com/chapter/2#degree" target="_blank">link</a></h6>
        `;

        return [
            {
                type: 'text',
                body: descriptionText,
            }
        ]
    }

}

export default AverageDegreeAnalysis;
