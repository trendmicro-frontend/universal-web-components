import Vue from 'vue'
import TmVueFilterInput from './VueFilterInput.vue'

TmVueFilterInput.install = function (V, options) {
    V.component(TmVueFilterInput.name, TmVueFilterInput);
};

export default TmVueFilterInput