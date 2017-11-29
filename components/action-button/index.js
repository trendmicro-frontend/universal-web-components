import Vue from 'vue'
import ActionButton from './ActionButton.vue'

ActionButton.install = function (v, options) {
    v.component(ActionButton.name, ActionButton);
};

export default ActionButton