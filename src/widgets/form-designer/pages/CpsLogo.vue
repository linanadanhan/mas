<template>
  <div draggable="true"  @dragstart="dragstart($event)" @dragend="dragend($event)"> 
    <i :class="item.iconCls"></i>{{item.label}}
  </div>
</template>

<script>
	import { object } from 'utils'
  export default {
    props: ['page', 'params', 'widget','item', 'context','rules', 'model'],
    data () {
      return {
      	num: 0
      }
    },
    methods:{
      dragstart: function(event) {
        event.dataTransfer.setData("abc","数据")
      	let obj = object.deepcopy(this.item)
      	let index = this.getNewObjName(obj.name, this.model)
        obj.name = (obj.name + index).toUpperCase()
        obj.index = index
        this.context.item = obj
    		this.rules[obj.name]=this.context.item.rule
      },
      dragend: function(event) {
				this.context.item = null
      },
      getNewObjName(componentType, model) {
      	var i = 0
      	if (model) {
      		for (var m in model) {
      			if (m.indexOf(componentType.toUpperCase()) === 0) {
      				 var index = m.substr(componentType.length)
      				 if (i <= index) {
      				 	 i = index
      				 }
      			}
      		}
      		return ++i
      	}
      }
    },
    created () {
    	if (this.item.type === 'select') {
				this.$api_form_getDicOptions().then((data) => {
	      	if (data) {
	      		this.item.dicOptions = data
	      	}
	      })    		
    	}
    }
  }
</script>

<style scoped>
div{
  margin: 5px;
  padding: 5px 10px;
  width:45%;
  border: 1px solid rgb(228, 231, 237);
  background-color: rgb(250, 250, 250);
  float: left;
  cursor: move;
}
</style>
