<template>
  <div class="widget">
    <el-form label-width="80px" :model="form" class="set-form" v-if="data.params.tabs && data.params.tabs.length>0">
      <el-form-item label="tab名称">
          <template v-for="(tab,index) in form.tabs">
            <el-input v-model="tab.name" placeholder="请输入内容" :key="index"></el-input>
          </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'tab-widget-config',
    title: 'tab页签设置',
    props: ['data', 'form'],
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    },
    created () {
    	this.form.tabs = this.data.params.tabs
    }
  }
</script>

<style scoped>
.widget{
  min-height: 50px;
}
.set-form .el-input{ margin-bottom: 10px; }
</style>
