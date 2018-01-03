<template>
  <div class="input-group has-clear" style="width:100%">
      <div class="input-icon-group" style="width:100%">
          <input type="text" class="form-control" :placeholder="placeholder"  style="width:100%" v-model="textVal" v-on:input="updated" v-on:keyup.enter="changed">
          <span class="form-control-clear icon icon-cancel hidden"></span>
      </div>
      <span class="input-group-btn">
          <button type="button" class="btn btn-default btn-icon-only" v-on:click="changed"><span
                  class="fa fa-search"></span></button>
      </span>
  </div>
</template>

<script>

export default {
  name: "TmVueSearchButton",
  props: {
    placeholder: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {
      textVal: ""
    };
  },
  methods: {
    changed: function(e) {
      this.$emit("changed", this.textVal);
    },
    updated: function() {
      this.$emit("updated", this.textVal);
    }
  },

  mounted: function() {
    var self = this;
    /**
             * todo
             * should bind custom element
             */
    $('.has-clear input[type="text"]')
      .on("input propertychange", function() {
        var $this = $(this);
        var visible = Boolean($this.val());
        $this.siblings(".form-control-clear").toggleClass("hidden", !visible);
      })
      .trigger("propertychange");

    $(".form-control-clear").click(function() {
      self.textVal = "";
      $(this)
        .siblings('input[type="text"]')
        .val("")
        .trigger("propertychange")
        .focus();
    });
  }
};
</script>