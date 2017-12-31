<template>
    <a v-if="href" :class="classes" :href="href" target="_self" >
        <slot></slot>
    </a>
    <span v-else :class="classes" ref="badge">
        <slot></slot>
    </span>
</template>
<script>
import { oneOf } from "../../utils/assist";
const prefixCls = "badge";
export default {
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
      return [`${prefixCls}`, `${prefixCls}-${this.variant}`];
    }
  }
};
</script>