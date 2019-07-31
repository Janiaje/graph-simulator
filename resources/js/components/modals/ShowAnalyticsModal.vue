<template>
    <modal :id="'showAnalytics'" :showFooter="false" :mountedCallback="mountedCallback">
        <template v-slot:header>
            Analytics
        </template>

        <template v-slot:body>
            <div class="list-group" v-for="info in analytics">
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
        </template>
    </modal>
</template>

<script>
    export default {
        name: "ShowAnalyticsModal",
        data() {
            return {
                analytics: [],
                mountedCallback: function () {
                    // this is the modal component
                    this.$parent.analytics = graph.getAnalytics();
                }
            }
        }
    }
</script>

<style scoped>

</style>
