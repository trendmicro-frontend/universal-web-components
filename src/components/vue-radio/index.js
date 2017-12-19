import Vue from 'vue'
import TmVueRadio from './VueRadio.vue'

TmVueRadio.install = function (V, options) {
    V.component(TmVueRadio.name, TmVueRadio);
};

export default TmVueRadio