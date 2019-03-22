<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="type"
          label="文件类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
      </el-table>
    </div>
  </decorator>
</template>

<script>
  export default {
    name: 'table-widget',
    props: ['page', 'params', 'widget', 'i', 'j'],
    data () {
      return {
        tableData:null
      }
    },
    methods: {
      initWidgetTable: function(data) {
        this.tableData=data.tableData
      }
    },
    created () {
      this.$api_widget_widgetTable({
        data: {
          path: this.$route.path
        },
        fn: data => this.initWidgetTable(data)
      })
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
</style>
