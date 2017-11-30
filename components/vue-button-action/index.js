import Vue from 'vue'
import TmVueActionButton from './VueActionButton.vue'

TmVueActionButton.install = function (V, options) {
    V.component(TmVueActionButton.name, TmVueActionButton);
};

export default TmVueActionButton