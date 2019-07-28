<template>
    <modal :id="'showAnalytics'" :showFooter="false">
        <template v-slot:header>
            Analytics
        </template>

        <template v-slot:body>
            <div class="list-group">
                <div class="row">
                    <div class="col-3" v-for="info in analytics">
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{ info.title }}</h5>
                                <!--<small>3 days ago</small>-->
                            </div>
                            <p class="mb-1" v-html="info.value"></p>
                            <small>
                                <a :href="info.helpLink" target="_blank">Documentation</a>
                            </small>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </modal>
</template>

<script>
    export default {
        name: "ShowAnalyticsModal",
        data() {
            return {
                analytics: []
            }
        },

        mounted() {
            this.analytics = graph.getAnalytics(this.directedGraph);
        }
    }
</script>

<style scoped>

</style>
