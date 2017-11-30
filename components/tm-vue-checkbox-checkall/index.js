import Vue from 'vue'
import TmVueCheckboxCheckall from './TmVueCheckboxCheckall.vue'

TmVueCheckboxCheckall.install = function (V, options) {
    V.component(TmVueCheckboxCheckall.name, TmVueCheckboxCheckall);
};

export default TmVueCheckboxCheckall