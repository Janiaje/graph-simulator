<template>
    <modal :id="'about'">
        <template v-slot:header>
            About
        </template>

        <template v-slot:body>
            <h5>Version</h5>
            <p>
                1.0.0
            </p>
            <h5>Created by</h5>
            <p class="m-0">
                <a href="https://github.com/Janiaje" target="_blank">
                    <b>Janiaje</b>
                </a>
            </p>
        </template>
    </modal>
</template>

<script>
    export default {
        name: "AboutModal"
    }
</script>

<style scoped>

</style>
