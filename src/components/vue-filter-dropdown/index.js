import Vue from 'vue'
import TmVueFilterDropdown from './VueFilterDropdown.vue'

TmVueFilterDropdown.install = function (V, options) {
    V.component(TmVueFilterDropdown.name, TmVueFilterDropdown);
};

export default TmVueFilterDropdown