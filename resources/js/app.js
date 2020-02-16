/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// Import font-awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// Import Analyses
import AverageDegreeAnalysis from "./analysis/analyses/AverageDegreeAnalysis";
// Import Simulations
import DijkstraSimulation from "./simulation/simulations/DijkstraSimulation";
import GiantComponentSimulation from "./simulation/simulations/GiantComponentSimulation";
import RandomModelGNPSimulation from "./simulation/simulations/RandomModelGNPSimulation";
import RandomModelGNLSimulation from "./simulation/simulations/RandomModelGNLSimulation";
// Others
import Tools from "./graph/Tools";

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

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.mainDisplayedGraph = null;
window.eventHub = new Vue();

window.app = new Vue({
    el: '#app',
    data() {
        return {
            graphHeight: 0,
            analysisTypes: [
                AverageDegreeAnalysis,
            ],
            analyses: [],
            analysesMenuItems: [],
            analysesFilter: '',
            simulationTypes: [
                DijkstraSimulation,
                GiantComponentSimulation,
                RandomModelGNPSimulation,
                RandomModelGNLSimulation,
            ],
            simulations: [],
            simulationsMenuItems: [],
            simulationsFilter: '',
            showDegrees: false,
            physicsAllowed: true
        }
    },

    methods: {
        handleResize() {
            let navbarHeight = 55;

            if (this.$refs.navbar !== undefined) {
                navbarHeight = this.$refs.navbar.clientHeight;
            }

            this.graphHeight = window.innerHeight - navbarHeight;
        },

        simulationEnded() {
            mainDisplayedGraph.simulation = undefined
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
            simulation.askQuestionBeforeRun(answer => {
                Tools.runWithLoadingScreen(() => {
                    let startGraph = simulation.createStartGraphFromAnswer(answer);
                    mainDisplayedGraph.simulation = new simulation(startGraph, answer);
                    eventHub.$emit('simulation-loaded');
                });
            });
        },

        showAnalysis(analysis) {
            analysis.display();
        },

        resetView() {
            mainDisplayedGraph.network.fit({
                offset: {x: 0, y: 0},
                duration: 1000,
                easingFunction: "easeInOutQuad",
                animation: true
            })
        },
    },

    watch: {
        showDegrees(value) {
            mainDisplayedGraph.showDegrees(value);
        },

        physicsAllowed(value) {
            mainDisplayedGraph.physicsAllowed(value);
        },

        analysesFilter(value) {
            this.analysesMenuItems = this.analyses.filter(analysis => analysis.name.toLowerCase().includes(value.toLowerCase()));
        },

        simulationsFilter(value) {
            this.simulationsMenuItems = this.simulations.filter(analysis => analysis.name.toLowerCase().includes(value.toLowerCase()));
        }
    },

    created() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);

        // Create the list for the Analise menu
        this.analysisTypes.forEach(analysis => {
            this.analyses.push({
                name: analysis.getName(),
                analysis: analysis,
            });
        });
        this.analysesMenuItems = this.analyses;

        // Create the list for the Simulate menu
        this.simulationTypes.forEach(simulation => {
            this.simulations.push({
                name: simulation.getName(),
                simulation: simulation,
            });
        });
        this.simulationsMenuItems = this.simulations;
    },

    mounted() {
        eventHub.$on('simulation-ended', this.simulationEnded);

        // Starting point for the application
        $('#generateGraph').modal('show');

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
        eventHub.$off('simulation-ended', this.simulationEnded);
    }
});
