import Vue from 'vue'
import TmVueRadio from './TmVueRadio.vue'

TmVueRadio.install = function (V, options) {
    V.component(TmVueRadio.name, TmVueRadio);
};

export default TmVueRadio