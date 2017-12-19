<template>
    <li v-if="to" >
      <a :href="to" :class="linkClasses" @click="handleClick">
        <slot></slot>
      </a>
    </li>
    <li v-else class="active">
      <slot></slot>
    </li>
</template>
<script>

const prefixCls = "tm-vue-breadcrumb-item";

export default {
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
      return `${prefixCls}-link`;
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
</script>
