import Vue from 'vue'
import TmVueNotification from './VueNotification.vue'

TmVueNotification.install = function (V, options) {
    V.component(TmVueNotification.name, TmVueNotification);
};

export default TmVueNotification