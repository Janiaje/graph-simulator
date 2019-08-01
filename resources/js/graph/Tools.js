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
     * @param object Object
     * @param string String
     *
     * @returns {Object}
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
                return object;
            }
        }

        return object;
    }


    /**
     * Returns a nodeList with only the properties specified in the _exportNodeListFormat list.
     *
     * @param propertyNamesArray Array.String
     * @param arrayOfObjects Array.<Object>
     *
     * @returns {Array.<Object>}
     */
    static formatObjectList(propertyNamesArray, arrayOfObjects) {
        return arrayOfObjects.map((object) => {
            let newObject = {};

            propertyNamesArray.forEach((key) => {
                newObject[key] = object[key];
            });

            return newObject;
        });
    }

    /**
     * Returns data string with the given separator line by line for the header.
     *
     * @param separator string
     * @param header Array.<string>
     * @param rows Array.<Object>
     *
     * @returns {string}
     */
    static createDataFile(separator, header, rows) {
        rows = rows.map((node) => {
            let row = [];

            header.forEach((key) => {
                row.push(node[key]);
            });

            row = row.join(separator);

            return row;
        });

        header = header.join(separator);

        let csv = [header].concat(rows);
        csv = csv.join("\n");

        return csv;
    }

    /**
     * Returns parsed data string as object.
     *
     * @param separator string
     * @param dataString string
     *
     * @returns {{nodes: *, header: *}}
     */
    static parseDataFile(separator, dataString) {
        dataString = dataString.split("\n");

        let header = dataString.shift().split(separator);

        return dataString.map((row) => {
            row = row.split(separator);
            let rowObject = {};

            for (let i = 0; i < header.length; i++) {
                rowObject[header[i]] = row[i];
            }

            return rowObject;
        });
    }

    /**
     * Returns formatted date-time string.
     *
     * @returns String
     */
    static getFormattedDate() {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    }

    /**
     * Returns formatted date-time string.
     *
     * @param filename String
     * @param text String
     */
    static downloadText(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    static colorNode(node, color) {
        node['color'] = color;

        return node;
    }
};

export default Tools;
