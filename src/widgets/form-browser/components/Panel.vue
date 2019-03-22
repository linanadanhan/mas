<template>
	<div class="wrap-card">
      <el-card v-if="config.card" :shadow="config.cardShadow" class="box-card">
        <div slot="header" v-if="config.showHead" class="clearfix">
          <span>{{model[config.name]}}</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
          <FormLayout :config="config" :model="model" :context="context"></FormLayout>
        </div>
      </el-card>
      <FormLayout v-else :config="config" :model="model" :context="context"></FormLayout>
  </div>
</template>

<script>
  export default {
		beforeCreate: function(){
      this.$options.components.FormLayout = require("../pages/BrowserLayout.vue").default;
    },
    props: ['config', 'model', 'context'],
    data () {
      return {
      }
    },
    created(){
    },
    methods: {
    }
  }
</script>

<style scoped>
.wrap-card{ margin-bottom:20px; }
</style>
