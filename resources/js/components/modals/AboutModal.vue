<template>
    <modal :id="'about'">
        <template v-slot:header>
            About
        </template>

        <template v-slot:body>
            <div class="row text-center noselect">
                <div class="col-6">
                    <h6>Version</h6>
                    <p class="m-0">1.0.0</p>
                </div>
                <div class="col-6">
                    <h6>Created by</h6>
                    <p class="m-0">
                        <a href="https://github.com/Janiaje" target="_blank">
                            <b>Janiaje</b>
                        </a>
                    </p>
                </div>
            </div>
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
