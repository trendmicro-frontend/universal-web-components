<template>
  <div :class="classes">
    <ol class="breadcrumb">
      <slot></slot>
    </ol>
  </div>
</template>
<script>
const prefixCls = "uwc";

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
