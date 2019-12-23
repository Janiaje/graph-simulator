class Colors {

    /**
     * Default color settings for nodes.
     * @type {Object}
     */
    static get nodeDefault() {
        return {
            background: '#3490dc',
            border: '#3490dc',
            highlight: {
                background: '#2b5b9b',
                border: '#2b5b9b'
            },
            hover: {
                background: '#2b5b9b',
                border: '#2b5b9b'
            },
        };
    }

    /**
     * Default color settings for edges.
     * @type {Object}
     */
    static get edgeDefault() {
        return {
            color: '#3490dc',
            highlight: '#2b5b9b',
            hover: '#2b5b9b',
        };
    }

    /**
     * Highlight color settings for nodes.
     * @type {Object}
     */
    static get nodeHighlighted() {
        return {
            background: '#28a745',
            border: '#28a745',
            highlight: {
                background: '#217d38',
                border: '#217d38'
            },
            hover: {
                background: '#217d38',
                border: '#217d38'
            },
        };
    }

    /**
     * Highlight color settings for edges.
     * @type {Object}
     */
    static get edgeHighlighted() {
        return {
            color: '#28a745',
            highlight: '#217d38',
            hover: '#217d38',
        };
    }
}

export default Colors;
