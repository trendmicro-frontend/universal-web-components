import Vue from 'vue'
import ActionButton from './ActionButton.vue'

const plugin = {
    install(Vue, options) {
        Vue.component('ActionButton', ActionButton)
    }
}

export default plugin