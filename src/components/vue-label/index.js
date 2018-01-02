import Vue from 'vue'
import TmVueLabel from './VueLabel.vue'

TmVueLabel.install = function (V, options) {
    V.component(TmVueLabel.name, TmVueLabel);
};

export default TmVueLabel