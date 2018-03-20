<template>
    <div ref="upload">
        <div v-if="single" class="control-wrapper" style="padding-left:0px">
            <input :id="id" type="file" name="file" data-file-upload="singleFile">
            <label :for="id" class="btn btn-default">{{title}}</label>
            <div v-show="showInfo" class="file-info-container">
                <span>{{fileName}}</span>
                <span class="file-size">{{fileSize}}</span>
                <span class="icon icon-cancel" @click="cancel"></span>
            </div>
        </div>
        <div v-else class="control-wrapper">
            todo multiple
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import "blueimp-file-upload";
import "blueimp-file-upload/js/jquery.fileupload-validate";
import "blueimp-file-upload/js/jquery.fileupload-process";
import "blueimp-file-upload/js/vendor/jquery.ui.widget";

export default {
  name: "TmVueUpload",
  props: {
    title: {
      type: String,
      default: "Select Files..."
    },
    id: {
      type: String,
      default: ""
    },
    single: {
      type: Boolean,
      default: true
    },
    hide: {
      type:Boolean,
      default: true
    },
    options: {
      type: Object,
      default() {
        return {
          maxFileSize: "@",
          acceptFileTypes: "@",
          dataType: "json",
          autoUpload: false,
          url: "",
          singleFileUploads: true,
          paramName: "file",
          sequentialUploads: true,
          formData: {},
          processstart: function(e, data) {},
          processstop: function(e, data) {},
          processfail: function(e, data) {},
          processdone: function(e, data) {}
        };
      }
    },
    add: {
      type: Function,
      default: () => {}
    },
    done: {
      type: Function,
      default: () => {}
    },
    reset: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      fileName: null,
      fileSize: null,
      showInfo: false,
      files: null
    };
  },
  watch: {
    reset() {
      this.cancel();
    }
  },
  methods: {
    formatFileSize(bytes) {
      if (typeof bytes !== "number") {
        return "";
      }
      if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + " GB";
      }
      if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + " MB";
      }
      return (bytes / 1000).toFixed(2) + " KB";
    },
    cancel() {
      this.showInfo = false;
      this.fileName = "";
      this.fileSize = "";
      this.files = null;
    }
  },
  mounted() {
    var messagesMap = {
      "Maximum number of files exceeded": "MAXNUMBEROFFILES",
      "File type not allowed": "ACCEPTFILETYPES",
      "File is too large": "MAXFILESIZE",
      "File is too small": "MINFILESIZE"
    };
    var _self = this;
    var ERROR_FILE_TYPE = -1;
    var ERROR_FILE_SIZE = -2;
    this.options = this.options || {};

    var originalProcessFail = this.options.processfail || function(){};
    this.options.processfail = function(e, data)
    {
      data.files.forEach(file => {
        file.errorType = messagesMap[file.error];
      });
      originalProcessFail(e,data);
    };
    $(`#${this.id}`)
      .fileupload(this.options)
      .on("fileuploadadd", function(e, data) {
        _self.files = data.files;
        _self.fileName = data.files[0].name;
        _self.fileSize = "(" + _self.formatFileSize(data.files[0].size) + ")";
        _self.showInfo = true;
      })
      .on("fileuploaddone", function(e, data) {
        if(_self.hide){
          _self.cancel();
        }
        _self.done(e, data);
      });
  }
};
</script>