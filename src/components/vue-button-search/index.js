import Vue from 'vue'
import TmVueSearchButton from './VueSearchButton.vue'

TmVueSearchButton.install = function (V, options) {
    V.component(TmVueSearchButton.name, TmVueSearchButton);
};

export default TmVueSearchButton