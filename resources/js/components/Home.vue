<template>
    <div id="home">
        <vis-graph/>

        <edit-actions/>

        <simulation-actions/>
        <simulation-chart/>

        <loading-modal/>
        <import-modal/>
        <export-modal/>
        <generate-graph-modal/>

        <question-modal/>
        <about-modal/>
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
