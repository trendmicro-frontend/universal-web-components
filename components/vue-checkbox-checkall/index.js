import Vue from 'vue'
import TmVueCheckboxCheckall from './VueCheckboxCheckall.vue'

TmVueCheckboxCheckall.install = function (V, options) {
    V.component(TmVueCheckboxCheckall.name, TmVueCheckboxCheckall);
};

export default TmVueCheckboxCheckall