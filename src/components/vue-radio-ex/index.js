import Vue from 'vue'
import TmVueRadioEx from './VueRadioEx.vue'
import TmVueRadioGroup from './VueRadioExGroup.vue';
TmVueRadioEx.install = function (V, options) {
    V.component(TmVueRadioEx.name, TmVueRadioEx);
};
TmVueRadioGroup.install = function (V, options) {
    V.component(TmVueRadioGroup.name, TmVueRadioGroup);
};
export { TmVueRadioEx, TmVueRadioGroup }