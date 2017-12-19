define(['exports', 'vue'], function (exports, Vue) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

var TmVueActionButton$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('button', { staticClass: "btn", class: _vm.buttonStatus, attrs: { "disabled": _vm.disabled }, on: { "click": _vm.clicked } }, [_c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.isLoading, expression: "isLoading" }], staticClass: "glyphicon-loader" }), _vm._v(_vm._s(_vm.val) + " ")]);
  }, staticRenderFns: [],
  name: "TmVueActionButton",
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
      if (this.isPrimary) return "btn-primary";else return "btn-default";
    }
  },
  methods: {
    clicked: function clicked() {
      this.$emit("clicked");
    }
  }
};

TmVueActionButton$1.install = function (V, options) {
    V.component(TmVueActionButton$1.name, TmVueActionButton$1);
};

var TmVueRadio = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "radio", class: { 'disabled': _vm.isDisabled } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.checked, expression: "checked" }], staticClass: "input-radio", class: { 'disabled': _vm.disabledClass }, attrs: { "type": "radio", "name": _vm.name, "disabled": _vm.isDisabled }, domProps: { "value": _vm.value, "checked": _vm._q(_vm.checked, _vm.value) }, on: { "change": [function ($event) {
                    _vm.checked = _vm.value;
                }, _vm.handleChange] } }), _vm._v(" "), _c('label', { on: { "click": _vm.labelClick } }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
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

var TmVueCheckbox = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "checkbox", class: { 'disabled': _vm.isDisabled } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.checked, expression: "checked" }], staticClass: "input-checkbox", class: { 'checked': _vm.isChecked, 'disabled': _vm.disabledClass }, attrs: { "type": "checkbox", "disabled": _vm.isDisabled }, domProps: { "value": _vm.value, "checked": Array.isArray(_vm.checked) ? _vm._i(_vm.checked, _vm.value) > -1 : _vm.checked }, on: { "change": [function ($event) {
                    var $$a = _vm.checked,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
                        var $$v = _vm.value,
                            $$i = _vm._i($$a, $$v);if ($$el.checked) {
                            $$i < 0 && (_vm.checked = $$a.concat([$$v]));
                        } else {
                            $$i > -1 && (_vm.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                        }
                    } else {
                        _vm.checked = $$c;
                    }
                }, _vm.handleChange] } }), _vm._v(" "), _c('label', { on: { "click": _vm.lableClick } }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
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

var TmVueCheckallCheckbox$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "checkbox", class: { 'disabled': _vm.isDisabled } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.checked, expression: "checked" }], staticClass: "input-checkbox", class: { 'checked': _vm.checked, 'disabled': _vm.disabledClass, 'checkbox-partical': this.indeterminate }, attrs: { "type": "checkbox", "disabled": _vm.isDisabled }, domProps: { "checked": Array.isArray(_vm.checked) ? _vm._i(_vm.checked, null) > -1 : _vm.checked }, on: { "change": [function ($event) {
                    var $$a = _vm.checked,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
                        var $$v = null,
                            $$i = _vm._i($$a, $$v);if ($$el.checked) {
                            $$i < 0 && (_vm.checked = $$a.concat([$$v]));
                        } else {
                            $$i > -1 && (_vm.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                        }
                    } else {
                        _vm.checked = $$c;
                    }
                }, _vm.handleChange] } }), _vm._v(" "), _c('label', { on: { "click": _vm.labelClick } }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'TmVueCheckallCheckbox',
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

TmVueCheckallCheckbox$1.install = function (V, options) {
    V.component(TmVueCheckallCheckbox$1.name, TmVueCheckallCheckbox$1);
};

var TmVueDropdown = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "btn-group" }, [_c('button', { staticClass: "form-control btn btn-border dropdown-toggle", class: _vm.widthClass, attrs: { "type": "button", "title": _vm.selectedText, "data-toggle": "dropdown", "aria-expanded": "false", "disabled": _vm.isDisabled } }, [_c('span', { staticClass: "caret" }), _vm._v(_vm._s(_vm.selectedText))]), _vm._v(" "), _c('ul', { staticClass: "dropdown-menu" }, [_vm._l(_vm.param.droplist, function (item) {
            return [_c('li', { on: { "click": function click($event) {
                        _vm.handleChange(item.value);
                    } } }, [_c('a', { attrs: { "href": "javascript:void(0)" } }, [_vm._v(_vm._s(item.display))])])];
        })], 2)]);
    }, staticRenderFns: [],
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

var TmVueSearchButton$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "search-button" }, [_c('div', { staticClass: "input-group has-clear", staticStyle: { "width": "100%" } }, [_c('div', { staticClass: "input-icon-group" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.textVal, expression: "textVal" }], staticClass: "form-control", staticStyle: { "width": "100%" }, attrs: { "type": "text", "placeholder": _vm.placeholder }, domProps: { "value": _vm.textVal }, on: { "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }_vm.textVal = $event.target.value;
        }, _vm.updated], "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }_vm.changed($event);
        } } }), _vm._v(" "), _c('span', { staticClass: "form-control-clear icon icon-cancel hidden" })]), _vm._v(" "), _c('span', { staticClass: "input-group-btn" }, [_c('button', { staticClass: "btn btn-default btn-icon-only", attrs: { "type": "button" }, on: { "click": _vm.changed } }, [_c('span', { staticClass: "fa fa-search" })])])])]);
  }, staticRenderFns: [], _scopeId: 'data-v-5ae5e1ad',
  name: "TmVueSearchButton",
  props: {
    placeholder: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      textVal: ""
    };
  },
  methods: {
    changed: function changed(e) {
      this.$emit("changed", this.textVal);
    },
    updated: function updated() {
      this.$emit("updated", this.textVal);
    }
  },

  mounted: function mounted() {
    var self = this;
    /**
             * todo
             * should bind custom element
             */
    $('.has-clear input[type="text"]').on("input propertychange", function () {
      var $this = $(this);
      var visible = Boolean($this.val());
      $this.siblings(".form-control-clear").toggleClass("hidden", !visible);
    }).trigger("propertychange");

    $(".form-control-clear").click(function () {
      self.textVal = "";
      $(this).siblings('input[type="text"]').val("").trigger("propertychange").focus();
    });
  }
};

TmVueSearchButton$1.install = function (V, options) {
    V.component(TmVueSearchButton$1.name, TmVueSearchButton$1);
};

var Icon$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.classes, style: _vm.styles });
  }, staticRenderFns: [],
  name: "Icon",
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    classes: function classes() {
      return "" + this.type;
    },
    styles: function styles() {
      var style = {};

      if (this.size) {
        style["font-size"] = this.size + "px";
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    }
  }
};

var isServer = Vue.prototype.$isServer;
// 判断参数是否是其中之一
function oneOf(value, validList) {
    for (var i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}





// watch DOM change
var MutationObserver = isServer ? false : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;

// getStyle


// Warn


// scrollTop animation


// Find component downward


// Find components downward


/* istanbul ignore next */


/* istanbul ignore next */


/* istanbul ignore next */

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var prefixCls = "btn";

var TmVueButton$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('button', { class: _vm.classes, attrs: { "type": _vm.htmlType, "disabled": _vm.disabled }, on: { "click": _vm.handleClick } }, [_vm.loading ? _c('Icon', { attrs: { "type": "loader loader-small" } }) : _vm._e(), _vm._v(" "), _vm.icon && !_vm.loading ? _c('Icon', { attrs: { "type": _vm.icon } }) : _vm._e(), _vm._v(" "), _vm.showSlot ? _c('span', { ref: "slot" }, [_vm._t("default")], 2) : _vm._e()], 1);
  }, staticRenderFns: [],
  name: "TmVueButton",
  components: { Icon: Icon$1 },
  props: {
    type: {
      validator: function validator(value) {
        return oneOf(value, ["primary", "danger", "border", "link", "default"]);
      }
    },
    shape: {
      validator: function validator(value) {
        return oneOf(value, ["circle", "circle-outline"]);
      }
    },
    size: {
      validator: function validator(value) {
        return oneOf(value, ["xs", "sm", "lg", "block"]);
      }
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: "button",
      validator: function validator(value) {
        return oneOf(value, ["button", "submit", "reset"]);
      }
    },
    icon: String,
    full: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      showSlot: true
    };
  },

  computed: {
    classes: function classes() {
      var _ref;

      return ["" + prefixCls, (_ref = {}, defineProperty(_ref, prefixCls + "-" + this.type, !!this.type), defineProperty(_ref, prefixCls + "-" + this.size, !!this.size), defineProperty(_ref, prefixCls + "-block", !!this.full), defineProperty(_ref, prefixCls + "-icon-only", !this.showSlot && (!!this.icon || this.loading)), _ref)];
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit("click", event);
    }
  },
  mounted: function mounted() {
    this.showSlot = this.$slots.default !== undefined;
  }
};

TmVueButton$1.install = function (V, options) {
    V.component(TmVueButton$1.name, TmVueButton$1);
};

var prefixCls$2 = "breadcrumb";

var Breadcrumb = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ol', { class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: "TmVueBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    }
  },
  computed: {
    classes: function classes() {
      return "" + prefixCls$2;
    }
  },
  mounted: function mounted() {
    this.updateChildren();
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      _this.updateChildren();
    });
  },

  methods: {
    updateChildren: function updateChildren() {
      var _this2 = this;

      this.$children.forEach(function (child) {
        child.separator = _this2.separator;
      });
    }
  },
  watch: {
    separator: function separator() {
      this.updateChildren();
    }
  }
};

var prefixCls$3 = "tm-vue-breadcrumb-item";

var BreadcrumbItem = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.to ? _c('li', [_c('a', { class: _vm.linkClasses, attrs: { "href": _vm.to }, on: { "click": _vm.handleClick } }, [_vm._t("default")], 2)]) : _c('li', { staticClass: "active" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: "TmVueBreadcrumbItem",
  props: {
    href: {
      type: [Object, String]
    },
    to: {
      type: [Object, String]
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    linkClasses: function linkClasses() {
      return prefixCls$3 + '-link';
    }
  },
  methods: {
    handleClick: function handleClick() {
      var isRoute = this.$router;
      if (isRoute) {
        this.replace ? this.$router.replace(this.to) : this.$router.push(this.to);
      } else {
        window.location.href = this.to;
      }
    }
  }
};

Breadcrumb.Item = BreadcrumbItem;

Vue.use(TmVueActionButton$1);
Vue.use(TmVueRadio);
Vue.use(TmVueCheckbox);
Vue.use(TmVueCheckallCheckbox$1);
Vue.use(TmVueDropdown);
Vue.use(TmVueSearchButton$1);
Vue.use(TmVueButton$1);
Vye.use(Breadcrumb);

Object.defineProperty(exports, '__esModule', { value: true });

});
