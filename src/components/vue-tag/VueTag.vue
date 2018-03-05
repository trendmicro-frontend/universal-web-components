<template>
  <input type="text">
</template>
<script>
import "jquery";
import "caret/jquery.caret";
import "jQuery-tagEditor/jquery.tag-editor";
import _ from "lodash";
const prefixCls = "tag";

function MaskIt(obj) {
  var hoverdiv =
    '<div class="divMask" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: #fff; opacity: 0; filter: alpha(opacity=0);z-index:5;cursor:not-allowed;"></div>';
  $(obj).wrap('<div class="position:relative;"></div>');
  $(obj).before(hoverdiv);
  $(obj).data("mask", true);
}
function UnMaskIt(obj) {
  if ($(obj).data("mask") == true) {
    $(obj)
      .parent()
      .find(".divMask")
      .remove();
    $(obj).unwrap();
    $(obj).data("mask", false);
  }
  $(obj).data("mask", false);
}
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
    },
    forceLowercase: {
      type: Boolean,
      default: false
    },
    removeDuplicates:{
      type: Boolean,
      default:false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    init: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    initialTags: function() {
      return this.value;
    }
  },
  watch: {
    disabled: function(disabled) {
      if (disabled) {
        MaskIt(this.nextSibling);
        // $(this.$el.nextSibling).addClass("disabled");
      } else {
        UnMaskIt(this.nextSibling);
        // $(this.$el.nextSibling).removeClass("disabled");
      }
    },
    init: function() {
      var _self = this;
      $(this.$el).tagEditor({
        initialTags: _.isEmpty(this.initialTags)
          ? []
          : this.initialTags.split(this.delimiter),
        delimiter: this.delimiter /* space and comma */,
        placeholder: this.placeholder,
        forceLowercase: this.forceLowercase,
        removeDuplicates: this.removeDuplicates,
        animateDelete: 0,
        sortable: false,
        beforeTagSave: function(field, editor, tags, val) {
          editor.find(".tag-editor-tag").scrollLeft(0);
          $(".tag-editor-delete").html(
            "<span class='icon icon-cancel'></span>"
          );
        },
        onChange: function(field, editor, tags) {
          _self.value = tags.join(_self.delimiter);
          _self.$emit("input", _self.value);
        }
      });
      // tag editor patch
      this.$el.nextSibling.firstChild.remove();
      this.nextSibling = this.$el.nextSibling;
      if (this.disabled) {
        this.nextSibling = this.$el.nextSibling;
        MaskIt(this.nextSibling);
        // $(this.$el.nextSibling).addClass("disabled");
      } else {
        UnMaskIt(this.nextSibling);
        // $(this.$el.nextSibling).removeClass("disabled");
      }
      $(".tag-editor-delete").html("<span class='icon icon-cancel'></span>");
    }
  }
};
</script>