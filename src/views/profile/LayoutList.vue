<template>
  <div>
    <div class="layout-card" v-for="(item, i) in layouts" :key="item.id" @click="change(i)">
      <div class="layout-card-title">{{item.title}}<span class="layout-card-checked" v-if="index === i"><i class="el-icon-check"></i></span></div>
      <div class="layout-card-show"><component class="layout" v-bind:is="item.comp" :page="item.page"></component></div>
    </div>
  </div>
</template>
<script>
  import Layouts from 'layouts'

  export default {
    name: 'layout-list',
    props: ['data','isNested'],
    data () {
      return {
        layouts: [],
        index: 0
      }
    },
    computed: {
      diyMode () {
        return this.$store.getters.diyMode
      }
    },
    methods: {
      initLayoutList: function (data) {
        this.$_.each(data, (layout, index) => {
          if(this.data.page.layout === layout.name){
            this.index = index
          }
          if(/\//.test(layout.name)) {
            layout.comp = this.$require(layout.name, 'layout')
          } else {
            layout.comp = Layouts[layout.name]
          }
          layout.page = {
            ports: []
          }
          this.layouts.push(layout)
        })
      },
      change: function (index) {
        let portNum = this.layouts[index].page.ports.length
        let layout = this.layouts[index].name
        this.index = index
        this.$store.dispatch('update_layout', {
          page: this.data.page,
          layout,
          portNum
        })
        if(layout != null && this.data.isNested != 1){
          console.log('page layout saved', this.diyMode)
          // 页面切换布局器sn
          this.$api_site_changeLayout({
             data: {
	             pageUuId: this.data.page.pageUuId,
	             layoutCode: layout,
               isDefault: !this.diyMode
             }
          })
        }
      }
    },
    created () {
      this.$api_site_layoutList({
        data: {

        },
        fn: (data) => this.initLayoutList(data)
      })
    }
  }
</script>

<style scoped>
  .layout-card {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .12),
                0px 0px 6px 0px rgba(0, 0, 0, .04);
    width: 180px;
    display: inline-block;
    position: relative;
    margin: 5px 10px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .layout-card-checked {
    font-size: 40px;
    color: #409EFF;
    position: absolute;
    right: 5px;
    z-index: 999;
  }

  .layout-card-title {
    font-size: 14px;
    font-weight: bold;
  }
</style>