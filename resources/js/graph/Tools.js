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
    },

    accessObjectByString(string, object) {
        if (string === '') {
            return object;
        }

        string = string.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        string = string.replace(/^\./, '');           // strip a leading dot

        const a = string.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i];
            if (k in object) {
                object = object[k];
            } else {
                return;
            }
        }
        return object;
    }

};

export default Tools;
