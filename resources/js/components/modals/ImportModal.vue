<template>
    <modal :id="'importGraph'">
        <template v-slot:header>
            Import
        </template>

        <template v-slot:body>
            <div class="form-group">
                <label for="exportType">Choose import type</label>
                <select class="form-control" id="exportType" v-model="type">
                    <option value="CSV">CSV</option>
                    <option value="GephiJSON">Gephi JSON</option>
                </select>
            </div>
        </template>

        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

        <template v-slot:footer>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="importGraph" autofocus>
                Generate
            </button>
        </template>
    </modal>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'

    export default {
        name: "ImportModal",
        components: {
            vueDropzone: vue2Dropzone
        },

        data() {
            return {
                type: 'CSV',
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    headers: {"My-Awesome-Header": "header value"}
                }
            }
        },

        methods: {
            importGraph() {
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
            }
        }
    }
</script>

<style scoped>

</style>
