<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础设置" name="1">
        <el-form ref="form" :model="config" label-width="80px" size="mini">
          <el-form-item label="数据源">
            <el-radio-group v-model="config.dataSourceType" @change="handleDataSourceTypeChange" size="mini">
              <el-radio-button label="table">数据表</el-radio-button>
              <el-radio-button label="view">动态视图</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="config.dataSource" placeholder="请选择" @change="updataTree">
              <el-option v-for="item in dataSourceOptions" :key="item.C_ID" :label="item.C_TEXT" :value="item.C_NAME">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="config" label-width="180px" size="mini">
          <el-form-item label="显示节点复选框">
            <el-checkbox v-model="config.showCheckbox" @change="updataTree"></el-checkbox>
          </el-form-item>
          <el-form-item label="显示节点高亮">
            <el-checkbox v-model="config.highlightCurrent"></el-checkbox>
          </el-form-item>
          <el-form-item label="启用节点拖拽">
            <el-checkbox v-model="config.draggable"></el-checkbox>
          </el-form-item>
          <el-form-item label="手风琴模式">
            <el-checkbox v-model="config.accordion"></el-checkbox>
          </el-form-item>
          <el-form-item label="启用添加操作按钮">
            <el-checkbox v-model="config.showHandleBtn"></el-checkbox>
          </el-form-item>
          <el-form-item label="启用节点过滤">
            <el-checkbox v-model="config.isFilterText"></el-checkbox>
          </el-form-item>
          <el-form-item label="默认展开所有节点">
            <el-checkbox v-model="config.defaultExpandAll"></el-checkbox>
          </el-form-item>
          <el-form-item label="点击节点展开/收缩节点">
            <el-checkbox v-model="config.expandOnClickNode"></el-checkbox>
          </el-form-item>
          <el-form-item label="异步加载数据">
            <el-checkbox v-model="config.lazy"></el-checkbox>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="高级设置" name="2">
        <el-form ref="highForm" label-width="90px" size="mini">
          <el-form-item prop="text" label="关联表">
            <el-select placeholder="请选择" v-model="config.relationTab" @change="getFieldList" :clearable="true">
              <el-option v-for="item in tabOptions" :key="item.C_ID" :label="item.C_TEXT" :value="item.C_NAME">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="text" label="查询属性">
            <el-select placeholder="请选择" v-model="config.relationCol" :clearable="true">
              <el-option v-for="(item,index) in feildList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="text" label="展示属性">
            <el-select placeholder="请选择" v-model="config.showCol" :clearable="true">
              <el-option v-for="(item,index) in feildList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="父节点ID">
            <el-checkbox v-model="config.cusParent" @change="updateParent"></el-checkbox>
            <el-input v-if="config.cusParent" v-model="config.cusParentId" size="mini" placeholder="请输入父节点id" style="width:100px;"></el-input>
            <!--<el-input-number v-if="config.cusParent" v-model="config.cusParentId" controls-position="right" :min="0" size="small" @change="setParent"></el-input-number>-->
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="节点设置" name="3">
        <el-form ref="addNodeForm" :model="nodeData.nodeInfo" :rules="addRules" label-width="90px" size="mini">
          <el-form-item label="新增">
            <el-button plain type="primary" :disabled="config.dataSource == '' || config.dataSourceType == 'view'"
                       class="addNode" icon="el-icon-plus" size="mini" @click="addRootNode">新增根节点
            </el-button>
          </el-form-item>
          <el-form-item prop="text" label="节点名">
            <el-input :disabled="config.dataSource == '' || config.dataSourceType == 'view'" @blur="handleNodeNameBlur"
                      v-model="nodeData.nodeInfo.text"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    props: ['config', 'nodeData', 'data'],
    data() {
      return {
        activeNames: ['1', '2', '3'],
        formSource: {
          dataSource: ''

        },
        dataSourceOptions: [],
        feildList: [],
        addRules: {
          text: [{
            required: true,
            message: '必填 ',
            trigger: 'change'
          }]
        },
        tabOptions: [],
      };
    },
    computed: {
      userInfo() {
        return this.$store.getters.userinfo
      }
    },
    methods: {
      handleChange(val) {
      },
      updataTree() {
        this.$emit('updataTree')
      },
      handleNodeNameBlur() {
        this.$refs.addNodeForm.validate((valid) => {
          if (this.nodeData.nodeInfo.id) {
            let params = {
              data: {
                tableName: this.config.dataSource,
                personName: this.userInfo.username,
                C_ID: this.nodeData.nodeInfo.id,
                C_TEXT: this.nodeData.nodeInfo.text
              }
            }
            this.$api_form_saveFormData(params).then(res => {
            }).catch(err => {
              this.$message({
                'message': '修改失败！',
                'type': 'error'
              });
            }).finally(() => {
            	this.nodeData.nodeInfo = {}
              //this.nodeData.nodeInfo.text = ""
              this.$refs.addNodeForm.resetFields()
              //更新树
              this.$emit('updataTree')
            })
          }
        })
      },
      addRootNode() {
        this.$refs.addNodeForm.validate((valid) => {
          if (valid) {
            let id = (this.data && this.data.length > 0) ? this.data[0].parentId : this.getParentId()
            let text = '根节点'
            // 保存根节点信息
            let params = {
              data: {
                tableName: this.config.dataSource,
                C_PARENT_ID: id,
                C_CASCADE: '/',
                personName: this.userInfo.username,
                C_TEXT: this.nodeData.nodeInfo.text
              }
            }
            this.$api_form_saveFormData(params).then(res => {
            }).catch(err => {
              this.$message({
                'message': '新增失败！',
                'type': 'error'
              });
            }).finally(() => {
            	this.nodeData.nodeInfo = {}
              this.$refs.addNodeForm.resetFields()
              //更新树
              this.$emit('updataTree')
            })
          }
        })
      },
      handleDataSourceTypeChange(val) {
        this.config.dataSource = ''
        this.updataTree()
        let qryTableName = (val === 'view' ? 'TBL_VIEWS' : 'TBL_TABLES')
        let options = {
          data: {
            tableName: qryTableName
          }
        }
        this.$api_form_getTableDataInfo(options).then((data) => {
          if (data) {
            this.dataSourceOptions = data
          } else {
            this.dataSourceOptions = []
          }
        })
      }
      ,
      getFieldList(val) {
        if (val && val != null) {
          let options = {
            data: {
              tableName: val
            }
          }
          this.$api_form_getTableFeild(options).then((data) => {
            if (data) {
              this.feildList = data
            } else {
              this.feildList = []
            }
          })
        }
      },
      getTables(val) {
        let options = {
          data: {
            tableName: 'TBL_TABLES'
          }
        }
        this.$api_form_getTableDataInfo(options).then((data) => {
          if (data) {
            this.tabOptions = data
          } else {
            this.tabOptions = []
          }
        })
      },
      updateParent(){
      	if(!this.config.cusParent){
      		this.config.cusParentId = '0'
      	}
      },
      getParentId(){
	    		let parentId = 0
	    		if(this.config.cusParent){
	    			if(this.config.cusParentId && this.config.cusParentId!='' && typeof(this.config.cusParentId) != 'undefined'){
	    				parentId = this.config.cusParentId
	    			}
	    		}
	    		return parentId
	    	}
    },
    created() {
      let options = {
        data: {
          columnNames: ''
        }
      }
      this.$api_form_getDataTables(options).then((data) => {
        if (data) {
          this.dataSourceOptions = data
        }
      })
      this.getTables()
      this.getFieldList(this.config.relationTab)
    }
  }
</script>

<style scoped="scoped">
  .el-collapse {
    border-bottom: 0;
    border-top: 0;
  }

  >>> .el-collapse-item__wrap {
    border-bottom: 0;
  }

  >>> .el-collapse-item__header {
    border-bottom: 0;
  }

  >>> .el-collapse-item__header {
    color: #409EFF
  }

  >>> .el-collapse-item__content {
    margin-bottom: 0;
  }

  >>> .el-form-item {
    margin-bottom: 6px;
  }

  >>> .el-input {
    width: 120px;
  }

  >>> .addNode {
    width: 120px;
  }
</style>
