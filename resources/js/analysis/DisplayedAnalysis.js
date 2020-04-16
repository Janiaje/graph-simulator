import Tools from "../graph/Tools";

class DisplayedAnalysis {

    /**
     * Returns the name of the Analysis.
     *
     * @returns {string}
     */
    static getName() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getName');
    }

    /**
     * Returns the description HTML for the Analysis.
     *
     * @returns {{type: string, body: string}[]}
     */
    static getQuestionBody() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getQuestionBody');
    }

    /**
     * Displays the Analysis.
     */
    static display() {
        eventHub.$emit('question', {
            header: `${this.getName()}`,
            body: this.getQuestionBody(),
            footer: false,
        })
    }

}

export default DisplayedAnalysis;
