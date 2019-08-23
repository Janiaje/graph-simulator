/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// Import font-awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// Import ApexCharts
import VueApexCharts from 'vue-apexcharts'
// Import Simulations
import GiantComponentSimulation from "./simulation/simulations/GiantComponentSimulation";

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Register external components
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('apexchart', VueApexCharts);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.mainDisplayedGraph = null;
window.eventHub = new Vue();

const app = new Vue({
    el: '#app',
    data() {
        return {
            graphHeight: 0,
            simulationEnded: () => mainDisplayedGraph.simulation = undefined,
            simulationTypes: [
                GiantComponentSimulation,
            ],
            simulations: [],
        }
    },

    methods: {
        handleResize() {
            this.graphHeight = window.innerHeight - 55;
        },

        clearGraph() {
            mainDisplayedGraph.clear();
        },

        editGraph() {
            eventHub.$emit('network-edit');
            // TODO: close the dropdown on click
            $('#modificationDropdown').dropdown('toggle');
        },

        runSimulation(simulation) {
            eventHub.$emit('loading-show');

            // TODO-low: find better solution: https://stackoverflow.com/questions/57536336
            this.$nextTick();

            requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                    mainDisplayedGraph.simulation = new simulation(mainDisplayedGraph.graph);

                    eventHub.$emit('loading-hide');
                    eventHub.$emit('simulation-loaded');
                }));

        }
    },

    created() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);

        // Create the list for the simulations menu
        this.simulationTypes.forEach(simulation => {
            this.simulations.push({
                name: simulation.getDisplayedName(),
                simulation: simulation,
            });
        });
    },

    mounted() {
        eventHub.$on('simulation-ended', this.simulationEnded);

        // Starting point for the application
        $('#generateGraph').modal('show');
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
        eventHub.$off('simulation-ended', this.simulationEnded);
    }
});
