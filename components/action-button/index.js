import Vue from 'vue'
import ActionButton from './ActionButton.vue'

ActionButton.install = function (V, options) {
    V.component(ActionButton.name, ActionButton);
};

export default ActionButton