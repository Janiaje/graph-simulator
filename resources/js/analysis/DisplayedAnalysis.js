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
     * @returns {string}
     */
    static getDescription() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getDescription');
    }

    /**
     * Displays the Analysis.
     */
    static display() {
        eventHub.$emit('question', {
            header: `${this.getName()}`,
            sectionTitles: false,
            description: this.getDescription(),
            footer: false,
        })
    }

}

export default DisplayedAnalysis;
