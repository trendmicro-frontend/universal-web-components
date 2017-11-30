import Vue from 'vue'
import TmVueCheckbox from './TmVueCheckbox.vue'

TmVueCheckbox.install = function (V, options) {
    V.component(TmVueCheckbox.name, TmVueCheckbox);
};

export default TmVueCheckbox