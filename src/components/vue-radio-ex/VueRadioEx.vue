<template>
  <div v-if="group" :class="radioClasses">
    <input type="radio" :name="name" :id="id" :class="inputRadioClasses" :checked="checked" :disabled="disabled" @change="change" >
    <label :for="id">{{label}}</label>
  </div>
  <div v-else :class="radioClasses">
    <input type="radio" :name="name" :id="id" :class="inputRadioClasses" :checked="checked" :disabled="disabled" @change="change">
    <label :for="id">{{label}}</label>
  </div>
</template>

<script>
const prefixCls = "radio";
import { findComponentUpward, oneOf } from "../../utils/assist";
import Emitter from "../../mixins/emitter";

export default {
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
</script>