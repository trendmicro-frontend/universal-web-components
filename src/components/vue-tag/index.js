import Vue from 'vue'
import TmVueTag from './VueTag.vue'

TmVueTag.install = function (V, options) {
    V.component(TmVueTag.name, TmVueTag);
};

export default TmVueTag