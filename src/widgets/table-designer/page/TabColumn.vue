<template>
  <div class="tab-wrap">
        <el-row class="column-tree-box">
          <el-tree class="column-tree"
          :data="config.rows" 
          :props="treeProps" 
          :expand-on-click-node="false"
          :default-expand-all="true"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-click="handleTreeNodeClick"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-dropdown trigger="click" size="small">
					      <span class="el-dropdown-link">
					        <i class='el-icon-more show'></i>
					      </span>
					      <el-dropdown-menu slot="dropdown">
					        <el-dropdown-item @click.native="handleAppendNode(data)">添加</el-dropdown-item>
                  <el-dropdown-item v-if=" '1' == node.level " @click.native="handleAddOprationNode(node, data)">操作</el-dropdown-item>
					        <el-dropdown-item @click.native="handleRemoveNode(node, data)">删除</el-dropdown-item>
					      </el-dropdown-menu>
					    </el-dropdown>
              </span>
            </span>
          </el-tree>
        </el-row>
  </div>
</template>

<script>
import { object } from 'utils'
export default {
  apis: [{
    name: 'load_config',
    path: 'table/getConfig',
    type: 'get'
  }],
  props: ['config','context'],
  data() {
    return {
      form: {},
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'label'
      },
      addId: 1000
    }
  },
  created() {
    // this.getColumnConfig()
  },
  methods: {
    handleAddOpration(){
      let opration = {
        name: '编辑'
      }
      this.form.type.push(opration)
    },
    handleDeleteOpration(index){
      this.form.type.splice(index,1)
    },
    handleAddOprationNode(){
    	let $tree = this.config.rows[0].children
    	let id = $tree.length>0?$tree[$tree.length - 1].id:this.addId
    	console.info(id)
      this.form = {}
      let opration =  {
        'id': ++id,
        'prop': 'name6'+id,
        'label': '操作',
        'width': '200',
        'fixed': false,
        'type': [
        	{
        		'default': true,
        		'isCheck': false,
        		'type': '1',
        		'name': 'modify' + id,
        		'text': '修改',
        		'formFlag': '',
        		'script': ''
        	},
        	{
        		'default': true,
        		'isCheck': false,
        		'type': '2',
        		'name': 'view'+id,
        		'text': '查看',
        		'formFlag': '',
        		'script': ''
        	},{
        		'default': true,
        		'isCheck': false,
        		'type': '0',
        		'name': 'del' + id,
        		'text': '删除',
        		'formFlag': '',
        		'script': ''
        	},
        	{
        		'default': true,
        		'isCheck': false,
        		'type': '3',
        		'name': 'download' + id,
        		'text': '下载',
        		'formFlag': '',
        		'script': ''
        	}
        ]
      }
      
      $tree.splice($tree.length,0,opration)
    },
    handleTreeNodeClick(obj,node,self){
      if( '1' == node.level ){ return; }
      this.context.columnName = 'editor-column'
      this.context.column = obj
      
      this.getCusOptions()
    },
    handleAppendNode(data,v,a){
      this.addId = ++this.addId
      const newChild = { 
      	id: this.addId,
      	prop: 'newname'+ this.addId , 
      	label: '标题'+ this.addId, 
      	children: [], 
      	tooltip: false, 
      	isNeedFormat:false, formatterFlag:'', 
      	isDateFormat:false, formatterDate:'', 
      	isCusFormat:false, cusFormat:{},
      	sortable: false,
      	isFixed: false
      };
        if (!data.children) {
          this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.context.column = newChild
    },
    handleRemoveNode(node, data){
      if( '1' == node.level ){
        data.children.splice(0,data.children.length)
      }
      else{
        const parent = node.parent
        const children = parent.data.children || parent.data
        console.log(parent,children,data.id)
        const index = children.findIndex(item => {
          return item.id == data.id
        })
        if( -1 == index){
          return
        }
        children.splice(index, 1);
        // console.log(this.config.rows)
      }
      this.context.column = {}
      document.querySelector('.browserTable').doLayout()
    },
    handleDragStart(node, ev) {
      // console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '标题5') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
    },
		getCusOptions(){
			let cusOptions = {}
			let fieldName = this.context.column.prop
			//if(fieldName in this.context.feildList){//存在加载先后顺序的问题，注释此处判断
				let len = this.config.addFormCfg.rows.length
				for(let i=0;i<len;i++){
					let row = this.config.addFormCfg.rows[i]
					for(let j=0;j<row.columns.length;j++){
						let col = row.columns[j]
						if(col.name == fieldName){
							if(col.options){
								//cusOptions = col.options
								
								cusOptions.dataSource = col.dataSource
								cusOptions.options = col.options
								if(col.dataSource==3){
									cusOptions.viewValue = col.viewValue
									cusOptions.viewLabel = col.viewLabel
								}
							}
							break
						}
					}
				}
				this.context.column.cusFormat = cusOptions
				this.$set(this.context,this.context.column.cusFormat,cusOptions)
			//}
		}
  }
}
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
>>>.el-input-number{
width: 100%;
} 
>>>.empty-label .el-form-item__content{ margin-left: 0 !important; }
>>>.el-form-item__label{ font-size: 12px; }
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
.btn-add-tree{ margin-top:8px;}
.item-opration .el-input{ width:85%; }
/* .column-tree-box{ height: 160px; } */
/* .column-tree{ height: 160px;overflow-y: auto;} */
.column-tree::-webkit-scrollbar {
 width: 5px;
}
.column-tree::-webkit-scrollbar-track {
 background-color:rgb(240,240,240);
 -webkit-border-radius: 2em;
 -moz-border-radius: 2em;
 border-radius:2em;
}
.column-tree::-webkit-scrollbar-thumb {
 background-color:rgb(200,200,200);
 -webkit-border-radius: 2em;
 -moz-border-radius: 2em;
 border-radius:2em;
}

  .show{display: none;}
  >>>.custom-tree-node:hover .show{display: block;}
  .el-icon-more{padding:2px 10px;box-sizing: border-box;}
  .edit-form{ margin-top:15px; }
</style>


