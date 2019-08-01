class Tools {
    /**
     * Create range (array containing all the numbers from-to the given parameters).
     *
     * @param from int
     * @param to int
     *
     * @returns {Array.<int>}
     */
    static range(from, to) {
        return [...Array(to - from + 1).keys()]
            .map(value => value + from)
    }

    /**
     * Clone an array (copy the array in the memory)
     *
     *  @param array Array
     *
     * @returns {Array}
     */
    static cloneArray(array) {
        return [...array];
    }

    /**
     * Clone an object (copy the object in the memory)
     *
     *  @param object Object
     *
     * @returns {Object}
     */
    static cloneObject(object) {
        return Object.assign({}, object);
    }


    /**
     * Access Object's property by the given access string.
     * eg.: 'a1.a2.a3' will result in the same as
     *      object['a1']['a2']['a3']
     *
     *  @param array Array
     *
     * @returns {Array}
     */
    static accessObjectPropertyByString(object, string) {
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

    static colorNode(node, color) {
        node['color'] = color;

        return node;
    }

};

export default Tools;
