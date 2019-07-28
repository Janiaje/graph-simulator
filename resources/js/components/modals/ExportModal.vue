<template>
    <modal :id="'exportGraph'">
        <template v-slot:header>
            Export
        </template>

        <template v-slot:body>
            <div class="form-group">
                <label for="exportType">Choose export type</label>
                <select class="form-control" id="exportType" v-model="type">
                    <option value="nodeListCSV">Node List CSV</option>
                    <option value="edgeListCSV">Edge List CSV</option>
                </select>
            </div>
        </template>

        <template v-slot:footer>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="exportGraph" autofocus>
                Generate
            </button>
        </template>
    </modal>
</template>

<script>
    export default {
        name: "ExportModal",
        data() {
            return {
                type: 'nodeListCSV'
            }
        },

        methods: {
            exportGraph() {
                let data;

                switch (this.type) {
                    case 'nodeListCSV':
                        data = graph.exportNodeCSV();
                        break;
                    case 'edgeListCSV':
                        data = graph.exportEdgeCSV();
                        break;
                    default:
                        return;
                }

                this.download(`${this.type}_${this.getFormattedDate()}.csv`, data);
            },

            download(filename, text) {
                let element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            },

            getFormattedDate() {
                const date = new Date();
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
            }
        }
    }
</script>

<style scoped>

</style>
