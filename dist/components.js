define(['exports', 'vue'], function (exports, Vue) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

var ActionButton = { template: "<button class=\"btn\" :class=\"buttonStatus\" :disabled=\"disabled\" v-on:click=\"clicked\"> <span class=\"glyphicon-loader\" v-show=\"isLoading\"></span>{{ val }} </button>",
    name: 'ActionButton',
    props: {
        name: {
            type: String,
            default: null
        },
        loadingName: {
            type: String,
            default: null
        },
        isPrimary: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            // show_name:this.param.name,
            // is_disabled:'',
        };
    },
    computed: {
        val: function val() {
            if (this.isLoading) {
                return this.loadingName;
            } else {
                return this.name;
            }
        },
        buttonStatus: function buttonStatus() {
            if (this.isPrimary) return 'btn-primary';else return 'btn-default';
        }
    },
    methods: {
        clicked: function clicked() {
            this.$emit("clicked");
        }
    }
};

ActionButton.install = function (V, options) {
    V.component(ActionButton.name, ActionButton);
};

Vue.use(ActionButton);

Object.defineProperty(exports, '__esModule', { value: true });

});
