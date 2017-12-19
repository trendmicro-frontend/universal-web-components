import Vue from 'vue'
import TmVueDropdown from './VueDropdown.vue'

TmVueDropdown.install = function (V, options) {
    V.component(TmVueDropdown.name, TmVueDropdown);
};

export default TmVueDropdown