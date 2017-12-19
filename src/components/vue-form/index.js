import Vue from 'vue'
import TmVueForm from './VueForm.vue'

TmVueForm.install = function (V, options) {
    V.component(TmVueForm.name, TmVueForm);
};

export default TmVueForm