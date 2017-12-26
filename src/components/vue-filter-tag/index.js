import Vue from 'vue'
import TmVueFilterTag from './VueFilterTag.vue'

TmVueFilterTag.install = function (V, options) {
    V.component(TmVueFilterTag.name, TmVueFilterTag);
};

export default TmVueFilterTag