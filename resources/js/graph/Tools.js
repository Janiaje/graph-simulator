let Tools = {
    /**
     * Create range (array containing all the numbers from-to the given parameters).
     *
     * @param from int
     * @param to int
     *
     * @returns {Array.<int>}
     */
    _range(from, to) {
        return [...Array(to - from + 1).keys()]
            .map(value => value + from)
    },

    /**
     * Create range (array containing all the numbers from-to the given parameters).
     *
     *  @param array Array
     *
     * @returns {Array}
     */
    _cloneArray(array) {
        return [...array];
    }

};

export default Tools;
