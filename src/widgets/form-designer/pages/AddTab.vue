<template>
  <el-collapse v-model="actives">
    <el-collapse-item v-for="(type, index) in components" :title="type.type" :name="index" :key="index">
      <cps-logo v-for="(item, index) in type.components" :item="item" :key="index"  :context="context" :rules="rules" :model="model">
      </cps-logo>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import CpsLogo from './CpsLogo.vue'
  export default {
    apis: [{
      name: 'load_components',
      path: 'form/components',
      type: 'get'
    }],
    props: ['page', 'params', 'widget','context','rules', 'model'],
    components: {
      'cps-logo': CpsLogo
    },
    data () {
      return {
        actives:[],
        components: []
      }
    },
    created () {
      this.$api_form_getFormComponent().then((data) => {
      	if (data && data.json) {
      		var comp = JSON.parse(data.json)
          this.components = comp
          this.actives = this.$_.map(comp, (item, index) => index)      		
      	}
      })
    }
  }
</script>

<style scoped>
.el-collapse{
  border-bottom: 0;
  border-top: 0; 
}
>>> .el-collapse-item__wrap{
  border-bottom: 0;
}
>>> .el-collapse-item__header{
  border-bottom: 0;
}
>>>.el-collapse-item__header:hover { color: #409EFF}
</style>
