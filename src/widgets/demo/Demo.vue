<template>
  <decorator
    :i="i"
    :j="j"
    :widget="widget"
    :page="page"
  >

    <vue-codemirror
      v-model="codeText"
      :codeOptions="codeOptions"
    />
    <vue-uploader
      :options="options"
      :file-status-text="statusText"
      class="uploader-example"
      ref="uploader"
      @file-complete="fileComplete"
      @complete="complete"
    ></vue-uploader>

    <i
      slot="icon"
      class="iconfont icon-shezhi1"
    ></i>
    <template slot="title">
      oooooooo
    </template>
    <template
      slot="buttons"
      class="widget"
    >
      <i
        class="iconfont icon-shezhi1"
        @click="test"
        title="菜单演示"
      ></i>
    </template>
    <div class="widget">
      <el-row :gutter="15">
        <el-col
          :span="8"
          v-for="(o, index) in 3"
          :key="index"
        >
          <el-card :body-style="{ padding: '0', position: 'relative' }">
            <div class="msc-textColor-hover">
              <img
                class="flow-image"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530704449932&di=a41554518d1d0d3577bed2d94ede2304&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016f9958a08c1aa8012060c8bda176.png"
              >
              <div class="flow-text msc-textColor-hover">
                <span>请假审批</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p style="font-size: 20px;">{{msg}}</p>
      <widget
        :widget="nestWidget"
        :params="params1"
        :page="page"
      ></widget>
    </div>
    <div slot="footer">
      Demo Widget--footer
    </div>
  </decorator>
</template>

<script>
import "codemirror/theme/shadowfox.css"

export default {
  name: 'demo-widget',
  props: ['page', 'params', 'widget', 'i', 'j'],
  data () {
    return {
      options: {
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
          // fake response
          // objMessage.uploaded_chunks = [2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 17, 20, 21]
          // check the chunk is uploaded
          return (
            (objMessage.uploaded_chunks || []).indexOf(chunk.offset + 1) >= 0
          );
        }
      },
      attrs: {
        accept: "image/*"
      },
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      },
      codeText: 'The default language is JavaScript!',
      codeOptions: {
        tabSize: 12,
        mode: "text/javascript",
        theme: "shadowfox",
        lineNumbers: true,
        line: true
      },
      msg: '',
      nestWidget: 'form-browser',
      params1: {
        decorator: 'default',
        formFlag: 'fm1529572456697',// TableDocRep fm_custom_entrance
        formType: '0',
        openMax: true,
        qryParams: {}
      }
    }
  },
  methods: {
    // 上传完成
    complete () {
      console.log("complete", arguments);
    },
    // 一个根文件（文件夹）成功上传完成。
    fileComplete () {
      console.log("file complete", arguments);
      alert(arguments[0].uniqueIdentifier);

    },
    test () {

    }
  },
  computed: {
    rootPage () {
      return this.$store.getters.page
    }
  },
  created () {
    // this.$store.dispatch('update_widget_params', {rootPage: this.rootPage, widgetId: this.nestWidget.id, params: this.params1})
    // 调用事件接收
    this.$root.eventHub.$on('testSn', (target) => {
      this.msg = target
      console.info('demo widget 接收消息：' + target)
    });
  }
}
</script>

<style scoped>
.widget {
  min-height: 50px;
}
.flow-image {
  width: 100%;
  height: 200px;
  opacity: 0.7;
  transition: all 0.3s linear;
}
.flow-text {
  padding: 15px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  transition: all 0.3s linear;
}
.el-card {
  margin-bottom: 30px;
  box-shadow: 0 0 0 #fff;
  color: #ddd;
}
.el-card:hover .flow-image {
  opacity: 1;
  transform: scale(1.1);
  filter: alpha(opacity=100);
  cursor: pointer;
}
.el-card:hover .flow-text {
  cursor: pointer;
}
</style>
