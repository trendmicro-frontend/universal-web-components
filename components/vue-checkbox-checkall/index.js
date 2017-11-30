import Vue from 'vue'
import TmVueCheckallCheckbox from './VueCheckboxCheckall.vue'

TmVueCheckallCheckbox.install = function (V, options) {
    V.component(TmVueCheckallCheckbox.name, TmVueCheckallCheckbox);
};

export default TmVueCheckallCheckbox