<template>
    <input type="text">
</template>
<script>
import "jquery";
import "caret/jquery.caret";
import "jQuery-tagEditor/jquery.tag-editor";


const prefixCls = "tag";
export default {
  name: "TmVueTag",
  model: {
    prop: "initialTags"
  },
  props: {
    initialTags: {
      type: Array,
      default: []
    },
    delimiter: {
      type: String,
      default: ", "
    },
    placeholder: {
      type: String,
      default: "Enter tags ..."
    }
  },
  mounted() {
    debugger;
    $(this.$el).tagEditor({
      initialTags: this.initialTags,
      delimiter: this.delimiter /* space and comma */,
      placeholder: this.placeholder,
      animateDelete: 0,
      beforeTagSave: function(field, editor, tags, val) {
        editor.find(".tag-editor-tag").scrollLeft(0);
      }
    });
  }
};
</script>