<template>
    <div style="height: 100%">
        <vis-graph/>

        <simulation-actions v-if="$parent.simulation"/>
        <!-- TODO: display only if needed -->
        <simulation-chart v-if="$parent.simulation"/>

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

</style>
