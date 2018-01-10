<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
import { oneOf, findComponentsDownward } from "../../utils/assist";
import Emitter from "../../mixins/emitter";

const prefixCls = "vue-radio-group";

export default {
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
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`ivu-radio-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-vertical`]: this.vertical
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
</script>
