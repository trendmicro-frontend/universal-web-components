import Vue from 'vue'
import TmVueGroupSelect from './TmVueGroupSelect.vue'

TmVueGroupSelect.install = function (V, options) {
    V.component(TmVueGroupSelect.name, TmVueGroupSelect);
};

export default TmVueGroupSelect