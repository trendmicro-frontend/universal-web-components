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
  props: {
    value: {
      type: [String, Array],
      default: ""
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
  computed: {
    initialTags: function() {
      return this.value;
    }
  },
  mounted() {
    var _self = this;
    $(this.$el).tagEditor({
      initialTags: _.isString(this.initialTags)
        ? this.initialTags.split(this.delimiter)
        : this.initialTags,
      delimiter: this.delimiter /* space and comma */,
      placeholder: this.placeholder,
      animateDelete: 0,
      sortable: false,
      beforeTagSave: function(field, editor, tags, val) {
        editor.find(".tag-editor-tag").scrollLeft(0);
        $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
      },
      onChange: function(field, editor, tags) {
        _self.value = tags.join(_self.delimiter);
        _self.$emit('input', _self.value);
      }
    });
    // tag editor patch
    this.$el.nextSibling.firstChild.remove();
    $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
  }
};
</script>