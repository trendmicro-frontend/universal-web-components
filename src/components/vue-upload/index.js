import Vue from 'vue'
import TmVueUpload from './VueUpload.vue'

TmVueUpload.install = function (V, options) {
    V.component(TmVueUpload.name, TmVueUpload);
};

export default TmVueUpload