<template>
    <span :class="classes" :style="styles"></span>
</template>
<script>
const prefixCls = "";

export default {
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
</script>
