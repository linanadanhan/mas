<template>
<div>
		<form-item :config="config" :model="model" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows">
      <el-card v-if="config.card" :shadow="config.cardShadow" class="box-card">
        <div slot="header" v-if="config.showHead" class="clearfix">
          <span>{{model[config.name]}}</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
          <FormLayout :config="config" :model="model" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows"></FormLayout>
        </div>
      </el-card>
      <FormLayout v-else :config="config" :model="model" :context="context" :rindex="rindex" :cindex="cindex" :rows="rows"></FormLayout>
    </form-item>
</div>
</template>

<script>
  import FormItem from '../pages/FormItem.vue'
  export default {
		components: { 
			'form-item': FormItem
		},
		beforeCreate: function(){
      this.$options.components.FormLayout = require("../pages/Layout.vue").default;
   },
    props: ['page', 'params', 'widget','config', 'model', 'context', 'rindex', 'cindex', 'rows'],
    data () {
      return {
      }
    },
    created(){
    },
    methods: {
    	dragstart(event){},
    	dragend(event){},
    	handleClickTag(){}
    }
  }
</script>

<style scoped>
>>>.el-card__header{
  padding: 8px 15px;
}
</style>
