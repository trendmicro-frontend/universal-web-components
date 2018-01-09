define(['vue', 'jquery', 'bootstrap', 'lodash'], function (Vue, jquery, bootstrap, _) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;
_ = _ && _.hasOwnProperty('default') ? _['default'] : _;

var TmVueActionButton$1 = { template: "<button class=\"btn\" :class=\"buttonStatus\" :disabled=\"disabled\" v-on:click=\"clicked\"> <span class=\"glyphicon-loader\" v-show=\"isLoading\"></span>{{ val }} </button>",
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

var TmVueRadio = { template: "<div class=\"radio\" :class=\"{'disabled':isDisabled}\"> <input type=\"radio\" :value=\"value\" @change=\"handleChange\" v-model=\"checked\" class=\"input-radio\" :disabled=\"isDisabled\" :class=\"{'disabled':disabledClass}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
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

var isServer = Vue.prototype.$isServer;
// 判断参数是否是其中之一
function oneOf$1(value, validList) {
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
function findComponentsDownward(context, componentName) {
    return context.$children.reduce(function (components, child) {
        if (child.$options.name === componentName) components.push(child);
        var foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

/* istanbul ignore next */


/* istanbul ignore next */


/* istanbul ignore next */

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

var prefixCls = "radio";
var TmVueRadioEx = { template: "<div v-if=\"group\" :class=\"radioClasses\"> <input type=\"radio\" :name=\"name\" :id=\"id\" :class=\"inputRadioClasses\" :checked=\"checked\" :disabled=\"disabled\" @change=\"change\"> <label :for=\"id\">{{label}}</label> </div> <div v-else :class=\"radioClasses\"> <input type=\"radio\" :name=\"name\" :id=\"id\" :class=\"inputRadioClasses\" :checked=\"checked\" :disabled=\"disabled\" @change=\"change\"> <label :for=\"id\">{{label}}</label> </div>",
  name: "TmVueRadioEx",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    name: {
      type: String,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    hover: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      index: 0,
      group: false,
      parent: findComponentUpward(this, "TmVueRadioGroup")
    };
  },

  computed: {
    id: function id() {
      return this.name + "-" + this.index;
    },
    radioClasses: function radioClasses() {
      var _ref;

      return [(_ref = {}, defineProperty(_ref, "" + prefixCls, !this.inline), defineProperty(_ref, prefixCls + "-inline", this.inline), defineProperty(_ref, "hover", this.hover), defineProperty(_ref, "disabled", this.disabled), _ref)];
    },
    inputRadioClasses: function inputRadioClasses() {
      var _ref2;

      return ["input-radio", (_ref2 = {}, defineProperty(_ref2, "disabled", this.disabled && !this.checked), defineProperty(_ref2, "checked", this.checked && !this.disabled), _ref2)];
    }
  },
  methods: {
    change: function change(event) {
      if (this.disabled) {
        return false;
      }

      var checked = event.target.checked;

      this.$emit("input", checked);

      if (this.group && this.label !== undefined) {
        this.parent.change({
          value: this.value,
          checked: checked
        });
      }
      if (!this.group) {
        this.$emit("on-change", value);
        this.dispatch("FormItem", "on-form-change", value);
      }
    }
  }
};

var prefixCls$1 = "vue-radio-group";

var TmVueRadioGroup = { template: "<div :class=\"classes\"> <slot></slot> </div>",
  name: "TmVueRadioGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    inline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentValue: this.value,
      childrens: []
    };
  },

  computed: {
    classes: function classes() {
      var _ref;

      return ["" + prefixCls$1, (_ref = {}, defineProperty(_ref, prefixCls$1 + "-" + this.size, !!this.size), defineProperty(_ref, "ivu-radio-" + this.size, !!this.size), defineProperty(_ref, prefixCls$1 + "-" + this.type, !!this.type), defineProperty(_ref, prefixCls$1 + "-vertical", this.vertical), _ref)];
    }
  },
  mounted: function mounted() {
    this.updateValue();
  },

  methods: {
    updateValue: function updateValue() {
      var _this = this;

      var value = this.value;
      this.childrens = findComponentsDownward(this, "TmVueRadioEx");
      var index = 0;
      if (this.childrens) {
        this.childrens.forEach(function (child) {
          child.checked = value == child.value;
          child.group = true;
          child.name = _this.name;
          child.index = index++;
          child.inline = true;
          child.disabled = _this.disabled;
        });
      }
    },
    change: function change(data) {
      debugger;
      this.value = data.value;
      this.updateValue();
      this.$emit("input", data.value);
      this.$emit("on-change", data.value);
      this.dispatch("FormItem", "on-form-change", data.value);
    }
  },
  watch: {
    value: function value() {
      debugger;
      this.updateValue();
    },
    disabled: function disabled() {
      debugger;
      this.updateValue();
    }
  }
};

TmVueRadioEx.install = function (V, options) {
    V.component(TmVueRadioEx.name, TmVueRadioEx);
};
TmVueRadioGroup.install = function (V, options) {
    V.component(TmVueRadioGroup.name, TmVueRadioGroup);
};

var TmVueCheckbox = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" :value=\"value\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':isChecked,'disabled':disabledClass}\"> <label @click=\"lableClick\"><slot></slot></label> </div>",
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

var TmVueCheckallCheckbox$1 = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':checked,'disabled':disabledClass,'checkbox-partical':this.indeterminate}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
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

var TmVueDropdown = { template: "<div class=\"btn-group\"> <button type=\"button\" :title=\"selectedText\" class=\"form-control btn btn-border dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" :disabled=\"isDisabled\" :class=\"widthClass\"> <span class=\"caret\"></span>{{selectedText}}</button> <ul class=\"dropdown-menu\"> <template v-for=\"item in list\"> <li @click=\"handleChange(item.value)\"><a href=\"javascript:void(0)\">{{item.display}}</a></li> </template> </ul> </div>",
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

var TmVueSearchButton$1 = { template: "<div class=\"input-group has-clear\" style=\"width:100%\"> <div class=\"input-icon-group\" style=\"width:100%\"> <input type=\"text\" class=\"form-control\" :placeholder=\"placeholder\" style=\"width:100%\" v-model=\"textVal\" v-on:input=\"updated\" v-on:keyup.enter=\"changed\"> <span class=\"form-control-clear icon icon-cancel hidden\"></span> </div> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default btn-icon-only\" v-on:click=\"changed\"><span class=\"fa fa-search\"></span></button> </span> </div>",
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

var Icon$1 = { template: "<span :class=\"classes\" :style=\"styles\"></span>",
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

var prefixCls$2 = "btn";

var TmVueButton$1 = { template: "<button :type=\"htmlType\" :class=\"classes\" :disabled=\"disabled\" @click=\"handleClick\"> <Icon type=\"loader loader-small\" v-if=\"loading\"></Icon> <Icon :type=\"icon\" v-if=\"icon && !loading\"></Icon> <span v-if=\"showSlot\" ref=\"slot\"><slot></slot></span> </button>",
  name: "TmVueButton",
  components: { Icon: Icon$1 },
  props: {
    type: {
      validator: function validator(value) {
        return oneOf$1(value, ["primary", "danger", "border", "link", "default"]);
      }
    },
    shape: {
      validator: function validator(value) {
        return oneOf$1(value, ["circle", "circle-outline"]);
      }
    },
    size: {
      validator: function validator(value) {
        return oneOf$1(value, ["xs", "sm", "lg", "block"]);
      }
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: "button",
      validator: function validator(value) {
        return oneOf$1(value, ["button", "submit", "reset"]);
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

      return ["" + prefixCls$2, (_ref = {}, defineProperty(_ref, prefixCls$2 + "-" + this.type, !!this.type), defineProperty(_ref, prefixCls$2 + "-" + this.size, !!this.size), defineProperty(_ref, prefixCls$2 + "-block", !!this.full), defineProperty(_ref, prefixCls$2 + "-icon-only", !this.showSlot && (!!this.icon || this.loading)), _ref)];
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

var prefixCls$4 = "uwc";

var Breadcrumb = { template: "<div :class=\"classes\"> <ol class=\"breadcrumb\"> <slot></slot> </ol> </div>",
  name: "TmVueBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    }
  },
  computed: {
    classes: function classes() {
      return "" + prefixCls$4;
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

var prefixCls$5 = "tm-vue-breadcrumb-item";

var BreadcrumbItem = { template: "<li v-if=\"to\"> <a :href=\"to\" :class=\"linkClasses\" @click=\"handleClick\"> <slot></slot> </a> </li> <li v-else class=\"active\"> <slot></slot> </li>",
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
      return prefixCls$5 + "-link";
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

var TmVueFilterTag$1 = { template: "<div class=\"Tokenize tokenize\" :class=\"{disabled:disabled}\" tabindex=\"0\" @click=\"showInput\" :style=\"{width:width_display}\"> <span v-show=\"selected_list.length > 0\" @click=\"removeAll\" class=\"icon icon-cancel\"></span> <ul class=\"TokensContainer tag-editor\" tabindex=\"0\"> <li class=\"Placeholder placeholder\" v-show=\"showPlaceholder\">Select...</li> <li v-for=\"item in selected_list\" class=\"Token\"> <a class=\"Close\"> <span class=\"icon icon-cancel\" tabindex=\"0\" @click.stop=\"removeItem(item.id)\"></span> </a> <span>{{item.name}}</span> </li> <li class=\"TokenSearch\"> <input v-focus=\"focus\" @keydown.down=\"selectNextItem\" @keyup.enter=\"addSelectItem\" @keydown.up=\"selectPreviousItem\" :disabled=\"disabled\" v-model=\"text_value\" @focusout=\"hideInput($event)\" size=\"8\"> </li> </ul> <ul tabindex=\"0\" class=\"Dropdown dropdown-menu\" :style=\"{display:dropdown_display,width:width_display}\"> <li tabindex=\"0\" data=\"for-select\" v-show=\"showInitList.length>0\" :class=\"{Hover:item.hover}\" @mouseover=\"setHoverItem(item.id)\" @mouseout=\"clearAllHover\" v-for=\"item in showInitList\" @click.stop=\"addItem(item.id)\">{{item.name}}</li> <li tabindex=\"0\" class=\"no-matches\" v-show=\"showInitList.length==0\">No matches found</li> </ul> </div>", _scopeId: 'data-v-47dc18c2',
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

var prefixCls$6 = 'ivu-input';

var TmVueInput$1 = { template: "<div :class=\"wrapClasses\"> <template v-if=\"type !== 'textarea'\"> <div :class=\"[prefixCls + '-group-prepend']\" v-if=\"prepend\" v-show=\"slotReady\"><slot name=\"prepend\"></slot></div> <i class=\"ivu-icon\" :class=\"['ivu-icon-' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']\" v-if=\"icon\" @click=\"handleIconClick\"></i> <transition name=\"fade\"> <i class=\"ivu-icon ivu-icon-load-c ivu-load-loop\" :class=\"[prefixCls + '-icon', prefixCls + '-icon-validate']\" v-if=\"!icon\"></i> </transition> <input :id=\"elementId\" :autocomplete=\"autocomplete\" :spellcheck=\"spellcheck\" ref=\"input\" :type=\"type\" :class=\"inputClasses\" :placeholder=\"placeholder\" :disabled=\"disabled\" :maxlength=\"maxlength\" :readonly=\"readonly\" :name=\"name\" :value=\"currentValue\" :number=\"number\" :autofocus=\"autofocus\" @keyup.enter=\"handleEnter\" @keyup=\"handleKeyup\" @keypress=\"handleKeypress\" @keydown=\"handleKeydown\" @focus=\"handleFocus\" @blur=\"handleBlur\" @input=\"handleInput\" @change=\"handleChange\"> <div :class=\"[prefixCls + '-group-append']\" v-if=\"append\" v-show=\"slotReady\"><slot name=\"append\"></slot></div> </template> <textarea v-else :id=\"elementId\" :autocomplete=\"autocomplete\" :spellcheck=\"spellcheck\" ref=\"textarea\" :class=\"textareaClasses\" :style=\"textareaStyles\" :placeholder=\"placeholder\" :disabled=\"disabled\" :rows=\"rows\" :maxlength=\"maxlength\" :readonly=\"readonly\" :name=\"name\" :value=\"currentValue\" :autofocus=\"autofocus\" @keyup.enter=\"handleEnter\" @keyup=\"handleKeyup\" @keypress=\"handleKeypress\" @keydown=\"handleKeydown\" @focus=\"handleFocus\" @blur=\"handleBlur\" @input=\"handleInput\">\n    </textarea> </div>",
    name: 'Input',
    mixins: [Emitter],
    props: {
        type: {
            validator: function validator(value) {
                return oneOf$1(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
            },

            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        size: {
            validator: function validator(value) {
                return oneOf$1(value, ['small', 'large', 'default']);
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
                return oneOf$1(value, ['on', 'off']);
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
            prefixCls: prefixCls$6,
            prepend: true,
            append: true,
            slotReady: false,
            textareaStyles: {}
        };
    },

    computed: {
        wrapClasses: function wrapClasses() {
            var _ref;

            return [prefixCls$6 + '-wrapper', (_ref = {}, defineProperty(_ref, prefixCls$6 + '-wrapper-' + this.size, !!this.size), defineProperty(_ref, prefixCls$6 + '-type', this.type), defineProperty(_ref, prefixCls$6 + '-group', this.prepend || this.append), defineProperty(_ref, prefixCls$6 + '-group-' + this.size, (this.prepend || this.append) && !!this.size), defineProperty(_ref, prefixCls$6 + '-group-with-prepend', this.prepend), defineProperty(_ref, prefixCls$6 + '-group-with-append', this.append), defineProperty(_ref, prefixCls$6 + '-hide-icon', this.append), _ref)];
        },
        inputClasses: function inputClasses() {
            var _ref2;

            return ['' + prefixCls$6, (_ref2 = {}, defineProperty(_ref2, prefixCls$6 + '-' + this.size, !!this.size), defineProperty(_ref2, prefixCls$6 + '-disabled', this.disabled), _ref2)];
        },
        textareaClasses: function textareaClasses() {
            return ['' + prefixCls$6, defineProperty({}, prefixCls$6 + '-disabled', this.disabled)];
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

var prefixCls$7 = "badge";
var TmVueBadge$1 = { template: "<a v-if=\"href\" :class=\"classes\" :href=\"href\" target=\"_self\"> <slot></slot> </a> <span v-else :class=\"classes\" ref=\"badge\"> <slot></slot> </span>",
  name: "Badge",
  props: {
    href: {
      type: [Object, String]
    },
    variant: {
      default: "green",
      validator: function validator(value) {
        return oneOf$1(value, ["light-gray", "blue", "green", "cyan", "orange", "red", "yellow", "dark"]);
      }
    }
  },
  computed: {
    classes: function classes() {
      return ["" + prefixCls$7, prefixCls$7 + "-" + this.variant];
    }
  }
};

TmVueBadge$1.install = function (V, options) {
    V.component(TmVueBadge$1.name, TmVueBadge$1);
};

var prefixCls$8 = "label";
var TmVueLabel$1 = { template: "<a v-if=\"href\" :class=\"classes\" :href=\"href\" target=\"_self\"> <slot></slot> </a> <span v-else :class=\"classes\" ref=\"label\"> <slot></slot> </span>",
  name: "Label",
  props: {
    href: {
      type: [Object, String]
    },
    variant: {
      default: "blue",
      validator: function validator(value) {
        return oneOf$1(value, ["blue", "green", "cyan", "orange", "red", "indigo", "yellow", "light-gray", "gray", "dark"]);
      }
    }
  },
  computed: {
    classes: function classes() {
      return ["" + prefixCls$8, prefixCls$8 + "-" + this.variant];
    }
  }
};

TmVueLabel$1.install = function (V, options) {
    V.component(TmVueLabel$1.name, TmVueLabel$1);
};

var prefixCls$9 = "modal";
var TmVueModal$1 = { template: "<div> <div ref=\"modal\" :class=\"classes\" @click.self=\"close()\" @keyup.esc=\"close()\" tabindex=\"-1\" aria-hidden=\"true\"> <div class=\"modal-dialog\" :class=\"modalClasses\" role=\"document\"> <div class=\"modal-content\"> <div v-if=\"needHeader\" class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\" class=\"icon icon-modal-close\"> </span> </button> <h3 class=\"modal-title\"> <slot name=\"title\"> {{title}} </slot> </h3> </div> <div class=\"modal-body\"> <slot></slot> </div> <div v-if=\"needFooter\" class=\"modal-footer\"> <slot name=\"footer\"> <button type=\"button\" class=\"btn btn-primary\" @click=\"ok\">{{okText}}</button> <button type=\"button\" class=\"btn btn-default\" @click=\"cancel\">{{cancelText}}</button> </slot> </div> </div> </div> </div> <div v-if=\"isShow\" class=\"modal-backdrop fade in\"></div> </div>",
  name: "TmVueModal",
  props: {
    opened: {
      type: Function,
      default: function _default() {}
    },
    closed: {
      type: Function,
      default: function _default() {}
    },
    needHeader: {
      type: Boolean,
      default: true
    },
    needFooter: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Modal"
    },
    type: {
      default: "md",
      validator: function validator(value) {
        return oneOf(value, ["xs", "sm", "md", "lg"]);
      }
    },
    okText: {
      type: String,
      default: "OK"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  data: function data() {
    return {
      isOpen: false,
      isShow: false,
      isOk: false,
      lastKnownBodyStyle: {
        overflow: "auto"
      }
    };
  },

  computed: {
    classes: function classes() {
      return ["" + prefixCls$9, {
        in: this.isOpen,
        show: this.isShow
      }];
    },
    modalClasses: function modalClasses() {
      return "modal-" + this.type;
    }
  },
  methods: {
    open: function open() {
      this.isOk = false;
      this.isShow = true;
      this.$nextTick(function () {
        this.isOpen = true;
        this.$refs.modal.focus();
        this.lastKnownBodyStyle.overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        this.opened();
      });
    },
    close: function close() {
      this.isOpen = false;
      this.$nextTick(function () {
        var _this = this;

        setTimeout(function () {
          _this.isShow = false;
          document.body.style.overflow = _this.lastKnownBodyStyle.overflow;
          _this.closed();
        }, 500);
      });
    },
    ok: function ok() {
      this.isOk = true;
      this.close();
    },
    cancel: function cancel() {
      this.isOk = false;
      this.close();
    }
  }
};

TmVueModal$1.install = function (V, options) {
    V.component(TmVueModal$1.name, TmVueModal$1);
};

Vue.use(TmVueActionButton$1);
Vue.use(TmVueRadio);
Vue.use(TmVueRadioEx);
Vue.use(TmVueRadioGroup);
Vue.use(TmVueCheckbox);
Vue.use(TmVueCheckallCheckbox$1);
Vue.use(TmVueDropdown);
Vue.use(TmVueSearchButton$1);
Vue.use(TmVueButton$1);
Vue.use(Breadcrumb);
Vue.use(TmVueFilterTag$1);
Vue.use(TmVueInput$1);
Vue.use(TmVueBadge$1);
Vue.use(TmVueLabel$1);
Vue.use(TmVueModal$1);

});
