import Vue from 'vue'
import TmVueAutosizeTextarea from './VueAutosizeTextarea.vue'

TmVueAutosizeTextarea.install = function (V, options) {
    V.component(TmVueAutosizeTextarea.name, TmVueAutosizeTextarea);
};

export default TmVueAutosizeTextarea