<template>
    <div id="vis-graph"/>
</template>

<script>
    import DisplayedGraph from "../displayedGraph/DisplayedGraph";

    export default {
        name: "VisGraph",
        mounted() {
            let container = document.getElementById('vis-graph');
            window.mainDisplayedGraph = new DisplayedGraph(container);
        }
    }
</script>

<style lang="scss">
    #vis-graph {
        height: 100%;
        outline: none;
    }

    .vis-network {
        outline: none;
    }
</style>
