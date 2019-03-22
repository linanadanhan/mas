<template>
  <span class="dropzone" :class="[this.context.item ?  'dropzone-hover' : '', draghover ? 'draghover' : '']" @dragleave="dragleave($event)" @dragover="dragover($event)" @drop='drop($event)'></span>
</template>
<script>
	import _ from 'underscore'
  export default {
    name: 'dropzone',
    props: ['page', 'params', 'widget','cols', 'index', 'context', 'model'],
    data () {
      return {
      		draghover: false,
      }
    },
    methods: {
      drop: function(event) {
        if(!this.context.item){ return}
      	if(!this.context.item.noFormItem){
          this.model[this.context.item.name] ? this.context.item.defaultFormValue = this.model[this.context.item.name] : this.context.item.defaultFormValue
      		this.$set(this.model,this.context.item.name,this.context.item.defaultFormValue)		//这是表单model
      	}
      	this.cols.splice(this.index, 0, this.context.item)		//添加列
      	this.draghover = false
      	//计算列宽
      	let length = this.cols.length 
      	let divisor = parseInt(24/length) 
      	let residue = parseInt(24 % length)
      	_.map(this.cols, function(item){ 
      		return item.span = divisor
      	})
      	_.last(this.cols).span = residue == 0 ? 24 / length :  residue + divisor;
      	this.context.item = null
      },
      dragover: function(event) {
        event.preventDefault();
        this.draghover = true
      },
      dragleave: function(event) {
        this.draghover = false
      }
    }
  }
</script>

<style scoped>
.dropzone {
  width: 5px;
  background: #fff;
  border: 1px dashed #fff;  
}
.dropzone-hover {
  border: 1px dashed #ccc;
  background: #eee;
}
.draghover {
  background-color: darkgrey;
}
</style>