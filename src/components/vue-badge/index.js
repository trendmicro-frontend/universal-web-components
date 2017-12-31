import Vue from 'vue'
import TmVueBadge from './VueBadge.vue'

TmVueBadge.install = function (V, options) {
    V.component(TmVueBadge.name, TmVueBadge);
};

export default TmVueBadge