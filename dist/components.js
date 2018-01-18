(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue'), require('lodash'), require('jquery')) :
	typeof define === 'function' && define.amd ? define(['vue', 'lodash', 'jquery'], factory) :
	(factory(global.Vue,global._,global.jQuery));
}(this, (function (Vue,_,$$1) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
_ = _ && _.hasOwnProperty('default') ? _['default'] : _;
$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

var TmVueActionButton$1 = { template: "<button type=\"button\" class=\"btn\" :class=\"buttonStatus\" :disabled=\"disabled\" v-on:click=\"clicked\"> <span class=\"glyphicon-loader\" v-show=\"isLoading\"></span>{{ val }} </button>",
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

  data: function() {
    return {
      // show_name:this.param.name,
      // is_disabled:'',
    };
  },
  computed: {
    val: function() {
      if (this.isLoading) {
        return this.loadingName;
      } else {
        return this.name;
      }
    },
    buttonStatus: function() {
      if (this.isPrimary) return "btn-primary";
      else return "btn-default";
    }
  },
  methods: {
    clicked: function() {
      this.$emit("clicked");
    }
  }
};

TmVueActionButton$1.install = function (V, options) {
    V.component(TmVueActionButton$1.name, TmVueActionButton$1);
};

var TmVueRadio = { template: "<div class=\"radio\" :class=\"{'disabled':isDisabled}\"> <input type=\"radio\" :value=\"value\" @change=\"handleChange\" v-model=\"checked\" class=\"input-radio\" :disabled=\"isDisabled\" :class=\"{'disabled':disabledClass}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
    name: 'TmVueRadio',
    model:{
        prop:"checked",
        event:"change"
    },
    props:{
        checked:{
            type:Number,
            default:""
        },
        value:{
            type:[String,Number],
            value:""
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        isDisabled:function(){
            return this.disabled===true?true:false;//default disabled attribute is false
        },
        disabledClass:function(){
            return this.isDisabled && (this.checked != this.value);//only add disabled class for the unchecked radio to stop hover color change.
        }
    },
    methods: {
        handleChange() {
            this.$nextTick(function(){
                this.$emit('change', this.checked);
            });
        },
        labelClick:function(){
            if(this.isDisabled)return;
            this.checked = this.value;
            this.handleChange();
        }
    }
}

TmVueRadio.install = function (V, options) {
    V.component(TmVueRadio.name, TmVueRadio);
};

const isServer = Vue.prototype.$isServer;
// 判断参数是否是其中之一
function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}





// watch DOM change
const MutationObserver = isServer ? false : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;

// getStyle


// Warn


// scrollTop animation


// Find components upward
function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
// Find component downward


// Find components downward
function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

/* istanbul ignore next */


/* istanbul ignore next */


/* istanbul ignore next */

function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
var Emitter = {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

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
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};

const prefixCls = "radio";
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
  data() {
    return {
      index: 0,
      group: false,
      parent: findComponentUpward(this, "TmVueRadioGroup")
    };
  },
  computed: {
    id() {
      return `${this.name}-${this.index}`;
    },
    radioClasses() {
      return [
        {
          [`${prefixCls}`]: !this.inline,
          [`${prefixCls}-inline`]: this.inline,
          [`hover`]: this.hover,
          [`disabled`]: this.disabled
        }
      ];
    },
    inputRadioClasses() {
      return [
        "input-radio",
        {
          [`disabled`]: this.disabled && !this.checked,
          [`checked`]: this.checked && !this.disabled
        }
      ];
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;

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

const prefixCls$1 = "vue-radio-group";

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
  data() {
    return {
      currentValue: this.value,
      childrens: []
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls$1}`,
        {
          [`${prefixCls$1}-${this.size}`]: !!this.size,
          [`ivu-radio-${this.size}`]: !!this.size,
          [`${prefixCls$1}-${this.type}`]: !!this.type,
          [`${prefixCls$1}-vertical`]: this.vertical
        }
      ];
    }
  },
  mounted() {
    this.updateValue();
  },
  methods: {
    updateValue() {
      const value = this.value;
      this.childrens = findComponentsDownward(this, "TmVueRadioEx");
      let index = 0;
      if (this.childrens) {
        this.childrens.forEach(child => {
          child.checked = value == child.value;
          child.group = true;
          child.name = this.name;
          child.index = index++;
          child.inline = this.inline;
          child.disabled = this.disabled;
        });
      }
    },
    change(data) {
      this.value = data.value;
      this.updateValue();
      this.$emit("input", data.value);
      this.$emit("on-change", data.value);
      this.dispatch("FormItem", "on-form-change", data.value);
    }
  },
  watch: {
    value() {
      this.updateValue();
    },
    disabled() {
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
    model:{
        prop:"checked",
        event:"change"
    },
    props:{
        checked:{
            type:[Boolean,Array],
            default:"",
        },
        value:{
            type:[String,Number],
            default:""
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        isDisabled:function(){
            return this.disabled===true?true:false;//default disabled attribute is false.
        },
        disabledClass:function(){
            return this.isDisabled && (this.isBoolean ? !this.checked : this.checked.indexOf(this.value) == -1);//only add disabled class for the unchecked radio to stop hover color change.
        },
        isChecked:function(){
            if(this.isBoolean){
                return this.checked;
            }else{
                return this.checked.indexOf(this.value) != -1;
            }
        },
        isBoolean(){
            return typeof this.checked === 'boolean';
        }
    },
    methods: {
        handleChange() {
            this.$nextTick(function(){
                this.$emit('change', this.checked);
            });
        },
        lableClick(){
            if(this.isDisabled)return;
            if(this.isBoolean){
                this.checked = !this.checked;
            }else{
                var index = this.checked.indexOf(this.value);
                if(index == -1){
                    this.checked.push(this.value);
                }else{
                    this.checked.splice(index, 1);
                }
            }
            this.handleChange();
            
        }
        
    }
}

TmVueCheckbox.install = function (V, options) {
    V.component(TmVueCheckbox.name, TmVueCheckbox);
};

var TmVueCheckallCheckbox$1 = { template: "<div class=\"checkbox\" :class=\"{'disabled':isDisabled}\"> <input type=\"checkbox\" @change=\"handleChange\" v-model=\"checked\" class=\"input-checkbox\" :disabled=\"isDisabled\" :class=\"{'checked':checked,'disabled':disabledClass,'checkbox-partical':this.indeterminate}\"> <label @click=\"labelClick\"><slot></slot></label> </div>",
    name: 'TmVueCheckallCheckbox',
    props:{
        checked:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        },
        indeterminate:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        isDisabled:function(){
            return this.disabled===true?true:false;//default disabled attribute is false.
        },
        disabledClass:function(){
            return this.isDisabled && !this.checked;//only add disabled class for the unchecked radio to stop hover color change.
        }
    },
    methods: {
        handleChange() {
            this.$nextTick(function(){
                this.$emit('change', this.checked);
            });
        },
        labelClick:function(){
            if(this.isDisabled)return;
            this.checked = !this.checked;
            this.handleChange();
        }
    }
}

TmVueCheckallCheckbox$1.install = function (V, options) {
    V.component(TmVueCheckallCheckbox$1.name, TmVueCheckallCheckbox$1);
};

var TmVueDropdown = { template: "<div class=\"btn-group\"> <button type=\"button\" :title=\"selectedText\" class=\"form-control same-width btn btn-border dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" :disabled=\"isDisabled\" :class=\"widthClass\"> <span class=\"caret\"></span>{{selectedText}}</button> <ul class=\"dropdown-menu same-width\"> <template v-for=\"item in list\"> <li @click=\"handleChange(item.value)\"><a href=\"javascript:void(0)\">{{item.display}}</a></li> </template> </ul> </div>",
    name: 'TmVueDropdown',
    props:{
        value:{
            type:[String,Number],
            default:0
        },
        list:{
            type:Array,
            default:[]
        },
        disabled:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'default'
        }
    },
    computed:{
        isDisabled:function(){
            return this.disabled===true?true:false;//default disabled attribute is false
        },
        selectedText:function(){
            if(this.list.length ==0)
                return '';
            var index = 0;
            for(var i=0;i<this.list.length;i++){
                if(this.list[i].value == this.value){
                    index = i;
                }
            }
            return this.list[index].display;
        },
        widthClass:function(){
            var class_list = {"mini":"input-width-mini","sm":"input-width-sm","default":"input-width-default","md":"input-width-md","lg":"input-width-lg","auto":""};
            return class_list[this.width?this.width:'default'];
        }
    },
    methods: {
        handleChange(value) {
            this.value = value;
            this.$nextTick(function(){
                this.$emit('input', this.value);
            });
        }
    }
}

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
  data: function() {
    return {
      textVal: ""
    };
  },
  methods: {
    changed: function(e) {
      this.$emit("changed", this.textVal);
    },
    updated: function() {
      this.$emit("updated", this.textVal);
    }
  },

  mounted: function() {
    var self = this;
    /**
             * todo
             * should bind custom element
             */
    $('.has-clear input[type="text"]')
      .on("input propertychange", function() {
        var $this = $(this);
        var visible = Boolean($this.val());
        $this.siblings(".form-control-clear").toggleClass("hidden", !visible);
      })
      .trigger("propertychange");

    $(".form-control-clear").click(function() {
      self.textVal = "";
      $(this)
        .siblings('input[type="text"]')
        .val("")
        .trigger("propertychange")
        .focus();
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
    classes() {
      return `${this.type}`;
    },
    styles() {
      let style = {};

      if (this.size) {
        style["font-size"] = `${this.size}px`;
      }

      if (this.color) {
        style.color = this.color;
      }

      return style;
    }
  }
};

const prefixCls$2 = "btn";

var TmVueButton$1 = { template: "<button :type=\"htmlType\" :class=\"classes\" :disabled=\"disabled\" @click=\"handleClick\"> <Icon type=\"loader loader-small\" v-if=\"loading\"></Icon> <Icon :type=\"icon\" v-if=\"icon && !loading\"></Icon> <span v-if=\"showSlot\" ref=\"slot\"><slot></slot></span> </button>",
  name: "TmVueButton",
  components: { Icon: Icon$1 },
  props: {
    type: {
      validator(value) {
        return oneOf(value, ["primary", "danger", "border", "link", "default"]);
      }
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle", "circle-outline"]);
      }
    },
    size: {
      validator(value) {
        return oneOf(value, ["xs", "sm", "lg", "block"]);
      }
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: "button",
      validator(value) {
        return oneOf(value, ["button", "submit", "reset"]);
      }
    },
    icon: String,
    full: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showSlot: true
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls$2}`,
        {
          [`${prefixCls$2}-${this.type}`]: !!this.type,
          [`${prefixCls$2}-${this.size}`]: !!this.size,
          [`${prefixCls$2}-block`]: !!this.full,
          [`${prefixCls$2}-icon-only`]:
            !this.showSlot && (!!this.icon || this.loading)
        }
      ];
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  }
};

TmVueButton$1.install = function (V, options) {
    V.component(TmVueButton$1.name, TmVueButton$1);
};

const prefixCls$4 = "uwc";

var Breadcrumb = { template: "<div :class=\"classes\"> <ol class=\"breadcrumb\"> <slot></slot> </ol> </div>",
  name: "TmVueBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    }
  },
  computed: {
    classes() {
      return `${prefixCls$4}`;
    }
  },
  mounted() {
    this.updateChildren();
  },
  updated() {
    this.$nextTick(() => {
      this.updateChildren();
    });
  },
  methods: {
    updateChildren() {
      this.$children.forEach(child => {
        child.separator = this.separator;
      });
    }
  },
  watch: {
    separator() {
      this.updateChildren();
    }
  }
};

const prefixCls$5 = "tm-vue-breadcrumb-item";

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
    linkClasses() {
      return `${prefixCls$5}-link`;
    }
  },
  methods: {
    handleClick() {
      const isRoute = this.$router;
      if (isRoute) {
        this.replace
          ? this.$router.replace(this.to)
          : this.$router.push(this.to);
      } else {
        window.location.href = this.to;
      }
    }
  }
};

Breadcrumb.Item = BreadcrumbItem;

var TmVueFilterTag$1 = { template: "<div class=\"Tokenize tokenize\" :class=\"{disabled:disabled}\" tabindex=\"0\" @click=\"showInput\" :style=\"{width:width_display}\"> <span v-show=\"value.length > 0\" @click=\"removeAll\" class=\"icon icon-cancel\"></span> <ul class=\"TokensContainer tag-editor\" tabindex=\"0\"> <li class=\"Placeholder placeholder\" v-show=\"showPlaceholder\">{{placeholder}}</li> <li v-for=\"item in value\" class=\"Token\"> <a class=\"Close\" style=\"display:inline-block\"> <span class=\"icon icon-cancel\" tabindex=\"0\" @click.stop=\"removeItem(item)\"></span> </a> <span>{{selected_name(item)}}</span> </li> <li class=\"TokenSearch\"> <input v-focus=\"focus\" @keydown.down=\"selectNextItem\" @keyup.enter=\"addSelectItem\" @keydown.up=\"selectPreviousItem\" :disabled=\"disabled\" v-model=\"text_value\" @focusout=\"hideInput($event)\" size=\"8\"> </li> </ul> <ul tabindex=\"0\" class=\"Dropdown dropdown-menu\" :style=\"{display:dropdown_display,width:width_display}\"> <li tabindex=\"0\" data=\"for-select\" v-show=\"filterList.length>0\" :class=\"{Hover:item.hover}\" @mouseover=\"setHoverItemById(item.id)\" @mouseout=\"clearAllHover\" v-for=\"item in filterList\" @click.stop=\"addItem(item.id)\">{{item.name}}</li> <li tabindex=\"0\" class=\"no-matches\" v-show=\"filterList.length==0\">{{no_result}}</li> </ul> </div>",
      name: 'TmVueFilterTag',                 
      props:{
          value:{
              type:[Array],
              default:0
          },          
          initial_list:{
            type:Array,
            default:[]
          },
          disabled:{
            type:Boolean,
            default:false
          },
          width:{
            type:String,
            default:""
          },
          placeholder:{
            type:String,
            default:""
          },
          no_result:{
            type:String,
            default:""
          }
      },
      data:function(){
      	return {
          	focus:false,
          	text_value:'',
            current_hover_id:'',
            new_init_list:_.map(this.initial_list,function(item){return _.extend({},item,{hover:false});})
      	}
      },
      computed:{
      	dropdown_display(){
      		return this.focus?'block':'none';
      	},
      	width_display(){
      		return this.width?this.width+'px':'100%';
      	},
      	showPlaceholder(){
      		return (this.value.length==0) && (this.text_value.length == 0);
      	},
        filterList(){
          var _this = this;        
          let tmp = this.new_init_list.filter(function(item){
              if(_this.value.indexOf(item.id) !== -1 ){
                return false;
              }else{
                return true;
              }
          }).filter(function(item){
              if(item.name.toLowerCase().startsWith(_this.text_value.toLowerCase()) === false)
                return false;
              else 
                return true;
          }).sort(function(a,b){
            if(a.name < b.name)
              return -1;
            if(a.name > b.name)
              return 1;
            return 0;
          });
          return tmp;
        }
      },
      methods:{
          selected_name(id){
             let item = _.find(this.new_init_list, function(item) {
                return item.id == id; 
             });
             if(item)
               return item.name;
          },          
          addItem(id){
            if(this.disabled) return;
            this.text_value="";
            this.value.push(id);
          },
          removeAll(){
            let _this = this;
            if(this.disabled) return;
            this.text_value="";
            _.each(this.value,function(value){
              _this.removeItem(value);               
            });
          },
          removeItem(id){
            if(this.disabled) return;
            this.text_value="";
            let index = _.findIndex(this.value,function(value){return value == id});
            this.value.splice(index,1);
          },
          selectNextItem(){
            if(this.filterList.length > 0){
              let index = this.getHoverItemIndex();
              this.clearAllHover();
              if(index == (this.filterList.length - 1)){
                index = 0;
              }else{
                index = index+1;
              }
              this.setHoverItemById(this.filterList[index].id);
            }
          },
          selectPreviousItem(){
            let index = this.getHoverItemIndex();
            this.clearAllHover();
            if(index == 0 || index == -1){
              index = this.filterList.length -1;
            }else{
              index = index-1;
            }
            this.setHoverItemById(this.filterList[index].id);
          },
          setHoverItemById(id){
            let index = _.findIndex(this.new_init_list,function(item){
              return item.id == id
            });
            let tmp_object = _.clone(this.new_init_list[index]);
            tmp_object.hover=true;
            this.new_init_list.splice(index, 1, tmp_object);
          },
          getHoverItemIndex(){
            return _.findIndex(this.filterList,'hover');
          },
          addSelectItem(){
            let index = this.getHoverItemIndex();
            if(index == -1)
              return;
            let id = this.filterList[index].id;
            this.addItem(id);
            this.clearAllHover();
            if(this.filterList.length >0){
              this.setHoverItemById(this.filterList[0].id);
            }
          },
          showInput(){
            if(this.disabled) return;
          	this.focus = true;
            //clear the focus before show init list.
            this.clearAllHover();     
            //hover on the first item when show the init list.
            if(this.filterList.length > 0){
              this.setHoverItemById(this.filterList[0].id);
            }
          },
          hideInput(e){              
            if(this.disabled) return;
            if((e.relatedTarget == this.$el.getElementsByClassName("TokensContainer")[0]) || (e.relatedTarget == this.$el.getElementsByClassName("Dropdown")) || (e.relatedTarget && (e.relatedTarget.getAttribute("data")=="for-select"))){
              let _this = this;
              setTimeout(function() { _this.$el.getElementsByTagName("input")[0].focus(); }, 10);
              return;
            }else{
              this.focus = false;
            }             
          },
          clearAllHover(){
            this.new_init_list = _.map(this.new_init_list,function(item){ item.hover = false; return item;});
          }
      },
      directives: {
  			focus: {
  				componentUpdated: function (el, value) {
  					if ( value.value) {
  						el.focus();
  					}
          }
  			}
		  },
      watch:{
        value:function(){
          this.$emit('input', this.value);
       }
    }
  }

TmVueFilterTag$1.install = function (V, options) {
    V.component(TmVueFilterTag$1.name, TmVueFilterTag$1);
};

// Thanks to
// https://github.com/andreypopp/react-textarea-autosize/
// https://github.com/ElemeFE/element/blob/master/packages/input/src/calcTextareaHeight.js

let hiddenTextarea;

const HIDDEN_STYLE = `
    height:0 !important;
    min-height:0 !important;
    max-height:none !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important
`;

const CONTEXT_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing'
];

function calculateNodeStyling(node) {
    const style = window.getComputedStyle(node);

    const boxSizing = style.getPropertyValue('box-sizing');

    const paddingSize = (
        parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'))
    );

    const borderSize = (
        parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'))
    );

    const contextStyle = CONTEXT_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');

    return {contextStyle, paddingSize, borderSize, boxSizing};
}

function calcTextareaHeight(targetNode, minRows = null, maxRows = null) {
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    let {
        paddingSize,
        borderSize,
        boxSizing,
        contextStyle
    } = calculateNodeStyling(targetNode);

    hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = targetNode.value || targetNode.placeholder || '';

    let height = hiddenTextarea.scrollHeight;
    let minHeight = -Infinity;
    let maxHeight = Infinity;

    if (boxSizing === 'border-box') {
        height = height + borderSize;
    } else if (boxSizing === 'content-box') {
        height = height - paddingSize;
    }

    hiddenTextarea.value = '';
    let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

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
        height: `${height}px`,
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`
    };
}

const prefixCls$6 = 'ivu-input';

var TmVueInput$1 = { template: "<div :class=\"wrapClasses\"> <template v-if=\"type !== 'textarea'\"> <div :class=\"[prefixCls + '-group-prepend']\" v-if=\"prepend\" v-show=\"slotReady\"><slot name=\"prepend\"></slot></div> <i class=\"ivu-icon\" :class=\"['ivu-icon-' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']\" v-if=\"icon\" @click=\"handleIconClick\"></i> <transition name=\"fade\"> <i class=\"ivu-icon ivu-icon-load-c ivu-load-loop\" :class=\"[prefixCls + '-icon', prefixCls + '-icon-validate']\" v-if=\"!icon\"></i> </transition> <input :id=\"elementId\" :autocomplete=\"autocomplete\" :spellcheck=\"spellcheck\" ref=\"input\" :type=\"type\" :class=\"inputClasses\" :placeholder=\"placeholder\" :disabled=\"disabled\" :maxlength=\"maxlength\" :readonly=\"readonly\" :name=\"name\" :value=\"currentValue\" :number=\"number\" :autofocus=\"autofocus\" @keyup.enter=\"handleEnter\" @keyup=\"handleKeyup\" @keypress=\"handleKeypress\" @keydown=\"handleKeydown\" @focus=\"handleFocus\" @blur=\"handleBlur\" @input=\"handleInput\" @change=\"handleChange\"> <div :class=\"[prefixCls + '-group-append']\" v-if=\"append\" v-show=\"slotReady\"><slot name=\"append\"></slot></div> </template> <textarea v-else :id=\"elementId\" :autocomplete=\"autocomplete\" :spellcheck=\"spellcheck\" ref=\"textarea\" :class=\"textareaClasses\" :style=\"textareaStyles\" :placeholder=\"placeholder\" :disabled=\"disabled\" :rows=\"rows\" :maxlength=\"maxlength\" :readonly=\"readonly\" :name=\"name\" :value=\"currentValue\" :autofocus=\"autofocus\" @keyup.enter=\"handleEnter\" @keyup=\"handleKeyup\" @keypress=\"handleKeypress\" @keydown=\"handleKeydown\" @focus=\"handleFocus\" @blur=\"handleBlur\" @input=\"handleInput\">\n    </textarea> </div>",
    name: 'Input',
    mixins: [ Emitter ],
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
            },
            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        size: {
            validator (value) {
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
            validator (value) {
                return oneOf(value, ['on', 'off']);
            },
            default: 'off'
        },
        elementId: {
            type: String
        }
    },
    data () {
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
        wrapClasses () {
            return [
                `${prefixCls$6}-wrapper`,
                {
                    [`${prefixCls$6}-wrapper-${this.size}`]: !!this.size,
                    [`${prefixCls$6}-type`]: this.type,
                    [`${prefixCls$6}-group`]: this.prepend || this.append,
                    [`${prefixCls$6}-group-${this.size}`]: (this.prepend || this.append) && !!this.size,
                    [`${prefixCls$6}-group-with-prepend`]: this.prepend,
                    [`${prefixCls$6}-group-with-append`]: this.append,
                    [`${prefixCls$6}-hide-icon`]: this.append  // #554
                }
            ];
        },
        inputClasses () {
            return [
                `${prefixCls$6}`,
                {
                    [`${prefixCls$6}-${this.size}`]: !!this.size,
                    [`${prefixCls$6}-disabled`]: this.disabled
                }
            ];
        },
        textareaClasses () {
            return [
                `${prefixCls$6}`,
                {
                    [`${prefixCls$6}-disabled`]: this.disabled
                }
            ];
        }
    },
    methods: {
        handleEnter (event) {
            this.$emit('on-enter', event);
        },
        handleKeydown (event) {
            this.$emit('on-keydown', event);
        },
        handleKeypress(event) {
            this.$emit('on-keypress', event);
        },
        handleKeyup (event) {
            this.$emit('on-keyup', event);
        },
        handleIconClick (event) {
            this.$emit('on-click', event);
        },
        handleFocus (event) {
            this.$emit('on-focus', event);
        },
        handleBlur (event) {
            this.$emit('on-blur', event);
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch('FormItem', 'on-form-blur', this.currentValue);
            }
        },
        handleInput (event) {
            let value = event.target.value;
            if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value);
            this.$emit('input', value);
            this.setCurrentValue(value);
            this.$emit('on-change', event);
        },
        handleChange (event) {
            this.$emit('on-input-change', event);
        },
        setCurrentValue (value) {
            if (value === this.currentValue) return;
            this.$nextTick(() => {
                this.resizeTextarea();
            });
            this.currentValue = value;
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch('FormItem', 'on-form-change', value);
            }
        },
        resizeTextarea () {
            const autosize = this.autosize;
            if (!autosize || this.type !== 'textarea') {
                return false;
            }

            const minRows = autosize.minRows;
            const maxRows = autosize.maxRows;

            this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
        },
        focus () {
            if (this.type === 'textarea') {
                this.$refs.textarea.focus();
            } else {
                this.$refs.input.focus();
            }
        },
        blur () {
            if (this.type === 'textarea') {
                this.$refs.textarea.blur();
            } else {
                this.$refs.input.blur();
            }
        }
    },
    watch: {
        value (val) {
            this.setCurrentValue(val);
        }
    },
    mounted () {
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

const prefixCls$7 = "badge";
var TmVueBadge$1 = { template: "<a v-if=\"href\" :class=\"classes\" :href=\"href\" target=\"_self\"> <slot></slot> </a> <span v-else :class=\"classes\" ref=\"badge\"> <slot></slot> </span>",
  name: "Badge",
  props: {
    href: {
      type: [Object, String]
    },
    variant: {
      default: "green",
      validator(value) {
        return oneOf(value, [
          "light-gray",
          "blue",
          "green",
          "cyan",
          "orange",
          "red",
          "yellow",
          "dark"
        ]);
      }
    }
  },
  computed: {
    classes() {
      return [`${prefixCls$7}`, `${prefixCls$7}-${this.variant}`];
    }
  }
};

TmVueBadge$1.install = function (V, options) {
    V.component(TmVueBadge$1.name, TmVueBadge$1);
};

const prefixCls$8 = "label";
var TmVueLabel$1 = { template: "<a v-if=\"href\" :class=\"classes\" :href=\"href\" target=\"_self\"> <slot></slot> </a> <span v-else :class=\"classes\" ref=\"label\"> <slot></slot> </span>",
  name: "Label",
  props: {
    href: {
      type: [Object, String]
    },
    variant: {
      default: "blue",
      validator(value) {
        return oneOf(value, [
          "blue",
          "green",
          "cyan",
          "orange",
          "red",
          "indigo",
          "yellow",
          "light-gray",
          "gray",
          "dark"
        ]);
      }
    }
  },
  computed: {
    classes() {
      return [`${prefixCls$8}`, `${prefixCls$8}-${this.variant}`];
    }
  }
};

TmVueLabel$1.install = function (V, options) {
    V.component(TmVueLabel$1.name, TmVueLabel$1);
};

const prefixCls$9 = "modal";
var TmVueModal$1 = { template: "<div> <div ref=\"modal\" :class=\"classes\" @keyup.esc=\"close()\" tabindex=\"-1\" aria-hidden=\"true\"> <div class=\"modal-dialog\" :class=\"modalClasses\" role=\"document\"> <div class=\"modal-content\"> <div v-if=\"needHeader\" class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\" class=\"icon icon-modal-close\" @click=\"close\"> </span> </button> <h3 class=\"modal-title\"> <slot name=\"title\"> {{title}} </slot> </h3> </div> <div class=\"modal-body\"> <slot></slot> </div> <div v-if=\"needFooter\" class=\"modal-footer\"> <slot name=\"footer\"> <button type=\"button\" class=\"btn btn-primary\" @click=\"ok\">{{okText}}</button> <button type=\"button\" class=\"btn btn-default\" @click=\"cancel\">{{cancelText}}</button> </slot> </div> </div> </div> </div> <div v-if=\"isShow\" class=\"modal-backdrop fade in\"></div> </div>",
  name: "TmVueModal",
  props: {
    opened: {
      type: Function,
      default: () => {}
    },
    closed: {
      type: Function,
      default: () => {}
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
      validator(value) {
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
  data() {
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
    classes() {
      return [
        `${prefixCls$9}`,
        {
          in: this.isOpen,
          show: this.isShow
        }
      ];
    },
    modalClasses() {
      return `modal-${this.type}`;
    }
  },
  methods: {
    open() {
      this.isOk = false;
      this.isShow = true;
      this.$nextTick(function() {
        this.isOpen = true;
        this.$refs.modal.focus();
        this.lastKnownBodyStyle.overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        this.opened();
      });
    },
    close() {
      this.isOpen = false;
      this.$nextTick(function() {
        setTimeout(() => {
          this.isShow = false;
          document.body.style.overflow = this.lastKnownBodyStyle.overflow;
          this.closed();
        }, 0);
      });
    },
    ok() {
      this.isOk = true;
      this.close();
    },
    cancel() {
      this.isOk = false;
      this.close();
    }
  }
};

TmVueModal$1.install = function (V, options) {
    V.component(TmVueModal$1.name, TmVueModal$1);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var jquery_ui_widget = createCommonjsModule(function (module, exports) {
/*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
* http://jqueryui.com
* Includes: widget.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof undefined === "function" && undefined.amd ) {

		// AMD. Register as an anonymous module.
		undefined([ "jquery" ], factory );

	} else {

		// Node/CommonJS
		factory( $$1 );

	}
}(function( $ ) {
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat(args) );
			}

			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;



}));
});

var jquery_fileupload = createCommonjsModule(function (module, exports) {
/*
 * jQuery File Upload Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */

(function (factory) {
    if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined([
            'jquery',
            'jquery-ui/ui/widget'
        ], factory);
    } else {
        // Node/CommonJS:
        factory(
            $$1,
            jquery_ui_widget
        );
    }
}(function ($) {
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file"/>').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.uploadName || file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(
                            paramName,
                            options.blob,
                            file.uploadName || file.name
                        );
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).then(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).then(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || ($.type(mcs) === 'function' ? mcs(options) : mcs) < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + ($.type(mcs) === 'function' ? mcs(o) : mcs),
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.then(send);
                } else {
                    this._sequence = this._sequence.then(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (!filesLength) {
                return false;
            }
            if (limitSize && files[0].size === undefined) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true),
                restoreFocus = input.is(document.activeElement);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // If the fileInput had focus before it was detached,
            // restore focus to the inputClone.
            if (restoreFocus) {
                inputClone.focus();
            }
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                entries = [],
                dirReader,
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                };
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).then(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).then(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _destroy: function () {
            this._destroyEventHandlers();
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                this.element[0].attributes,
                function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));
});

var TmVueUpload$1 = { template: "<div ref=\"upload\"> <div v-if=\"single\" class=\"control-wrapper\" style=\"padding-left:0px\"> <input :id=\"id\" type=\"file\" name=\"file\" data-file-upload=\"singleFile\"> <label :for=\"id\" class=\"btn btn-default\">Select Files...</label> <div v-show=\"showInfo\" class=\"file-info-container\"> <span>{{fileName}}</span> <span class=\"file-size\">{{fileSize}}</span> <span class=\"icon icon-cancel\" @click=\"cancel\"></span> </div> </div> <div v-else class=\"control-wrapper\"> todo multiple </div> </div>",
  name: "TmVueUpload",
  props: {
    id: {
      type: String,
      default: ""
    },
    single: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default(){
         return {
          autoUpload:false,
          url: "",
          singleFileUploads: true,
          paramName: "file",
          sequentialUploads: true,
          formData: {}
        } 
      }
    },
    done: {
      type: Function,
      default: () => {}
    },
    
  },
  data() {
    return {
      fileName: null,
      fileSize: null,
      showInfo: false,
      files:null,
      status:"NONE"
    };
  },
  watch:{
    status(){
      debugger;
      $$1(`#${this.id}`).fileupload();
    }
  },
  methods: {
    formatFileSize(bytes) {
      if (typeof bytes !== "number") {
        return "";
      }
      if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + " GB";
      }
      if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + " MB";
      }
      return (bytes / 1000).toFixed(2) + " KB";
    },
    cancel() {
      this.showInfo = false;
      this.fileName = "";
      this.fileSize = "";
    }
  },
  mounted() {
    var _self = this;
    $$1(`#${this.id}`)
      .fileupload(this.options)
      .on("fileuploadadd", function(e, data) {
        _self.files = data.files;
        _self.fileName = data.files[0].name;
        _self.fileSize = "(" + _self.formatFileSize(data.files[0].size) + ")";
        _self.showInfo = true;
      })
      .on("fileuploaddone",function(e,data){
        _self.done();
      });
  }
};

TmVueUpload$1.install = function (V, options) {
    V.component(TmVueUpload$1.name, TmVueUpload$1);
};

(function($) {
  $.fn.caret = function(pos) {
    var target = this[0];
    var isContentEditable = target && target.contentEditable === 'true';
    if (arguments.length == 0) {
      //get
      if (target) {
        //HTML5
        if (window.getSelection) {
          //contenteditable
          if (isContentEditable) {
            target.focus();
            var range1 = window.getSelection().getRangeAt(0),
                range2 = range1.cloneRange();
            range2.selectNodeContents(target);
            range2.setEnd(range1.endContainer, range1.endOffset);
            return range2.toString().length;
          }
          //textarea
          return target.selectionStart;
        }
        //IE<9
        if (document.selection) {
          target.focus();
          //contenteditable
          if (isContentEditable) {
              var range1 = document.selection.createRange(),
                  range2 = document.body.createTextRange();
              range2.moveToElementText(target);
              range2.setEndPoint('EndToEnd', range1);
              return range2.text.length;
          }
          //textarea
          var pos = 0,
              range = target.createTextRange(),
              range2 = document.selection.createRange().duplicate(),
              bookmark = range2.getBookmark();
          range.moveToBookmark(bookmark);
          while (range.moveStart('character', -1) !== 0) pos++;
          return pos;
        }
        // Addition for jsdom support
        if (target.selectionStart)
          return target.selectionStart;
      }
      //not supported
      return;
    }
    //set
    if (target) {
      if (pos == -1)
        pos = this[isContentEditable? 'text' : 'val']().length;
      //HTML5
      if (window.getSelection) {
        //contenteditable
        if (isContentEditable) {
          target.focus();
          window.getSelection().collapse(target.firstChild, pos);
        }
        //textarea
        else
          target.setSelectionRange(pos, pos);
      }
      //IE<9
      else if (document.body.createTextRange) {
        if (isContentEditable) {
          var range = document.body.createTextRange();
          range.moveToElementText(target);
          range.moveStart('character', pos);
          range.collapse(true);
          range.select();
        } else {
          var range = target.createTextRange();
          range.move('character', pos);
          range.select();
        }
      }
      if (!isContentEditable)
        target.focus();
    }
    return this;
  };
})(jQuery);

/*
	jQuery tagEditor v1.0.21
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-tagEditor
	License: http://www.opensource.org/licenses/mit-license.php
*/

(function($){
    // auto grow input (stackoverflow.com/questions/931207)
    $.fn.tagEditorInput=function(){var t=" ",e=$(this),n=parseInt(e.css("fontSize")),i=$("<span/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:e.css("fontSize"),fontFamily:e.css("fontFamily"),fontWeight:e.css("fontWeight"),letterSpacing:e.css("letterSpacing"),whiteSpace:"nowrap"}),s=function(){if(t!==(t=e.val())){i.text(t);var s=i.width()+n;20>s&&(s=20), s!=e.width()&&e.width(s);}};return i.insertAfter(e), e.bind("keyup keydown focus",s)};

    // plugin with val as parameter for public methods
    $.fn.tagEditor = function(options, val, blur){

        // helper
        function escape(tag) {
            return tag.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }

        // build options dictionary with default values
        var blur_result, o = $.extend({}, $.fn.tagEditor.defaults, options), selector = this;

        // store regex and default delimiter in options for later use
        o.dregex = new RegExp('['+o.delimiter.replace('-', '\-')+']', 'g');

        // public methods
        if (typeof options == 'string') {
            // depending on selector, response may contain tag lists of multiple editor instances
            var response = [];
            selector.each(function(){
                // the editor is the next sibling to the hidden, original field
                var el = $(this), o = el.data('options'), ed = el.next('.tag-editor');
                if (options == 'getTags')
                    response.push({field: el[0], editor: ed, tags: ed.data('tags')});
                else if (options == 'addTag') {
                    if (o.maxTags && ed.data('tags').length >= o.maxTags) return false;
                    // insert new tag
                    $('<li><div class="tag-editor-spacer">&nbsp;'+o.delimiter[0]+'</div><div class="tag-editor-tag"></div><div class="tag-editor-delete"><i></i></div></li>').appendTo(ed).find('.tag-editor-tag')
                        .html('<input type="text" maxlength="'+o.maxLength+'">').addClass('active').find('input').val(val).blur();
                    if (!blur) ed.click();
                    else $('.placeholder', ed).remove();
                } else if (options == 'removeTag') {
                    // trigger delete on matching tag, then click editor to create a new tag
                    $('.tag-editor-tag', ed).filter(function(){return $(this).text()==val;}).closest('li').find('.tag-editor-delete').click();
                    if (!blur) ed.click();
                } else if (options == 'destroy') {
                    el.removeClass('tag-editor-hidden-src').removeData('options').off('focus.tag-editor').next('.tag-editor').remove();
                }
            });
            return options == 'getTags' ? response : this;
        }

        // delete selected tags on backspace, delete, ctrl+x
        if (window.getSelection) $(document).off('keydown.tag-editor').on('keydown.tag-editor', function(e){
            if (e.which == 8 || e.which == 46 || e.ctrlKey && e.which == 88) {
                try {
                    var sel = getSelection(), el = document.activeElement.tagName != 'INPUT' ? $(sel.getRangeAt(0).startContainer.parentNode).closest('.tag-editor') : 0;
                } catch(e){ el = 0; }
                if (sel.rangeCount > 0 && el && el.length) {
                    var tags = [], splits = sel.toString().split(el.prev().data('options').dregex);
                    for (i=0; i<splits.length; i++){ var tag = $.trim(splits[i]); if (tag) tags.push(tag); }
                    $('.tag-editor-tag', el).each(function(){
                        if (~$.inArray($(this).text(), tags)) $(this).closest('li').find('.tag-editor-delete').click();
                    });
                    return false;
                }
            }
        });

        return selector.each(function(){
            var el = $(this), tag_list = []; // cache current tags

            // create editor (ed) instance
            var ed = $('<ul '+(o.clickDelete ? 'oncontextmenu="return false;" ' : '')+'class="tag-editor"></ul>').insertAfter(el);
            el.addClass('tag-editor-hidden-src') // hide original field
                .data('options', o) // set data on hidden field
                .on('focus.tag-editor', function(){ ed.click(); }); // simulate tabindex

            // add dummy item for min-height on empty editor
            ed.append('<li style="width:1px">&nbsp;</li>');

            // markup for new tag
            var new_tag = '<li><div class="tag-editor-spacer">&nbsp;'+o.delimiter[0]+'</div><div class="tag-editor-tag"></div><div class="tag-editor-delete"><i></i></div></li>';

            // helper: update global data
            function set_placeholder(){
                if (o.placeholder && !tag_list.length && !$('.deleted, .placeholder, input', ed).length)
                    ed.append('<li class="placeholder"><div>'+o.placeholder+'</div></li>');
            }

            // helper: update global data
            function update_globals(init){
                var old_tags = tag_list.toString();
                tag_list = $('.tag-editor-tag:not(.deleted)', ed).map(function(i, e) {
                    var val = $.trim($(this).hasClass('active') ? $(this).find('input').val() : $(e).text());
                    if (val) return val;
                }).get();
                ed.data('tags', tag_list);
                el.val(tag_list.join(o.delimiter[0]));
                // change callback except for plugin init
                if (!init) if (old_tags != tag_list.toString()) o.onChange(el, ed, tag_list);
                set_placeholder();
            }

            ed.click(function(e, closest_tag){
                var d, dist = 99999, loc;

                // do not create tag when user selects tags by text selection
                if (window.getSelection && getSelection() != '') return;

                if (o.maxTags && ed.data('tags').length >= o.maxTags) { ed.find('input').blur(); return false; }

                blur_result = true;
                $('input:focus', ed).blur();
                if (!blur_result) return false;
                blur_result = true;

                // always remove placeholder on click
                $('.placeholder', ed).remove();
                if (closest_tag && closest_tag.length)
                    loc = 'before';
                else {
                    // calculate tag closest to click position
                    $('.tag-editor-tag', ed).each(function(){
                        var tag = $(this), to = tag.offset(), tag_x = to.left, tag_y = to.top;
                        if (e.pageY >= tag_y && e.pageY <= tag_y+tag.height()) {
                            if (e.pageX < tag_x) loc = 'before', d = tag_x - e.pageX;
                            else loc = 'after', d = e.pageX - tag_x - tag.width();
                            if (d < dist) dist = d, closest_tag = tag;
                        }
                    });
                }

                if (loc == 'before') {
                    $(new_tag).insertBefore(closest_tag.closest('li')).find('.tag-editor-tag').click();
                } else if (loc == 'after')
                    $(new_tag).insertAfter(closest_tag.closest('li')).find('.tag-editor-tag').click();
                else // empty editor
                    $(new_tag).appendTo(ed).find('.tag-editor-tag').click();
                return false;
            });

            ed.on('click', '.tag-editor-delete', function(e){
                // delete icon is hidden when input is visible; place cursor near invisible delete icon on click
                if ($(this).prev().hasClass('active')) { $(this).closest('li').find('input').caret(-1); return false; }

                var li = $(this).closest('li'), tag = li.find('.tag-editor-tag');
                if (o.beforeTagDelete(el, ed, tag_list, tag.text()) === false) return false;
                tag.addClass('deleted').animate({width: 0}, o.animateDelete, function(){ li.remove(); set_placeholder(); });
                update_globals();
                return false;
            });

            // delete on right mouse click or ctrl+click
            if (o.clickDelete)
                ed.on('mousedown', '.tag-editor-tag', function(e){
                    if (e.ctrlKey || e.which > 1) {
                        var li = $(this).closest('li'), tag = li.find('.tag-editor-tag');
                        if (o.beforeTagDelete(el, ed, tag_list, tag.text()) === false) return false;
                        tag.addClass('deleted').animate({width: 0}, o.animateDelete, function(){ li.remove(); set_placeholder(); });
                        update_globals();
                        return false;
                    }
                });

            ed.on('click', '.tag-editor-tag', function(e){
                // delete on right click or ctrl+click -> exit
                if (o.clickDelete && (e.ctrlKey || e.which > 1)) return false;

                if (!$(this).hasClass('active')) {
                    var tag = $(this).text();
                    // guess cursor position in text input
                    var left_percent = Math.abs(($(this).offset().left - e.pageX)/$(this).width()), caret_pos = parseInt(tag.length*left_percent),
                        input = $(this).html('<input type="text" maxlength="'+o.maxLength+'" value="'+escape(tag)+'">').addClass('active').find('input');
                        input.data('old_tag', tag).tagEditorInput().focus().caret(caret_pos);
                    if (o.autocomplete) {
                        var aco = $.extend({}, o.autocomplete);
                        // extend user provided autocomplete select method
                        var ac_select = 'select'  in aco ? o.autocomplete.select : '';
                        aco.select = function(e, ui){ if (ac_select) ac_select(e, ui); setTimeout(function(){
                            ed.trigger('click', [$('.active', ed).find('input').closest('li').next('li').find('.tag-editor-tag')]);
                        }, 20); };
                        input.autocomplete(aco);
                    }
                }
                return false;
            });

            // helper: split into multiple tags, e.g. after paste
            function split_cleanup(input){
                var li = input.closest('li'), sub_tags = input.val().replace(/ +/, ' ').split(o.dregex),
                    old_tag = input.data('old_tag'), old_tags = tag_list.slice(0), exceeded = false, cb_val; // copy tag_list
                for (var i=0; i<sub_tags.length; i++) {
                    tag = $.trim(sub_tags[i]).slice(0, o.maxLength);
                    if (o.forceLowercase) tag = tag.toLowerCase();
                    cb_val = o.beforeTagSave(el, ed, old_tags, old_tag, tag);
                    tag = cb_val || tag;
                    if (cb_val === false || !tag) continue;
                    // remove duplicates
                    if (o.removeDuplicates && ~$.inArray(tag, old_tags))
                        $('.tag-editor-tag', ed).each(function(){ if ($(this).text() == tag) $(this).closest('li').remove(); });
                    old_tags.push(tag);
                    li.before('<li><div class="tag-editor-spacer">&nbsp;'+o.delimiter[0]+'</div><div class="tag-editor-tag">'+escape(tag)+'</div><div class="tag-editor-delete"><i></i></div></li>');
                    if (o.maxTags && old_tags.length >= o.maxTags) { exceeded = true; break; }
                }
                input.attr('maxlength', o.maxLength).removeData('old_tag').val('');
                if (exceeded) input.blur(); else input.focus();
                update_globals();
            }

            ed.on('blur', 'input', function(e){
                e.stopPropagation();
                var input = $(this), old_tag = input.data('old_tag'), tag = $.trim(input.val().replace(/ +/, ' ').replace(o.dregex, o.delimiter[0])), cb_val;
                if (!tag) {
                    if (old_tag && o.beforeTagDelete(el, ed, tag_list, old_tag) === false) {
                        input.val(old_tag).focus();
                        blur_result = false;
                        update_globals();
                        return;
                    }
                    try { input.closest('li').remove(); } catch(e){}
                    if (old_tag) update_globals();
                }
                else if (tag.indexOf(o.delimiter[0])>=0) { split_cleanup(input); return; }
                else if (tag != old_tag) {
                    if (o.forceLowercase) tag = tag.toLowerCase();
                    cb_val = o.beforeTagSave(el, ed, tag_list, old_tag, tag);
                    tag = cb_val || tag;
                    if (cb_val === false) {
                        if (old_tag) {
                            input.val(old_tag).focus();
                            blur_result = false;
                            update_globals();
                            return;
                        }
                        try { input.closest('li').remove(); } catch(e){}
                        if (old_tag) update_globals();
                    }
                    // remove duplicates
                    else if (o.removeDuplicates)
                        $('.tag-editor-tag:not(.active)', ed).each(function(){ if ($(this).text() == tag) $(this).closest('li').remove(); });
                }
                input.parent().html(escape(tag)).removeClass('active');
                if (tag != old_tag) update_globals();
                set_placeholder();
            });

            var pasted_content;
            ed.on('paste', 'input', function(e){
                $(this).removeAttr('maxlength');
                pasted_content = $(this);
                setTimeout(function(){ split_cleanup(pasted_content); }, 30);
            });

            // keypress delimiter
            var inp;
            ed.on('keypress', 'input', function(e){
                if (o.delimiter.indexOf(String.fromCharCode(e.which))>=0) {
                    inp = $(this);
                    setTimeout(function(){ split_cleanup(inp); }, 20);
                }
            });

            ed.on('keydown', 'input', function(e){
                var $t = $(this);

                // left/up key + backspace key on empty field
                if ((e.which == 37 || !o.autocomplete && e.which == 38) && !$t.caret() || e.which == 8 && !$t.val()) {
                    var prev_tag = $t.closest('li').prev('li').find('.tag-editor-tag');
                    if (prev_tag.length) prev_tag.click().find('input').caret(-1);
                    else if ($t.val() && !(o.maxTags && ed.data('tags').length >= o.maxTags)) $(new_tag).insertBefore($t.closest('li')).find('.tag-editor-tag').click();
                    return false;
                }
                // right/down key
                else if ((e.which == 39 || !o.autocomplete && e.which == 40) && ($t.caret() == $t.val().length)) {
                    var next_tag = $t.closest('li').next('li').find('.tag-editor-tag');
                    if (next_tag.length) next_tag.click().find('input').caret(0);
                    else if ($t.val()) ed.click();
                    return false;
                }
                // tab key
                else if (e.which == 9) {
                    // shift+tab
                    if (e.shiftKey) {
                        var prev_tag = $t.closest('li').prev('li').find('.tag-editor-tag');
                        if (prev_tag.length) prev_tag.click().find('input').caret(0);
                        else if ($t.val() && !(o.maxTags && ed.data('tags').length >= o.maxTags)) $(new_tag).insertBefore($t.closest('li')).find('.tag-editor-tag').click();
                        // allow tabbing to previous element
                        else {
                            el.attr('disabled', 'disabled');
                            setTimeout(function(){ el.removeAttr('disabled'); }, 30);
                            return;
                        }
                        return false;
                    // tab
                    } else {
                        var next_tag = $t.closest('li').next('li').find('.tag-editor-tag');
                        if (next_tag.length) next_tag.click().find('input').caret(0);
                        else if ($t.val()) ed.click();
                        else return; // allow tabbing to next element
                        return false;
                    }
                }
                // del key
                else if (e.which == 46 && (!$.trim($t.val()) || ($t.caret() == $t.val().length))) {
                    var next_tag = $t.closest('li').next('li').find('.tag-editor-tag');
                    if (next_tag.length) next_tag.click().find('input').caret(0);
                    else if ($t.val()) ed.click();
                    return false;
                }
                // enter key
                else if (e.which == 13) {
                    ed.trigger('click', [$t.closest('li').next('li').find('.tag-editor-tag')]);

                    // trigger blur if maxTags limit is reached
                    if (o.maxTags && ed.data('tags').length >= o.maxTags) ed.find('input').blur();

                    return false;
                }
                // pos1
                else if (e.which == 36 && !$t.caret()) ed.find('.tag-editor-tag').first().click();
                // end
                else if (e.which == 35 && $t.caret() == $t.val().length) ed.find('.tag-editor-tag').last().click();
                // esc
                else if (e.which == 27) {
                    $t.val($t.data('old_tag') ? $t.data('old_tag') : '').blur();
                    return false;
                }
            });

            // create initial tags
            var tags = o.initialTags.length ? o.initialTags : el.val().split(o.dregex);
            for (var i=0; i<tags.length; i++) {
                if (o.maxTags && i >= o.maxTags) break;
                var tag = $.trim(tags[i].replace(/ +/, ' '));
                if (tag) {
                    if (o.forceLowercase) tag = tag.toLowerCase();
                    tag_list.push(tag);
                    ed.append('<li><div class="tag-editor-spacer">&nbsp;'+o.delimiter[0]+'</div><div class="tag-editor-tag">'+escape(tag)+'</div><div class="tag-editor-delete"><i></i></div></li>');
                }
            }
            update_globals(true); // true -> no onChange callback

            // init sortable
            if (o.sortable && $.fn.sortable) ed.sortable({
                distance: 5, cancel: '.tag-editor-spacer, input', helper: 'clone',
                update: function(){ update_globals(); }
            });
        });
    };

    $.fn.tagEditor.defaults = {
        initialTags: [],
        maxTags: 0,
        maxLength: 50,
        delimiter: ',;',
        placeholder: '',
        forceLowercase: true,
        removeDuplicates: true,
        clickDelete: false,
        animateDelete: 175,
        sortable: true, // jQuery UI sortable
        autocomplete: null, // options dict for jQuery UI autocomplete

        // callbacks
        onChange: function(){},
        beforeTagSave: function(){},
        beforeTagDelete: function(){}
    };
}(jQuery));

var TmVueTag$1 = { template: "<input type=\"text\">",
  name: "TmVueTag",
  model: {
    prop: "initialTags"
  },
  props: {
    initialTags: {
      type: Array,
      default: []
    },
    delimiter: {
      type: String,
      default: ", "
    },
    placeholder: {
      type: String,
      default: "Enter tags ..."
    }
  },
  mounted() {
    debugger;
    $(this.$el).tagEditor({
      initialTags: this.initialTags,
      delimiter: this.delimiter /* space and comma */,
      placeholder: this.placeholder,
      animateDelete: 0,
      beforeTagSave: function(field, editor, tags, val) {
        editor.find(".tag-editor-tag").scrollLeft(0);
      }
    });
  }
};

TmVueTag$1.install = function (V, options) {
    V.component(TmVueTag$1.name, TmVueTag$1);
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
Vue.use(TmVueUpload$1);
Vue.use(TmVueTag$1);

})));
