import Tools from "../graph/Tools";

class DisplayedAnalysis {

    static getName() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getName');
    }

    static getDescription() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getDescription');
    }

    static display(okCallback) {
        eventHub.$emit('question', {
            header: `${this.getName()}`,
            sectionTitles: false,
            description: this.getDescription(),
            footer: false,
        })
    }

}

export default DisplayedAnalysis;
