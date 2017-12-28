define(['vue', 'jquery', 'bootstrap', 'lodash'], function (Vue, jquery, bootstrap, _) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;
_ = _ && _.hasOwnProperty('default') ? _['default'] : _;

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
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "radio", class: { 'disabled': _vm.isDisabled } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.checked, expression: "checked" }], staticClass: "input-radio", class: { 'disabled': _vm.disabledClass }, attrs: { "type": "radio", "disabled": _vm.isDisabled }, domProps: { "value": _vm.value, "checked": _vm._q(_vm.checked, _vm.value) }, on: { "change": [function ($event) {
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
            type: Number,
            default: ""
        },
        value: {
            type: [String, Number],
            value: ""
        },
        disabled: {
            type: Boolean,
            default: false
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
            type: [Boolean, Array],
            default: ""
        },
        value: {
            type: [String, Number],
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
            return this.isDisabled && (this.isBoolean ? !this.checked : this.checked.indexOf(this.value) == -1); //only add disabled class for the unchecked radio to stop hover color change.
        },
        isChecked: function isChecked() {
            if (this.isBoolean) {
                return this.checked;
            } else {
                return this.checked.indexOf(this.value) != -1;
            }
        },
        isBoolean: function isBoolean() {
            return typeof this.checked === 'boolean';
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
            if (this.isBoolean) {
                this.checked = !this.checked;
            } else {
                var index = this.checked.indexOf(this.value);
                if (index == -1) {
                    this.checked.push(this.value);
                } else {
                    this.checked.splice(index, 1);
                }
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

window.jQuery = jquery;

var TmVueDropdown = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "btn-group" }, [_c('button', { staticClass: "form-control btn btn-border dropdown-toggle", class: _vm.widthClass, attrs: { "type": "button", "title": _vm.selectedText, "data-toggle": "dropdown", "aria-expanded": "false", "disabled": _vm.isDisabled } }, [_c('span', { staticClass: "caret" }), _vm._v(_vm._s(_vm.selectedText))]), _vm._v(" "), _c('ul', { staticClass: "dropdown-menu" }, [_vm._l(_vm.list, function (item) {
            return [_c('li', { on: { "click": function click($event) {
                        _vm.handleChange(item.value);
                    } } }, [_c('a', { attrs: { "href": "javascript:void(0)" } }, [_vm._v(_vm._s(item.display))])])];
        })], 2)]);
    }, staticRenderFns: [],
    name: 'TmVueDropdown',
    props: {
        value: {
            type: [String, Number],
            default: 0
        },
        list: {
            type: Array,
            default: []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: 'default'
        }
    },
    computed: {
        isDisabled: function isDisabled() {
            return this.disabled === true ? true : false; //default disabled attribute is false
        },
        selectedText: function selectedText() {
            var index = 0;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].value == this.value) {
                    index = i;
                }
            }
            return this.list[index].display;
        },
        widthClass: function widthClass() {
            var class_list = { "mini": "input-width-mini", "sm": "input-width-sm", "default": "input-width-default", "md": "input-width-md", "lg": "input-width-lg", "auto": "" };
            return class_list[this.width ? this.width : 'default'];
        }
    },
    methods: {
        handleChange: function handleChange(value) {
            this.value = value;
            this.$nextTick(function () {
                this.$emit('input', this.value);
            });
        }
    }
};

TmVueDropdown.install = function (V, options) {
    V.component(TmVueDropdown.name, TmVueDropdown);
};

var prefixCls = "uwc";

var TmVueSearchButton$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { staticClass: "input-group has-clear", staticStyle: { "width": "100%" } }, [_c('div', { staticClass: "input-icon-group", staticStyle: { "width": "100%" } }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.textVal, expression: "textVal" }], staticClass: "form-control", staticStyle: { "width": "100%" }, attrs: { "type": "text", "placeholder": _vm.placeholder }, domProps: { "value": _vm.textVal }, on: { "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }_vm.textVal = $event.target.value;
        }, _vm.updated], "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }_vm.changed($event);
        } } }), _vm._v(" "), _c('span', { staticClass: "form-control-clear icon icon-cancel hidden" })]), _vm._v(" "), _c('span', { staticClass: "input-group-btn" }, [_c('button', { staticClass: "btn btn-default btn-icon-only", attrs: { "type": "button" }, on: { "click": _vm.changed } }, [_c('span', { staticClass: "fa fa-search" })])])])]);
  }, staticRenderFns: [],
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
  },
  computed: {
    classes: function classes() {
      return ['' + prefixCls];
    }
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


// Find components upward
function findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    var parent = context.$parent;
    var name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
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

var prefixCls$1 = "btn";

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

      return ["" + prefixCls$1, (_ref = {}, defineProperty(_ref, prefixCls$1 + "-" + this.type, !!this.type), defineProperty(_ref, prefixCls$1 + "-" + this.size, !!this.size), defineProperty(_ref, prefixCls$1 + "-block", !!this.full), defineProperty(_ref, prefixCls$1 + "-icon-only", !this.showSlot && (!!this.icon || this.loading)), _ref)];
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

var prefixCls$3 = "breadcrumb";

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
      return "" + prefixCls$3;
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

var prefixCls$4 = "tm-vue-breadcrumb-item";

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
      return prefixCls$4 + '-link';
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

var TmVueFilterTag$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "Tokenize tokenize", class: { disabled: _vm.disabled }, style: { width: _vm.width_display }, attrs: { "tabindex": "0" }, on: { "click": _vm.showInput } }, [_c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.selected_list.length > 0, expression: "selected_list.length > 0" }], staticClass: "icon icon-cancel", on: { "click": _vm.removeAll } }), _vm._v(" "), _c('ul', { staticClass: "TokensContainer tag-editor", attrs: { "tabindex": "0" } }, [_c('li', { directives: [{ name: "show", rawName: "v-show", value: _vm.showPlaceholder, expression: "showPlaceholder" }], staticClass: "Placeholder placeholder" }, [_vm._v("Select...")]), _vm._v(" "), _vm._l(_vm.selected_list, function (item) {
      return _c('li', { staticClass: "Token" }, [_c('a', { staticClass: "Close" }, [_c('span', { staticClass: "icon icon-cancel", attrs: { "tabindex": "0" }, on: { "click": function click($event) {
            $event.stopPropagation();_vm.removeItem(item.id);
          } } })]), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.name))])]);
    }), _vm._v(" "), _c('li', { staticClass: "TokenSearch" }, [_c('input', { directives: [{ name: "focus", rawName: "v-focus", value: _vm.focus, expression: "focus" }, { name: "model", rawName: "v-model", value: _vm.text_value, expression: "text_value" }], attrs: { "disabled": _vm.disabled, "size": "8" }, domProps: { "value": _vm.text_value }, on: { "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }_vm.selectNextItem($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }_vm.selectPreviousItem($event);
        }], "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }_vm.addSelectItem($event);
        }, "focusout": function focusout($event) {
          _vm.hideInput($event);
        }, "input": function input($event) {
          if ($event.target.composing) {
            return;
          }_vm.text_value = $event.target.value;
        } } })])], 2), _vm._v(" "), _c('ul', { staticClass: "Dropdown dropdown-menu", style: { display: _vm.dropdown_display, width: _vm.width_display }, attrs: { "tabindex": "0" } }, [_vm._l(_vm.showInitList, function (item) {
      return _c('li', { directives: [{ name: "show", rawName: "v-show", value: _vm.showInitList.length > 0, expression: "showInitList.length>0" }], class: { Hover: item.hover }, attrs: { "tabindex": "0", "data": "for-select" }, on: { "mouseover": function mouseover($event) {
            _vm.setHoverItem(item.id);
          }, "mouseout": _vm.clearAllHover, "click": function click($event) {
            $event.stopPropagation();_vm.addItem(item.id);
          } } }, [_vm._v(_vm._s(item.name))]);
    }), _vm._v(" "), _c('li', { directives: [{ name: "show", rawName: "v-show", value: _vm.showInitList.length == 0, expression: "showInitList.length==0" }], staticClass: "no-matches", attrs: { "tabindex": "0" } }, [_vm._v("No matches found")])], 2)]);
  }, staticRenderFns: [], _scopeId: 'data-v-47dc18c2',
  name: 'TmVueFilterTag',
  props: {
    initial_list: {
      type: Array,
      default: []
    },
    selected_list: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      focus: false,
      text_value: '',
      current_hover_id: '',
      new_init_list: _.map(this.initial_list, function (item) {
        return _.extend({}, item, { hover: false });
      })
    };
  },
  computed: {
    dropdown_display: function dropdown_display() {
      return this.focus ? 'block' : 'none';
    },
    width_display: function width_display() {
      return this.width ? this.width : '100%';
    },
    showPlaceholder: function showPlaceholder() {
      return this.selected_list.length == 0 && this.text_value.length == 0;
    },
    showInitList: function showInitList() {
      var _this = this;
      if (this.text_value.length == 0) return this.new_init_list;
      var tmp = this.new_init_list.filter(function (item) {
        if (item.name.toLowerCase().startsWith(_this.text_value.toLowerCase()) === false) return false;else return true;
      });
      return tmp;
    }
  },
  methods: {
    addItem: function addItem(id) {
      if (this.disabled) return;
      this.text_value = "";
      var remove_item = _.find(this.showInitList, function (item) {
        return item.id == id;
      });
      var i = this.showInitList.map(function (item) {
        return item.id;
      }).indexOf(id);
      this.showInitList.splice(i, 1);
      this.selected_list.push(remove_item);
      this.returnList();
    },
    removeAll: function removeAll(value) {
      if (this.disabled) return;
      this.text_value = "";
      var tmp = _.clone(this.selected_list);
      for (var i = 0; i < tmp.length; i++) {
        this.removeItem(tmp[i].id);
      }
      this.selected_list = [];
      this.returnList();
    },
    removeItem: function removeItem(id) {
      if (this.disabled) return;
      this.text_value = "";
      var remove_item = _.find(this.selected_list, function (item) {
        return item.id == id;
      });
      var i = this.selected_list.map(function (item) {
        return item.id;
      }).indexOf(id);
      this.selected_list.splice(i, 1);
      this.showInitList.push(remove_item);
      this.sortInitList();
      this.returnList();
    },
    selectNextItem: function selectNextItem() {
      if (this.showInitList.length > 0) {
        var index = this.getHoverItemIndex();
        this.clearAllHover();
        if (index == this.showInitList.length - 1) {
          index = 0;
        } else {
          index = index + 1;
        }
        this.setHoverItemFlag(index);
      }
    },
    selectPreviousItem: function selectPreviousItem() {
      var index = this.getHoverItemIndex();
      this.clearAllHover();
      if (index == 0 || index == -1) {
        index = this.showInitList.length - 1;
      } else {
        index = index - 1;
      }
      this.setHoverItemFlag(index);
    },
    setHoverItem: function setHoverItem(hover_id) {
      this.clearAllHover();
      var index = this.getItemIndexById(hover_id, this.new_init_list);
      this.setHoverItemFlag(index);
    },
    setHoverItemFlag: function setHoverItemFlag(index) {
      var tmp_object = _.clone(this.new_init_list[index]);
      tmp_object.hover = true;
      this.new_init_list.splice(index, 1, tmp_object);
    },
    getItemIndexById: function getItemIndexById(item_id, list) {
      return _.findIndex(list, function (item) {
        return item.id == item_id;
      });
    },
    getHoverItemIndex: function getHoverItemIndex() {
      return _.findIndex(this.new_init_list, 'hover');
    },
    addSelectItem: function addSelectItem() {
      var index = this.getHoverItemIndex();
      var id = this.new_init_list[index].id;
      this.addItem(id);
      this.returnList();
    },
    filterIintList: function filterIintList() {
      var tmp = this.showInitList;
    },
    showInput: function showInput() {
      if (this.disabled) return;
      this.focus = true;
      //clear the focus before show init list.
      this.clearAllHover();
      //hover on the first item when show the init list.
      if (this.showInitList.length > 0) {
        this.setHoverItemFlag(0);
      }
    },
    hideInput: function hideInput(e) {
      if (this.disabled) return;
      if (e.relatedTarget == this.$el.getElementsByClassName("TokensContainer")[0] || e.relatedTarget == this.$el.getElementsByClassName("Dropdown") || e.relatedTarget && e.relatedTarget.getAttribute("data") == "for-select") {
        var _this = this;
        setTimeout(function () {
          _this.$el.getElementsByTagName("input")[0].focus();
        }, 10);
        return;
      } else {
        this.focus = false;
      }
    },
    clearAllHover: function clearAllHover() {
      this.new_init_list = _.map(this.new_init_list, function (item) {
        item.hover = false;return item;
      });
    },
    sortInitList: function sortInitList() {
      this.showInitList.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    returnList: function returnList() {
      this.$emit('change', this.selected_list);
    }
  },
  directives: {
    focus: {
      componentUpdated: function componentUpdated(el, value) {
        if (value.value) {
          el.focus();
        }
      }
    }
  },
  mounted: function mounted() {
    this.sortInitList();
  }
};

TmVueFilterTag$1.install = function (V, options) {
    V.component(TmVueFilterTag$1.name, TmVueFilterTag$1);
};

// Thanks to
// https://github.com/andreypopp/react-textarea-autosize/
// https://github.com/ElemeFE/element/blob/master/packages/input/src/calcTextareaHeight.js

var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n    height:0 !important;\n    min-height:0 !important;\n    max-height:none !important;\n    visibility:hidden !important;\n    overflow:hidden !important;\n    position:absolute !important;\n    z-index:-1000 !important;\n    top:0 !important;\n    right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(node) {
    var style = window.getComputedStyle(node);

    var boxSizing = style.getPropertyValue('box-sizing');

    var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

    var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

    var contextStyle = CONTEXT_STYLE.map(function (name) {
        return name + ':' + style.getPropertyValue(name);
    }).join(';');

    return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetNode) {
    var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    var _calculateNodeStyling = calculateNodeStyling(targetNode),
        paddingSize = _calculateNodeStyling.paddingSize,
        borderSize = _calculateNodeStyling.borderSize,
        boxSizing = _calculateNodeStyling.boxSizing,
        contextStyle = _calculateNodeStyling.contextStyle;

    hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
    hiddenTextarea.value = targetNode.value || targetNode.placeholder || '';

    var height = hiddenTextarea.scrollHeight;
    var minHeight = -Infinity;
    var maxHeight = Infinity;

    if (boxSizing === 'border-box') {
        height = height + borderSize;
    } else if (boxSizing === 'content-box') {
        height = height - paddingSize;
    }

    hiddenTextarea.value = '';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
        minHeight = singleRowHeight * minRows;
        if (boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
        maxHeight = singleRowHeight * maxRows;
        if (boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
    }

    return {
        height: height + 'px',
        minHeight: minHeight + 'px',
        maxHeight: maxHeight + 'px'
    };
}

function _broadcast(componentName, eventName, params) {
    this.$children.forEach(function (child) {
        var name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            _broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
var Emitter = {
    methods: {
        dispatch: function dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast: function broadcast(componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        }
    }
};

var prefixCls$5 = 'ivu-input';

var TmVueInput$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.wrapClasses }, [_vm.type !== 'textarea' ? [_vm.prepend ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.slotReady, expression: "slotReady" }], class: [_vm.prefixCls + '-group-prepend'] }, [_vm._t("prepend")], 2) : _vm._e(), _vm._v(" "), _vm.icon ? _c('i', { staticClass: "ivu-icon", class: ['ivu-icon-' + _vm.icon, _vm.prefixCls + '-icon', _vm.prefixCls + '-icon-normal'], on: { "click": _vm.handleIconClick } }) : _vm._e(), _vm._v(" "), _c('transition', { attrs: { "name": "fade" } }, [!_vm.icon ? _c('i', { staticClass: "ivu-icon ivu-icon-load-c ivu-load-loop", class: [_vm.prefixCls + '-icon', _vm.prefixCls + '-icon-validate'] }) : _vm._e()]), _vm._v(" "), _c('input', { ref: "input", class: _vm.inputClasses, attrs: { "id": _vm.elementId, "autocomplete": _vm.autocomplete, "spellcheck": _vm.spellcheck, "type": _vm.type, "placeholder": _vm.placeholder, "disabled": _vm.disabled, "maxlength": _vm.maxlength, "readonly": _vm.readonly, "name": _vm.name, "number": _vm.number, "autofocus": _vm.autofocus }, domProps: { "value": _vm.currentValue }, on: { "keyup": [function ($event) {
                    if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                        return null;
                    }_vm.handleEnter($event);
                }, _vm.handleKeyup], "keypress": _vm.handleKeypress, "keydown": _vm.handleKeydown, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "input": _vm.handleInput, "change": _vm.handleChange } }), _vm._v(" "), _vm.append ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.slotReady, expression: "slotReady" }], class: [_vm.prefixCls + '-group-append'] }, [_vm._t("append")], 2) : _vm._e()] : _c('textarea', { ref: "textarea", class: _vm.textareaClasses, style: _vm.textareaStyles, attrs: { "id": _vm.elementId, "autocomplete": _vm.autocomplete, "spellcheck": _vm.spellcheck, "placeholder": _vm.placeholder, "disabled": _vm.disabled, "rows": _vm.rows, "maxlength": _vm.maxlength, "readonly": _vm.readonly, "name": _vm.name, "autofocus": _vm.autofocus }, domProps: { "value": _vm.currentValue }, on: { "keyup": [function ($event) {
                    if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                        return null;
                    }_vm.handleEnter($event);
                }, _vm.handleKeyup], "keypress": _vm.handleKeypress, "keydown": _vm.handleKeydown, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "input": _vm.handleInput } })], 2);
    }, staticRenderFns: [],
    name: 'Input',
    mixins: [Emitter],
    props: {
        type: {
            validator: function validator(value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
            },

            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        size: {
            validator: function validator(value) {
                return oneOf(value, ['small', 'large', 'default']);
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: String,
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        rows: {
            type: Number,
            default: 2
        },
        readonly: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        number: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        spellcheck: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            validator: function validator(value) {
                return oneOf(value, ['on', 'off']);
            },

            default: 'off'
        },
        elementId: {
            type: String
        }
    },
    data: function data() {
        return {
            currentValue: this.value,
            prefixCls: prefixCls$5,
            prepend: true,
            append: true,
            slotReady: false,
            textareaStyles: {}
        };
    },

    computed: {
        wrapClasses: function wrapClasses() {
            var _ref;

            return [prefixCls$5 + '-wrapper', (_ref = {}, defineProperty(_ref, prefixCls$5 + '-wrapper-' + this.size, !!this.size), defineProperty(_ref, prefixCls$5 + '-type', this.type), defineProperty(_ref, prefixCls$5 + '-group', this.prepend || this.append), defineProperty(_ref, prefixCls$5 + '-group-' + this.size, (this.prepend || this.append) && !!this.size), defineProperty(_ref, prefixCls$5 + '-group-with-prepend', this.prepend), defineProperty(_ref, prefixCls$5 + '-group-with-append', this.append), defineProperty(_ref, prefixCls$5 + '-hide-icon', this.append), _ref)];
        },
        inputClasses: function inputClasses() {
            var _ref2;

            return ['' + prefixCls$5, (_ref2 = {}, defineProperty(_ref2, prefixCls$5 + '-' + this.size, !!this.size), defineProperty(_ref2, prefixCls$5 + '-disabled', this.disabled), _ref2)];
        },
        textareaClasses: function textareaClasses() {
            return ['' + prefixCls$5, defineProperty({}, prefixCls$5 + '-disabled', this.disabled)];
        }
    },
    methods: {
        handleEnter: function handleEnter(event) {
            this.$emit('on-enter', event);
        },
        handleKeydown: function handleKeydown(event) {
            this.$emit('on-keydown', event);
        },
        handleKeypress: function handleKeypress(event) {
            this.$emit('on-keypress', event);
        },
        handleKeyup: function handleKeyup(event) {
            this.$emit('on-keyup', event);
        },
        handleIconClick: function handleIconClick(event) {
            this.$emit('on-click', event);
        },
        handleFocus: function handleFocus(event) {
            this.$emit('on-focus', event);
        },
        handleBlur: function handleBlur(event) {
            this.$emit('on-blur', event);
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch('FormItem', 'on-form-blur', this.currentValue);
            }
        },
        handleInput: function handleInput(event) {
            var value = event.target.value;
            if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value);
            this.$emit('input', value);
            this.setCurrentValue(value);
            this.$emit('on-change', event);
        },
        handleChange: function handleChange(event) {
            this.$emit('on-input-change', event);
        },
        setCurrentValue: function setCurrentValue(value) {
            var _this = this;

            if (value === this.currentValue) return;
            this.$nextTick(function () {
                _this.resizeTextarea();
            });
            this.currentValue = value;
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch('FormItem', 'on-form-change', value);
            }
        },
        resizeTextarea: function resizeTextarea() {
            var autosize = this.autosize;
            if (!autosize || this.type !== 'textarea') {
                return false;
            }

            var minRows = autosize.minRows;
            var maxRows = autosize.maxRows;

            this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
        },
        focus: function focus() {
            if (this.type === 'textarea') {
                this.$refs.textarea.focus();
            } else {
                this.$refs.input.focus();
            }
        },
        blur: function blur() {
            if (this.type === 'textarea') {
                this.$refs.textarea.blur();
            } else {
                this.$refs.input.blur();
            }
        }
    },
    watch: {
        value: function value(val) {
            this.setCurrentValue(val);
        }
    },
    mounted: function mounted() {
        if (this.type !== 'textarea') {
            this.prepend = this.$slots.prepend !== undefined;
            this.append = this.$slots.append !== undefined;
        } else {
            this.prepend = false;
            this.append = false;
        }
        this.slotReady = true;
        this.resizeTextarea();
    }
};

TmVueInput$1.install = function (V, options) {
    V.component(TmVueInput$1.name, TmVueInput$1);
};

Vue.use(TmVueActionButton$1);
Vue.use(TmVueRadio);
Vue.use(TmVueCheckbox);
Vue.use(TmVueCheckallCheckbox$1);
Vue.use(TmVueDropdown);
Vue.use(TmVueSearchButton$1);
Vue.use(TmVueButton$1);
Vue.use(Breadcrumb);
Vue.use(TmVueFilterTag$1);
Vue.use(TmVueInput$1);

});
