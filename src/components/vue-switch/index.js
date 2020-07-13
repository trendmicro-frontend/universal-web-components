import Vue from 'vue'
import TmVueSwitch from './VueSwitch.vue'

TmVueSwitch.install = function (V, options) {
    V.component(TmVueSwitch.name, TmVueSwitch);
};

export default TmVueSwitch