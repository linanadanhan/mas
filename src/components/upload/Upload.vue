<template>
  <component
    :is="uploadComponent"
    :options="uploadOptions"
    :file-status-text="statusText"
    @file-complete="fileComplete"
    @complete="complete"
    class="uploader-example"
  ></component>
</template>
<script>

export default {
  name: 'VueUploader',
  props: {
    uploadOptions: {
      type: Object,
      default: function () {
        return {
          target: "/api/zuul/cos3-file-manager/file/chunk",
          testChunks: false,
          simultaneousUploads: 1,
          chunkSize: 10 * 1024 * 1024,
          allowDuplicateUploads: true,
          processParams: function (params) {
            console.info(params)
            return params;
          },
          checkChunkUploadedByResponse: function (chunk, message) {
            let objMessage = {};
            try {
              objMessage = JSON.parse(message);
            } catch (e) { }
            return (
              (objMessage.uploaded_chunks || []).indexOf(chunk.offset + 1) >= 0
            );
          }
        }
      }
    },
    statusText: {
      type: Object,
      default: function () {
        return {
          success: "成功了",
          error: "出错了",
          uploading: "上传中",
          paused: "暂停中",
          waiting: "等待中"
        }
      }
    }
  },
  data () {
    return {
      uploadComponent: '',
    }
  },
  components: {
    uploader: require('vue-simple-uploader').Uploader
  },
  beforeCreate () {

  },
  created () {
    this.uploadComponent = 'uploader'
  },
  beforeDestroy () {
  },
  methods: {
    // 上传完成
    complete() {
      console.log("complete", arguments);
    },
    // 一个根文件（文件夹）成功上传完成。
    fileComplete() {
      console.log("file complete", arguments);
    }
  }
}
</script>


<style scoped>
.uploader-example {
  padding: 15px;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(62, 146, 203, 0.4);
}
.uploader-example >>> .uploader-drop {
  text-align: center;
}
.uploader-example >>> .uploader-drop p {
  margin-top: 12px;
  margin-bottom: 12px;
}
.uploader-example >>> .uploader-btn {
  margin-right: 4px;
}

.uploader-example >>> .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

