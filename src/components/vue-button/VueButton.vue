<template>
    <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">
        <Icon type="loader loader-small" v-if="loading"></Icon>
        <Icon :type="icon" v-if="icon && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>
<script>
import Icon from "../icon";
import { oneOf } from "../../utils/assist";

const prefixCls = "btn";

export default {
  name: "TmVueButton",
  components: { Icon },
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
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-block`]: !!this.full,
          [`${prefixCls}-icon-only`]:
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
</script>


<style lang="less">
  /*@import "../../third-party/less/ddei.less";*/
</style>

