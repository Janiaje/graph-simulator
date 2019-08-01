<template>
    <div id="vis-graph" style="height: 100%"/>
</template>

<script>
    import DisplayedGraph from "../graph/DisplayedGraph";

    export default {
        name: "VisGraph",
        mounted() {
            let container = document.getElementById('vis-graph');
            window.mainDisplayedGraph = new DisplayedGraph(container);
        }
    }
</script>

<style scoped>

</style>
