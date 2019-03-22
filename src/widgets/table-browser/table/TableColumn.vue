<template>
  <div>
    <!-- <el-table-column v-for="(col,index) in config" :key="index" :prop="col.prop" :label="col.label"
     :width="col.width">
        <template slot-scope="scope">
          <span :style="{color:context.tabTable.style}">{{scope.row[col.prop]}}</span>
        </template>
        <table-column v-if="col.children" :config="col.children" :context="context"/>
    </el-table-column> -->

    <el-table-column v-for="(col,index) in config" :key="index" v-bind="col" type="">
        <template slot-scope="scope">
          <span v-if="!col.type">{{scope.row[col.prop]}}</span>
          <div v-else>
            <el-dropdown trigger="click" @command="(command) => handleCommand(command, scope.row)">
              <span class="el-dropdown-link" :size="config.table.size">···</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,o) in col.type" :command="item" :key="o">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
        <table-column v-if="col.children" :config="col.children" :context="context"/>
    </el-table-column>



  </div>
</template>

<script>
export default {
  name: 'tableColumn',
  props: ['config','context'],
  data() {
    return {
      temp: {}
    }
  },
  apis: [{
    name: 'load_config',
    path: 'table/getConfig',
    type: 'get'
  }],
  methods: {
    getAddConfig(){
      this.$api_load_config().then((data) => {
        this.temp = data.form
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>

</style>