import Vue from 'vue'
import TmVueStepProcess from './VueStepProcess.vue'

TmVueStepProcess.install = function (V, options) {
    V.component(TmVueStepProcess.name, TmVueStepProcess);
};

export default TmVueStepProcess