import Vue from 'vue'
import TmVueModal from './VueModal.vue'

TmVueModal.install = function (V, options) {
    V.component(TmVueModal.name, TmVueModal);
};

export default TmVueModal