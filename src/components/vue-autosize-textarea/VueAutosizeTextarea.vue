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
  watch:{
    value:function(){
      autosize.update(this.$el);
    }
  },
  updated() {
    autosize.update(this.$el);
  },
  mounted() {
    autosize(this.$el);
  }
}
</script>