import Vue from 'vue'
import TmVueInput from './VueInput.vue'

TmVueInput.install = function (V, options) {
    V.component(TmVueInput.name, TmVueInput);
};

export default TmVueInput