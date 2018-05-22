<template>
    <div ref="upload">
        <div v-if="singleFileUploads" style="padding-left:0px">
            <input :id="id" type="file" name="file" data-file-upload="singleFile">
            <div class="upload-container">
              <div class="left">
                <label :for="id" class="btn btn-default">{{title}}</label>
              </div>
              <div v-show="showInfo" class="file-info-container">
                <span class="file-size">{{fileSize}}</span>
                <span class="icon icon-cancel" @click="cancel"></span>
              </div>
              <div v-show="showInfo" class="file-info-container center">
                <div class="autowrap">{{fileName}}</div>
              </div>
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
import "blueimp-file-upload/js/jquery.iframe-transport";
export default {
  name: "TmVueUpload",
  props: {
    title: {
      type: String,
      default: "Select Files..."
    },
    maxFileSize: {
      type: String,
      default: "@"
    },
    acceptFileTypes: {
      type: String,
      default: null
    },
    dataType: {
      type: String,
      default: "json"
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {}
    },
    url: {
      type: String,
      default: ""
    },
    singleFileUploads: {
      type: Boolean,
      default: true
    },
    paramName: {
      type: String,
      default: "file"
    },
    sequentialUploads: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: ""
    },
    hide: {
      type: Boolean,
      default: true
    },
    fileuploadadd: {
      type: Function,
      default: () => {}
    },
    fileuploadstart: {
      type: Function,
      default: () => {}
    },
    fileuploaddone: {
      type: Function,
      default: () => {}
    },
    fileuploadfail: {
      type: Function,
      default: () => {}
    },
    fileuploadprocessfail: {
      type: Function,
      default: () => {}
    },
    reset: {
      type: Boolean,
      default: false
    },
    canceled: {
      type: Function,
      default: () => {}
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
      this.showInfo = false;
      this.fileName = "";
      this.fileSize = "";
      this.files = null;
      this.data = null;
    },
    upload() {
      this.data.submit();
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
      this.canceled();
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

    var options = {
      maxFileSize: this.maxFileSize,
      acceptFileTypes: this.acceptFileTypes,
      dataType: this.dataType,
      autoUpload: this.autoUpload,
      url: this.url,
      singleFileUploads: this.singleFileUploads,
      paramName: this.paramName,
      sequentialUploads: this.sequentialUploads
    };
    options.iframe = true;
    options.forceIframeTransport = true;

    $(`#${this.id}`)
      .fileupload(options)
      .on("fileuploadprocessfail", function(e, data) {
        data.files.forEach(file => {
          file.errorType = messagesMap[file.error];
        });
        _self.fileuploadprocessfail(e, data);
      })
      .on("fileuploadprocessdone", function(e, data) {
        if (_self.autoUpload) {
          data.submit();
        }
      })
      .on("fileuploadadd", function(e, data) {
        _self.files = data.files;
        _self.fileName = data.files[0].name;
        if (typeof data.files[0].size != "undefined") {
          _self.fileSize = "(" + _self.formatFileSize(data.files[0].size) + ")";
        } else {
          _self.fileSize = "";
        }
        _self.showInfo = true;
        _self.data = data;

        _self.fileuploadadd(e, data);
      })
      .on("fileuploadsubmit", function(e, data) {
        data.formData = _self.formData;
      })
      .on("fileuploadsend", function(e, data) {
        /* ... */
      })
      .on("fileuploaddone", function(e, data) {
        if (_self.hide) {
          _self.cancel();
        }
        _self.fileuploaddone(e, data);
      })
      .on("fileuploadfail", function(e, data) {
        _self.fileuploadfail(e, data);
      })
      .on("fileuploadalways", function(e, data) {
        /* ... */
      })
      .on("fileuploadprogress", function(e, data) {
        /* ... */
      })
      .on("fileuploadprogressall", function(e, data) {
        /* ... */
      })
      .on("fileuploadstart", function(e) {
        _self.fileuploadstart(e);
      })
      .on("fileuploadstop", function(e) {
        /* ... */
      })
      .on("fileuploadchange", function(e, data) {
        /* ... */
      })
      .on("fileuploadpaste", function(e, data) {
        /* ... */
      })
      .on("fileuploaddrop", function(e, data) {
        /* ... */
      })
      .on("fileuploaddragover", function(e) {
        /* ... */
      })
      .on("fileuploadchunksend", function(e, data) {
        /* ... */
      })
      .on("fileuploadchunkdone", function(e, data) {
        /* ... */
      })
      .on("fileuploadchunkfail", function(e, data) {
        /* ... */
      })
      .on("fileuploadchunkalways", function(e, data) {
        /* ... */
      });
  }
};
</script>