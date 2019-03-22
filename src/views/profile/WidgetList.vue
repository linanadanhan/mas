<template>
	<div>
      <div class="text item">
        <div class="mainLeft">
					<el-scrollbar style="height:100%">
						<el-tree :data="categoryTree"
							highlight-current 
							@node-click="handleNodeClick"
							ref="tree" 
							:expand-on-click-node=false
							:props="defaultProps">
							<span class="custom-tree-node" slot-scope="{ node, data }">
								<span>{{ node.label == '' ? '未分类' :  node.label}}</span>
							</span>
						</el-tree>
					</el-scrollbar>
        </div>
        <div class="mainRight">
					<div 	style="height:40px;">
						<el-input
							placeholder="请输入内容"
							style="width:300px;float:right;margin-right:10px"
							size="mini"
							prefix-icon="el-icon-search"
							@change="handleSearch"
							v-model="search">
						</el-input>
					</div>
					<div class="cardDiv">
						<el-scrollbar style="height:100%">
							<div class="widget-card" v-for="(item, index) in tmpWidgets" :key="item.id" :index="index" :draggable='true' @dragstart="dragstart($event)" @dragend="dragend($event)">
								<div class="card-cell">
									<div class="image">
										<img src="../../assets/noPhoto.png" alt="">
									</div>
									<div class="des">
										<div class="widget-card-title">{{item.title}}</div>
										<div class="widget-card-description">{{item.description}}</div>
									</div>
								</div>
							</div>
						</el-scrollbar>
					</div>
					
        </div>
      </div>
	</div>
</template>
<script>
	import { object } from 'utils'
	export default {
		name: 'widget-list',
		props: ['data', 'dialog'],
		data() {
			return {
				widgets: [],
				tmpWidgets: [],
				index: 0,
				categoryTree: [],
        defaultProps: {
          children: 'children',
          label: 'category'
				},
				search: '',
				dragWidget: {}
			}
		},
		computed: {
			createdWidgets() {
				return this.$store.getters.createdWidgets
			},
			diyMode() {
				return this.$store.getters.diyMode
			},
			rootPage() {
				return this.$store.getters.page
			}
		},
		methods: {
			dragstart: function(event) {
				let srcObj = event.srcElement ? event.srcElement : event.target
				let index = srcObj.getAttribute("index")
				let widgetTemp = this.tmpWidgets[index] 
				let widget = this.$_.pick(widgetTemp, 'id', 'name', 'compId')
				let params = object.deepcopy(widgetTemp.params)
				//新增加的面板需要实例化
				if(!widgetTemp.singleton) {
					widget.id = this.$_.now()
					if(widget.name === 'nested') {
						this.$_.extend(params, {
							nestedPage: {
								layout: '5-5',
								widgets: []
							}
						})
					} else if(widget.name === 'tab') {
						this.$_.extend(params, {
							tabs: []
						})
					}
				}
				this.$store.dispatch('update_drag_widget', {
					widget,
					params
				})
				this.dragWidget = object.deepcopy({ widget, params })
				this.dialog.close()
			},
			dragend: function(event) {
				let srcObj = event.srcElement ? event.srcElement : event.target
				let index = srcObj.getAttribute("index")
				let widget = this.$store.getters.dragWidget

				if(widget !== null) {
					this.$store.dispatch('update_drag_widget', null)
					this.dialog.close()
				} else if(index >= 0) {
					// 第一次拖动widget到页面时需保存对应widget配置信息
					this.$api_site_saveProfileConf({
						data: {
							pageUuId: this.rootPage.pageUuId,
							widgetUuId: this.dragWidget.widget.id,
							diyMode: this.diyMode,
							json: JSON.stringify(this.dragWidget.params)
						}
					})
					this.dialog.close()
				}
			},
			getCategoryWidgetTree() { // widget 分类树数据
			  let model = ''
			  if (this.diyMode) {
			    model = 'diy'
			  }
			  if (this.data.confMode) {
			    model = 'sys'
			  }
		    this.$api_site_getCategoryWidgetTree({
          data: {
            model: model
          }
        }).then(res => {
          if(res) {
            this.categoryTree = (typeof res == 'string') ? JSON.parse(res) : res
            // 初始查询第一个节点下的widget
            this.getWidgetListByCategory(this.categoryTree[0])
          }
        }).catch(err => {
          console.info(err)
        }).finally(() => {})
			},
			handleNodeClick(data) { // 节点点击事件--根据分类查询对应下的widget
				this.widgets = []
				this.tmpWidgets = []
        this.getWidgetListByCategory(data)        
			},
			getWidgetListByCategory(data) { // 根据分类查询对应widget数据
			  let model = ''
        if (this.diyMode) {
          model = 'diy'
        }
        if (this.data.confMode) {
          model = 'sys'
				}
				let category = this.getPathByKey(data.category, data.parent, 'category', this.categoryTree)
        this.$api_site_getWidgetListByCategory({
          data: {
            model: model,
            category: category
          }
        }).then(res => {
          if(res) {
            this.$_.each(res, item => {
              if (item.params) {
                item.params = JSON.parse(item.params)
              }
							this.widgets.push(item)
							this.tmpWidgets.push(item)
            })
          }
        }).catch(err => {
          console.info(err)
        }).finally(() => {})			  
			},
			getPathByKey(value, pValue, key, arr) { // 获取指定节点路径
        let temppath = [];
        try {
            function getNodePath(node){
                temppath.push(node.category)
                //找到符合条件的节点，通过throw终止掉递归
                if (node[key] === value && node.parent === pValue) {
                  throw ("GOT IT!")
                }
                if (node.children && node.children.length > 0) {
                    for (var i = 0; i < node.children.length; i++) {
                        getNodePath(node.children[i])
                    }
                  //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                  temppath.pop()
                }
                else {
                  //找到叶子节点时，删除路径当中的该叶子节点
                  temppath.pop()
                }
            }
            for (let i = 0; i < arr.length; i++) {
                getNodePath(arr[i])
            }
        } catch (e) {
            return temppath.join('/')
        }			  
			},
			handleSearch(val) {// 搜索条件
				let resList = this.searchFilter(val, this.widgets)
				this.tmpWidgets = []
				this.tmpWidgets = resList
			},   
			searchFilter(kw, list) {
				if (!Array.isArray(list) && kw !== '') 
					return
				let arr = []
				let keyword = kw.toLocaleLowerCase().trim() // 不区分大小写
				for (let i = 0; i < list.length; i++) {
					if ((list[i].title && list[i].title.indexOf(keyword) !== -1) || (list[i].description && list[i].description.indexOf(keyword)!== -1)) 
						arr.push(list[i])
				}
				return arr
			}
		},
		created() {
		  // 获取widget分类树数据
		  this.getCategoryWidgetTree()		
		}
	}
</script>

<style scoped>
	.el-dialog >>>.el-dialog__body{
		padding: 0px 20px;
    color: #606266;
    font-size: 14px;
	}
	.widget-card {
		border-bottom: 1px solid #f5f7fa;
		background-color: #fff;
		overflow: hidden;
		display: block;
		padding: 10px 20px;
		margin-right: 15px;
	}
	.widget-card:first-child{border-top: 1px solid #f5f7fa;}
	.widget-card:hover{background:#f5f7fa;cursor: pointer; }
	.widget-card-title {
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 5px;
		color:#555
	}
	.widget-card-description{
		color: #666;
		font-size: 13px;
		line-height: 24px;
		width: 100%;
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

	}
	.mainLeft{width: 170px;height: 440px;overflow:auto;background: #f6f7fb;float: left;padding: 10px 0 10px 10px;}
  .mainLeft .el-tree{background: #f6f7fb;}
  .mainRight{flex: 1;overflow-y: auto;padding:0 0 0 10px ;height: 440px;}
	>>>.el-scrollbar__wrap{overflow-x: hidden;}
	.mainRight .card-cell{position: relative;height: 50px;}
	.mainRight .image{width: 80px;height:50px;overflow: hidden;position: absolute;left:0px;top:0px;border:1px solid #f5f7fa;box-sizing: border-box}
	.mainRight .image img{width:80px;}
	.mainRight .des{width: 100%;padding-left:100px }
	.cardDiv{height: calc(100% - 40px)}
</style>