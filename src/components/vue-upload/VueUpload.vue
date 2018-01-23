<template>
    <div ref="upload">
        <div v-if="single" class="control-wrapper" style="padding-left:0px">
            <input :id="id" type="file" name="file" data-file-upload="singleFile">
            <label :for="id" class="btn btn-default">Select Files...</label>
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

export default {
  name: "TmVueUpload",
  props: {
    id: {
      type: String,
      default: ""
    },
    single: {
      type: Boolean,
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
          formData: {}
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
    }
  },

  data() {
    return {
      fileName: null,
      fileSize: null,
      showInfo: false,
      files: null,
      status: "NONE"
    };
  },
  watch: {
    status() {
      $(`#${this.id}`).fileupload();
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
    }
  },
  mounted() {
    var _self = this;
    var ERROR_FILE_TYPE = -1;
    var ERROR_FILE_SIZE = -2;
    $(`#${this.id}`)
      .fileupload(this.options)
      .on("fileuploadadd", function(e, data) {
        _self.files = data.files;
        _self.fileName = data.files[0].name;
        _self.fileSize = "(" + _self.formatFileSize(data.files[0].size) + ")";
        _self.showInfo = true;
        var uploadErrors = [];
        var acceptFileTypes = _self.options.acceptFileTypes;
        if (acceptFileTypes) {
          if (
            data.originalFiles[0]["type"].length &&
            !acceptFileTypes.test(data.originalFiles[0]["type"])
          ) {
            uploadErrors.push(ERROR_FILE_TYPE);
          }
        }
        if (
          data.originalFiles[0]["size"] &&
          data.originalFiles[0]["size"] > _self.options.maxFileSize
        ) {
          uploadErrors.push(ERROR_FILE_SIZE);
        }
        if (uploadErrors.length > 0) {
          _self.add(uploadErrors);
          return false;
        } else {
          return true;
        }
      })
      .on("fileuploaddone", function(e, data) {
        _self.done(e, data);
      });
  }
};
</script>