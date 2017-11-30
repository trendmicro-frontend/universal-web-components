(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
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

var TmVueRadio = { template: "<div class=\"radio\" :class=\"{'disabled':isDisabled}\"> <input type=\"radio\" :value=\"value\" :name=\"name\" @change=\"handleChange\" v-model=\"checked\" class=\"input-radio\" :disabled=\"isDisabled\" :class=\"{'disabled':disabledClass}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
    name: 'TmVueRadio',
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            value: ""
        },
        disabled: {
            type: Number,
            default: false
        },
        name: {
            type: String,
            default: ""
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false
        },
        disabledClass: function disabledClass() {
            return this.isDisabled && this.checked != this.value; //only add disabled class for the unchecked radio to stop hover color change.
        }
    },
    methods: {
        handleChange: function handleChange() {
            this.$nextTick(function () {
                this.$emit('change', this.checked);
            });
        },

        labelClick: function labelClick() {
            if (this.isDisabled) return;
            this.checked = this.value;
            this.handleChange();
        }
    }
};

TmVueRadio.install = function (V, options) {
    V.component(TmVueRadio.name, TmVueRadio);
};

var TmVueCheckbox = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" :value=\"value\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':isChecked,'disabled':disabledClass}\"> <label @click=\"lableClick\"><slot></slot></label> </div>",
    name: 'TmVueCheckbox',
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: {
            type: Number,
            default: 0
        },
        value: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false.
        },
        disabledClass: function disabledClass() {
            return this.isDisabled && this.checked.indexOf(this.value) == -1; //only add disabled class for the unchecked radio to stop hover color change.
        },
        isChecked: function isChecked() {
            return this.checked.indexOf(this.value) != -1;
        }
    },
    methods: {
        handleChange: function handleChange() {
            this.$nextTick(function () {
                this.$emit('change', this.checked);
            });
        },

        lableClick: function lableClick() {
            if (this.isDisabled) return;
            var index = this.checked.indexOf(this.value);
            if (index == -1) {
                this.checked.push(this.value);
            } else {
                this.checked.splice(index, 1);
            }
            this.handleChange();
        }
    }
};

TmVueCheckbox.install = function (V, options) {
    V.component(TmVueCheckbox.name, TmVueCheckbox);
};

var TmVueCheckboxCheckall = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':checked,'disabled':disabledClass,'checkbox-partical':this.indeterminate}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
    name: 'TmVueCheckboxCheckall',
    props: {
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false.
        },
        disabledClass: function disabledClass() {
            return this.isDisabled && !this.checked; //only add disabled class for the unchecked radio to stop hover color change.
        }
    },
    methods: {
        handleChange: function handleChange() {
            this.$nextTick(function () {
                this.$emit('change', this.checked);
            });
        },

        labelClick: function labelClick() {
            if (this.isDisabled) return;
            this.checked = !this.checked;
            this.handleChange();
        }
    }
};

TmVueCheckboxCheckall.install = function (V, options) {
    V.component(TmVueCheckboxCheckall.name, TmVueCheckboxCheckall);
};

var TmVueDropdown = { template: "<div class=\"btn-group\"> <button type=\"button\" :title=\"selectedText\" class=\"form-control btn btn-border dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" :disabled=\"isDisabled\" :class=\"widthClass\"> <span class=\"caret\"></span>{{selectedText}}</button> <ul class=\"dropdown-menu\"> <template v-for=\"item in param.droplist\"> <li @click=\"handleChange(item.value)\"><a href=\"javascript:void(0)\">{{item.display}}</a></li> </template> </ul> </div>",
    name: 'TmVueDropdown',
    props: {
        value: {
            type: String,
            default: 0
        },
        param: {
            type: Object,
            default: function _default() {
                return {
                    droplist: [], //list of for dropdown [{value:"xx","display":"xx"}],
                    disabled: Boolean,
                    width: "default" //["mini","sm","default","md","lg","auto"]
                };
            }
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.param.disabled === true ? true : false; //default disabled attribute is false
        },
        selectedText: function selectedText() {
            var index = 0;
            for (var i = 0; i < this.param.droplist.length; i++) {
                if (this.param.droplist[i].value == this.value) {
                    index = i;
                }
            }
            return this.param.droplist[index].display;
        },
        widthClass: function widthClass() {
            var class_list = { "mini": "input-width-mini", "sm": "input-width-sm", "default": "input-width-default", "md": "input-width-md", "lg": "input-width-lg", "auto": "" };
            return class_list[this.param.width ? this.param.width : 'default'];
        }
    },
    methods: {
        handleChange: function handleChange(value) {
            this.value = value;
            this.$nextTick(function () {
                this.$emit('change', this.value);
            });
        }
    }
};

TmVueDropdown.install = function (V, options) {
    V.component(TmVueDropdown.name, TmVueDropdown);
};

Vue.use(ActionButton);
Vue.use(TmVueRadio);
Vue.use(TmVueCheckbox);
Vue.use(TmVueCheckboxCheckall);
Vue.use(TmVueDropdown);

Object.defineProperty(exports, '__esModule', { value: true });

});
