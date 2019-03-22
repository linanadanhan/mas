<template>
  <div class="dropzone" :class="[this.context.item ?  'dropzone-hover' : '', draghover ? 'draghover' : '']" @dragleave="dragleave($event)" @dragover="dragover($event)" @drop='drop($event)'></div>
</template>
<script>
	import _ from 'underscore'	
  export default {
    name: 'dropzone',
    props: ['page', 'params', 'widget','rows', 'index', 'context', 'model'],
    data () {
      return {
      		draghover: false
      }
    },
    methods: {
      drop: function(event) {
        if(!this.context.item || !this.context.item.type){ return}
          this.model[this.context.item.name] ? this.context.item.defaultFormValue = this.model[this.context.item.name] : this.context.item.defaultFormValue
          this.$set(this.model,this.context.item.name,this.context.item.defaultFormValue)
        let obj  = {
      		columns: [this.context.item]
        }
        this.rows.splice(this.index, 0, obj)  //添加行
        this.context.columnTab = 'set-' + this.context.item.type		//设置字段组件
        this.context.column = this.context.item   //给字段组件赋值
      	this.draghover = false
      	//计算列宽
      	let cols = this.rows[this.index].columns
      	let length = cols.length 
      	let divisor = parseInt(24/length) 
      	let residue = parseInt(24 % length)
      	_.map(cols, function(item){ 
      		return item.span = divisor
      	})
      	_.last(cols).span = residue == 0 ? 24 / length :  residue + divisor;
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
  height: 5px;
  background: #fff;
  border: 1px dashed #fff;
}
.dropzone-hover{
  border: 1px dashed #ccc;
  background:#eee;
}
.draghover{
  background-color: darkgrey;
}
</style>