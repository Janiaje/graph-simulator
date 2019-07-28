<template>
    <div id="vis-graph" style="height: 100%"/>
</template>

<script>
    import Graph from "../graph/Graph";

    export default {
        name: "VisGraph",
        mounted() {
            let container = document.getElementById('vis-graph');
            window.graph = new Graph(container);
        }
    }
</script>

<style scoped>

</style>
