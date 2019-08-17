<template>
    <div id="home">
        <vis-graph/>

        <simulation-actions/>
        <simulation-chart/>

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
    #home {
        height: 100%;
    }
</style>
