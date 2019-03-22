<template>
  <el-card class="diy-bar" :class="'diy-bar-' + position">
    <el-button v-if="position === 'right'" type="text" icon="el-icon-arrow-left" @click="changePosition"></el-button>
    <span v-if="diyMode && !editMode">
      <el-button size="small" icon="el-icon-close" @click="cancleReset">取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-check" @click="resetPage">保存</el-button>
    </span>
    <span v-else>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addWidget">新增部件</el-button>
      <el-button size="small" v-if="!confMode" icon="el-icon-news" @click="changeLayout">切换布局</el-button>
      <el-button size="small" v-if="diyMode && !confMode" icon="el-icon-d-arrow-left" @click="changePage">重置页面</el-button>
      <el-button size="small" v-if="!diyMode && !confMode" icon="el-icon-date" @click="changeTheme">切换主题</el-button>
      <el-button size="small" icon="el-icon-close" @click="cancleEditMode">{{!diyMode ? '退出编辑': '退出个性化'}}</el-button>
    </span>
    <el-button v-if="position === 'left'" type="text" icon="el-icon-arrow-right" @click="changePosition"></el-button>
  </el-card>
</template>
<script>
	import _ from 'underscore'
  export default {
    name: 'diybar',
    props: ['page', 'editMode', 'diyMode', 'confMode'],
    data () {
      return {
        position: 'right',
        pageWidgets: ''
      }
    },
    computed: {
			createdWidgets() {
				return this.$store.getters.createdWidgets
			}
		},
    methods: {
      changePosition: function() {
        this.position = this.position === 'right' ? 'left' : 'right'
      },
      changeTheme: function() {
        this.$dialog({
          title: '切换主题',
          width: '640px',
          'close-on-click-modal' : true,
          body: () => import('views/profile/ThemeList'),
          data: {
          }
        })
      },
      changeLayout: function() {
        this.$dialog({
          title: '切换布局',
          width: '640px',
          'close-on-click-modal' : true,
          body: () => import('views/profile/LayoutList'),
          data: {
            page: this.page
          }
        })
      },
      addWidget: function() {
        this.$dialog({
          title: '新增部件',
          width: '800px',
          'close-on-click-modal' : true,
          body: () => import('views/profile/WidgetList'),
          data: {
            page: this.page,
            confMode: this.confMode
          }
        })
      },
      cancleEditMode: function() {
      	this.pageWidgets = ''
        if (!this.diyMode && !this.confMode) {
          // 编辑结束，切换成个性化页面
          this.$api_site_pageInfo({
            data: {
              path: this.page.path,
              isDefault: false
            },
            fn: (data) => {
              data.path = this.page.path
              this.$store.dispatch('update_page', data)
            }
          })
        }
        // 退出编辑或个性化{diy: false, edit: false}
        this.$store.dispatch('update_page_edit_mode', false)
        this.$store.dispatch('update_page_diy_mode', false)
        this.$store.dispatch('update_page_conf_mode', false)
      },
      changePage: function() {
        // 显示系统页面{diy: true, edit: false}
        this.$store.dispatch('update_page_edit_mode', false)
        this.$store.dispatch('update_page_diy_mode', true)
        this.pageWidgets = _.keys(this.createdWidgets).join(',')
        // 切换到系统页面
        this.$api_site_pageInfo({
          data: {
            path: this.page.path,
            isDefault: true
          },
          fn: (data) => {
            data.path = this.page.path
            this.$store.dispatch('update_page', data)
          }
        })
      },
      resetPage: function() {
        // 重置页面，退出个性化页面{diy:false, edit:false} sn
        this.$api_site_resetPage({
          data: {
            pageUuId: this.page.pageUuId,
            siteCode: this.page.site,
            pageWidgets: this.pageWidgets
          },
          fn: () => this.cancleEditMode()
        })
      },
      cancleReset: function() {
      	this.pageWidgets = ''
        // 取消重置，进入个性化页面{diy:true, edit:true}
        this.$api_site_pageInfo({
          data: {
            path: this.page.path
          },
          fn: (data) => {
            	data.path = this.page.path
            	this.$store.dispatch('update_page', data).then(() => {
              this.$store.dispatch('update_page_edit_mode', true)
              this.$store.dispatch('update_page_diy_mode', true)
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .diy-bar {
    position: fixed;
    z-index: 1000;
    margin: -4px 5px;
  }

  .diy-bar-left {
    left: 0px;
  }

  .diy-bar-right {
    right: 0px;
  }

  .diy-bar >>> .el-card__body {
    padding: 5px;
  }
</style>