<template>
    <input type="text">
</template>
<script>
import "jquery";
import "caret/jquery.caret";
import "jQuery-tagEditor/jquery.tag-editor";
import _ from "lodash";
const prefixCls = "tag";
export default {
  name: "TmVueTag",
  model: {
    prop: "initialTags"
  },
  props: {
    initialTags: {
      type: [String, Array],
      default() {
        return [];
      }
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
    $(this.$el).tagEditor({
      initialTags: _.isString(this.initialTags)?this.initialTags.split(this.initialTags,this.delimiter):this.initialTags,
      delimiter: this.delimiter /* space and comma */,
      placeholder: this.placeholder,
      animateDelete: 0,
      sortable: false,
      beforeTagSave: function(field, editor, tags, val) {
        editor.find(".tag-editor-tag").scrollLeft(0);
        $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
      }
    });
    // tag editor patch
    this.$el.nextSibling.firstChild.remove();
    $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
  }
};
</script>