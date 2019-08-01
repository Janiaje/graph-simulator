/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Tools from "./graph/Tools";
import Generator from "./graph/Generator";
import Graph from "./graph/Graph";
import SimulationStep from "./graph/SimulationStep";

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

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// TODO: remove window assignments
window.Tools = Tools;
window.Generator = Generator;
window.Graph = Graph;
window.SimulationStep = SimulationStep;

const app = new Vue({
    el: '#app',
    data() {
        return {
            graphHeight: 0,
        }
    },

    methods: {
        handleResize() {
            this.graphHeight = window.innerHeight - 55;
        },

        clearGraph() {
            mainDisplayedGraph.clear();
        }
    },

    created() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },

    mounted() {
        $('#generateGraph').modal('show')
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    }
});
