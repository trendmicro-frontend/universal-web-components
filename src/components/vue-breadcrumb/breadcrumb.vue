<template>
    <ol :class="classes">
        <slot></slot>
    </ol>
</template>
<script>
const prefixCls = "breadcrumb";

export default {
  name: "TmVueBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    }
  },
  computed: {
    classes() {
      return `${prefixCls}`;
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
</script>
