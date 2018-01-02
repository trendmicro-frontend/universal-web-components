<template>
    <a v-if="href" :class="classes" :href="href" target="_self" >
        <slot></slot>
    </a>
    <span v-else :class="classes" ref="label">
        <slot></slot>
    </span>
</template>
<script>
import { oneOf } from "../../utils/assist";
const prefixCls = "label";
export default {
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
      return [`${prefixCls}`, `${prefixCls}-${this.variant}`];
    }
  }
};
</script>