<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div v-if="editMode && params.changeLayout">
      <component v-bind:is="layoutList" :data="{page: params.nestedPage,isNested:1}" @change="change"></component>
      <div class="nested-tool-bar">
        <el-button type="primary" @click="close">确定</el-button>
      </div>
    </div>
    <template slot="buttons" v-if="editMode" class="widget">
      <i class="el-icon-news" @click="changeLayout" title="切换布局"></i>
    </template>
    <layout class="widget" :page="this.params.nestedPage"></layout>
  </decorator>
</template>

<script>
  import _ from 'underscore'
  export default {
    name: 'nested-widget',
    props: ['page', 'params', 'widget', 'i', 'j'],
    data () {
      return {
        layoutList: () => import('views/profile/LayoutList'),
        layout: {
          page: this.params.nestedPage,
          layout: '5-5',
          portNum: 2
        },
        isChangeLayout: false
      }
    },
    created() {
      // 业务组件参数传递
      if (this.page.loadBizParams) {
        this.params.nestedPage.loadBizParams = this.page.loadBizParams
        this.params.nestedPage.dialog = this.page.dialog
      }
      // console.log(this.page, this.rootPage)
    },
    methods: {
      change: function(layout) {
        this.layout = layout
      },
      close: function () {
        this.params.changeLayout = false
//      this.$store.dispatch('update_layout', this.layout)
        this.addWidget()
      },
      changeLayout: function() {
        this.isChangeLayout = true
        this.$dialog({
          title: '切换布局',
          width: '640px',
          body: () => import('views/profile/LayoutList'),
          onclosed (options, dialog, body) {  // 当弹出窗口被关闭后调用
            this.isChangeLayout = false
          },
          data: {
            page: this.params.nestedPage,
            isNested:1
          }
        })
      },
      addWidget: function() {
        this.$dialog({
          title: '新增部件',
          width: '800px',
          top: '5%',
          body: () => import('views/profile/WidgetList'),
          data: {
            page: this.page
          },
          buttons: [{
            text: '确定',
            type: 'primary',
            handle: function (dialog) {
              dialog.visible = false
            }
          }]
        })
      }
    },
    computed: {
      rootPage () {
        return this.$store.getters.page
      },
      editMode () {
        return this.$store.getters.editMode
      },
      createdWidgets() {
        return this.$store.getters.createdWidgets
      },
      delWidgets() {
        return this.$store.getters.delWidgets
      },
      diyMode () {
        return this.$store.getters.diyMode
      }
    },
    watch: {
      'params.nestedPage': {
        handler: function(newVal, oldVal) {
          this.$nextTick(function() {
            if (this.editMode && newVal) {
              let allParams = this.rootPage.widgetParams[this.widget.id]
              if (allParams && !this.isChangeLayout) { //复制其他属性
                for (var key in allParams) {
                  if (key !== 'nestedPage') {
                    newVal[key] = allParams[key]
                  }
                }
              }
              this.$api_site_saveProfileConf({
                data: {
                  pageUuId: this.rootPage.pageUuId,
                  widgetUuId: this.widget.id,
                  diyMode: this.diyMode,
                  json: JSON.stringify(newVal),
                  delWidgetIds: _.keys(this.delWidgets).join(',')
                }
              })
            }
          })
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
.nested-tool-bar {
  text-align: right;
  padding: 10px;
}
</style>
