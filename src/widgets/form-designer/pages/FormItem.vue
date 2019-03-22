<template>
	<div class="formItem" :draggable="draggable" @dragstart="dragstart($event)" @dragend="dragend($event)" @click.stop="handleClickTag(rindex,cindex)" @mouseenter="showDeleteIcon" @mouseleave="hiddenDeleteIcon" :class="{isCurrent:context.rowIndex==rindex&&context.colIndex==cindex}" >
		
		<div class="item" v-if=" config.noFormItem " >
			<slot></slot>
		</div>
		<div v-else @mousedown="() => { draggable = false }" @mouseup="() => { draggable = true }">
		<el-form-item :label="config.label" :prop="config.name" :label-width="config.label?'':'5px'">
			<span v-if="config.rule" slot="label" :style="{background: config.background ? config.background : 'none'}">{{config.label}}</span>
			<div v-else slot="label" :style="{background: config.background ? config.background : 'none',color:config.color}">{{config.label}}</div>
			<slot></slot>
		</el-form-item>
		</div>
		<i class="deleteItem el-icon-delete" v-show="deleteIcon" @click.stop="handleDeleteItem()"></i>
	</div>
</template>

<script>
	import _ from 'underscore'		
	import $ from 'jquery'
	export default {
		props: [ 'page', 'params', 'widget','config','model','context','rules', 'rindex' , 'cindex' , 'rows'],
		data () {
			return {
				draggable: true,
				flag: false,
				deleteIcon:false,
				tempModelName: ''
			}
		},
		mounted () {
			
		},
		methods:{
			handleDeleteItem(){
				this.deleteItem()			//删除当前元素
				if (this.model && this.model[this.context.item.name]) {
					delete this.model[this.context.item.name]		//删除model
				}
				if (this.rules && this.rules[this.context.item.name]) {
					delete this.rules[this.context.item.name]   //删除model
				}
				this.context.item = null
			},
		    showDeleteIcon(){
		        this.deleteIcon=true
		    },
		    hiddenDeleteIcon(){
                this.deleteIcon=false
     		},
			handleClickTag(rindex,cindex){
				this.context.activeTab = 'column'			//设置字段tab高亮
				this.context.columnTab = 'set-' + this.config.type		//设置字段组件
				this.context.column = this.config		//字段组件model
				this.context.attrName = this.config.name	//属性名
				this.context.attrFlag = true	//判断属性
			},
			computeCols(arr,length){
				let divisor = parseInt(24/length) 
		      	let residue = parseInt(24 % length)
		      	_.map(arr, function(item){ 
		      		return item.span = divisor
		      	})
		      	_.last(arr).span = residue == 0 ? 24 / length :  residue + divisor;
			},
			deleteItem (){
					this.context.item = this.config
					this.tempModelName = this.model[this.context.item.name]			//保存model值以便还原
					// delete this.model[this.context.item.name]		//删除model
					let cols = this.rows[this.rindex].columns
					if(cols.length>1){
						this.rows[this.rindex].columns.splice(this.cindex,1)		//删除列
						let length = cols.length
						this.computeCols(cols,length)		//计算列
		      			this.flag = false
					}else{
						this.rows.splice(this.rindex,1)	//删除行
						this.flag = true
					}
					if(this.rows.length != 0 ){
						this.context.column = this.rows[0].columns[0]		//删除后默认设置第一个字段组件model
					}else{
						this.context.column = null
						this.context.columnTab = null
					}
			},
		    dragstart: function(event) {
					event.dataTransfer.setData("abc","数据")
					this.deleteItem()			//删除当前元素
		    },
		    dragend: function(event) {
		      	if(this.rows.length == 0 ){
		      		this.context.column = null
				}
				if(!this.context.item){ return }	//放入正确位置退出
				//没有放入正确位置
				if(this.flag){
					this.rows.splice(this.rindex, 0,{ columns: [ this.context.item ]})	//还原行
					this.context.rowIndex = this.rindex
					this.$forceUpdate();
				}else{
					this.rows[this.rindex].columns.splice(this.cindex, 0, this.context.item)	//还原列
					let cols = this.rows[this.rindex].columns
					let length = cols.length
					this.computeCols(cols,length)
				}
				// this.$set(this.model,this.context.item.name,this.tempModelName)			//还原model
		      	this.context.column = this.context.item
				this.context.columnTab = 'set-' + this.context.item.type
				this.context.item = null
		    }
   	    }
	}
</script>

<style scoped>
.formItem{padding-right: 40px;box-sizing: border-box;position: relative;}
.item, >>>.el-form-item__label  {
  cursor: pointer;
}
.formItem:hover {
  background-color: #eeeeee;
}
.el-form-item{
  margin: 0px;
  padding:5px;
  margin-bottom: 15px;
}
.deleteItem{position: absolute;right: 6px;top:10px;font-size: 14px;padding: 10px;box-sizing: border-box;cursor: pointer;}
.isCurrent{ background-color: #eee;}

</style>
