<template>
    <textarea>{{value}}</textarea>
</template>

<script>
import autosize from 'autosize'

export default {
  name: "TmVueAutosizeTextarea",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    autosize(this.$el);
  }
}
</script>