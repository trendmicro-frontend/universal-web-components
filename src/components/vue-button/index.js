import Vue from 'vue'
import TmVueButton from './VueButton.vue'

TmVueButton.install = function (V, options) {
    V.component(TmVueButton.name, TmVueButton);
};

export default TmVueButton