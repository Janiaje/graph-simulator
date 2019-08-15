<template>
    <div>
        <vis-graph/>

        <simulation-actions v-show="$parent.simulation"/>
        <simulation-chart
            v-show="$parent.simulation !== false && mainDisplayedGraph.simulation.isLineChartDisplayed()"/>

        <loading-modal/>
        <import-modal/>
        <export-modal/>
        <generate-graph-modal/>
        <show-analytics-modal/>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    div {
        height: 100%;
    }
</style>
