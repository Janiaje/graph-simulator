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
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="exportGraph">
                Download
            </button>
        </template>
    </modal>
</template>

<script>
    import Tools from "../../graph/Tools";

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
                        data = mainDisplayedGraph.exportNodeCSV();
                        break;
                    case 'edgeListCSV':
                        data = mainDisplayedGraph.exportEdgeCSV();
                        break;
                    default:
                        return;
                }

                Tools.downloadText(`${this.type}_${Tools.getFormattedDate()}.csv`, data);
            }
        }
    }
</script>

<style scoped>

</style>
