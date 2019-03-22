<template>
  <div class="panel">
    <i class="controlIcon el-icon-d-arrow-left" :class="[!asideShow?'hidden el-icon-d-arrow-right':'']" @click="controlAside"></i>
    <el-container>
      <el-aside width='325px' v-show="asideShow">
        <el-row>
          <el-col :span='22' class="selectBox">
            <el-select size="mini" v-model="dimension" placeholder="请选择纬度" @change="changeDimension">
              <el-option v-for="(item,index) in dimensionOptions" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='22'>
            <el-autocomplete v-model="searchName" size="mini" :fetch-suggestions="querySearchAsync" placeholder="搜索部门" @select="handleSelect">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
              <template slot-scope="props" v-show="search && search.length>0">
                <div :title="props.item.label">{{ props.item.name}}</div>
              </template>
            </el-autocomplete>
          </el-col>
        </el-row>
        <el-row class="tree-box">
          <div style="height: 320px;overflow: auto;">
          <el-tree ref="departTree" :props="defaultProps" :data="departmentData" :default-checked-keys="defaultChecked" node-key="id" show-checkbox highlight-current :default-expand-all="true" @check-change="handleCheckTreeNode">
          </el-tree>            
          </div>
        </el-row>
      </el-aside>
      <el-main>
        <div class="hasCheck">
          <div class="CheckHead hasHeader">
            <span>已选部门（<i class="checked-number">{{checkedNumber}}</i> / 项）</span>
            <el-button type="text" icon="el-icon-delete" :disabled="checkedkDepartments.length == 0" @click="handleUnCheckedAll">取消全部</el-button>
          </div>
          <el-row class="panel-content">
            <span class="dep-item dep-item-checked" v-for="(item,index)  in checkedkDepartments" :key="index">
								{{item.text}}
								<i class="el-icon-error dep-item-delete" @click="handleDepItemDelete(item)"></i>
						</span>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import { object } from 'utils'
  import _ from 'underscore'
  export default {
    name: 'check-department',
    props: ['page', 'params', 'widget', 'i', 'j'],
    data() {
      return {
        dimension: '', // 纬度
        dimensionOptions: [], // 部门纬度集合
        asideShow: true,
        searchName: '', // 搜索条件
        defaultProps: {
          label: 'text',
          children: 'children'
        },
        checkedNumber: 0,
        checkedkDepartments: [], // 已选部门数组
        departmentData: [], // 全部部门数据数组
        defaultChecked: [], // 默认选中勾选数组
        chooseData: [], // 远程搜索得到的数组
        attributes: {
          dimension: this.params.attributes && this.params.attributes.dimension ? this.params.attributes.dimension : '', //纬度
          orgIscascade: this.params.attributes && this.params.attributes.orgIscascade ? this.params.attributes.orgIscascade : true,
          orgData: this.params.attributes && this.params.attributes.orgData ? this.params.attributes.orgData : '', //多个逗号分割
        }
      }
    },
    computed: {},
    created() {
      this.getOrgDimension() // 初始化维度下拉菜单数据
      // 获取传过来的参数并进行查询
      if(this.params.attributes && this.params.attributes.dimension) {
        this.dimension = this.params.attributes.dimension
        this.asideOrganization()
      } else {// 不传纬度时也能进行数据回显
        this.handleFileBack()
      }
    },
    methods: {
      getOrgDimension() { // 查询组织维度
        let options = {
          data: {
            dicKey: 'org_dimension'
          }
        }
        this.$api_form_getDicItemByKey(options).then((data) => {
          if(data) {
            this.dimensionOptions = JSON.parse(JSON.stringify(data).toLowerCase())
          }
        })
      },
      querySearchAsync(queryString, cb) { // 实现远程异步搜索
        if(this.dimension == '') {
          this.$message('请先选择纬度！')
          return
        }
        let params = {
          data: {
            departmentName: this.searchName,
            dimension: this.dimension
          }
        };
        this.$api_form_getDepByNameAndDimension(params)
          .then(res => {
            if(res) {
              this.chooseData = res
              cb(res)
            }
          })
      },
      changeDimension(val) { // 选择纬度事件
        this.attributes.dimension = val;
        this.asideOrganization();
      },
      asideOrganization() { // 查询机构树
        let params = {
          data: {
            dimension: this.attributes.dimension,
            orgIds: '',
            isCascade: this.attributes.orgIscascade
          }
        };
        this.$api_form_getAsideOrgTree(params).then(res => {
          if(res) {
            this.departmentData = res
          } else {
            this.departmentData = []
          }
          this.handleFileBack()
        })
      },
      handleFileBack() { // 处理回填
        if(this.params.attributes.orgData) {
          this.params.attributes.orgData.forEach((item, index) => { // 添加到已选部门中
            this.verify(item, true)
            this.defaultChecked.push(item.id)
          })
        }
        this.checkedNumber = this.checkedkDepartments.length; // 重新统计已选部门的个数
      },
      handleSelect(item) { // 对搜索框远程结果选中操作
        if(item.parentId == 1) {
          this.ergodic(item)
        } else {
          this.checkedkDepartments.push(item)
        }
        //对勾选的"已选部门"进行对象数组去重
        var oldArr = this.checkedkDepartments;
        var allArr = [];
        for(var i = 0; i < oldArr.length; i++) {
          var flag = true;
          for(var j = 0; j < allArr.length; j++) {
            if(oldArr[i].id == allArr[j].id) {
              flag = false;
            }
          }
          if(flag) {
            allArr.push(oldArr[i]);
          }
        }
        //将去重后的数组重新赋值给"已选部门"
        this.checkedkDepartments = allArr;
        this.$refs.departTree.setChecked(item.id, true, false);
        this.checkedNumber = this.checkedkDepartments.length
        this.checkedkDepartments.forEach((item) => { // 将已选部门中的数据加到默认的勾选数组中，以便下次回显
          this.defaultChecked.push(item.id)
        })
      },
      controlAside() {
        this.asideShow = !this.asideShow
      },
      handleCheckTreeNode(obj, state, childState) { // 树点击事件
        this.verify(obj, state);
        this.defaultChecked = [];
        this.$refs.departTree.getCheckedNodes(true).forEach((item) => {
          this.defaultChecked.push(item.id) // 将已选中的节点加到默认的勾选数组中，以便下次回显
        });
        this.checkedNumber = this.checkedkDepartments.length
      },
      handleDepItemDelete(depObj) { // 移除已选部门
        this.checkedkDepartments = object.deepcopy(this.checkedkDepartments);
        if(depObj.children != null) {
          this.traversal(depObj)
        } else {
          this.checkedkDepartments = this.checkedkDepartments.filter(item => depObj.id != item.id) // 移除已选中的部门
        }
        this.defaultChecked = []; // 将默认勾选节点数组置空，并根据移除后的已选数组重新赋值
        this.checkedkDepartments.forEach((item) => {
          this.defaultChecked.push(item.id)
        });
        this.$refs.departTree.setCheckedKeys(this.defaultChecked);
        this.checkedNumber = this.checkedkDepartments.length; // 重新统计已选部门的个数
        this.$refs.departTree.setChecked(depObj.id, false, false); // 将部门树中对应的√去掉
      },
      handleUnCheckedAll() { // 取消所有选中
        this.checkedkDepartments = [];
        this.defaultChecked = [];
        this.checkedNumber = 0;
        this.$refs.departTree.setCheckedKeys([]);
      },
      verify(obj, state) {
        if(state) {
          this.checkedkDepartments.forEach((item, index) => {
            if(item.id == obj.id) {
              this.checkedkDepartments.splice(index, 1)
            }
          });
          this.checkedkDepartments.push(obj)
        } else {
          this.checkedkDepartments.forEach((item, index) => {
            if(item.id == obj.id) {
              this.checkedkDepartments.splice(index, 1)
            }
          })
        }
      },
      traversal(obj) {
        if(obj.children != null) { // 判断是否有子节点
          obj.children.forEach((depItem) => { // 如果存在子节点，将子节点分别移除
            this.traversal(depItem);
            this.checkedkDepartments = this.checkedkDepartments.filter(item => depItem.id != item.id);
            this.$refs.departTree.setChecked(depItem.id, false, false); // 将子节点中对应的√去掉
          });
          this.checkedkDepartments = this.checkedkDepartments.filter(item => obj.id != item.id)
        }
      },
      ergodic(obj) {
        this.departmentData.forEach((item, index) => {
          if(obj.id == item.id) {
            this.checkedkDepartments.push(item)
            this.$refs.departTree.setChecked(item.id, true, false)
            if(item.children && item.children.length > 0) {
              this.iteratorChilds(item.children)
            }
          }
        })
      },
      iteratorChilds(treeItem) { // 递归放入已选部门列表
        treeItem.forEach((item, index) => {
          this.checkedkDepartments.push(item)
          this.$refs.departTree.setChecked(item.id, true, false)
          if(item.children && item.children.length > 0) {
            this.iteratorChilds(item.children)
          }
        })
      }
    },
    mounted() {}
  }
</script>
<style scoped="scoped">
  .panel {
    width: 100%;
    height: 415px;
    position: relative;
  }
  
  .el-container {
    height: 100%;
  }
  
  .el-aside {
    height: 100%;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    padding: 10px;
    overflow: hidden;
  }
  
  .el-aside .el-input__inner {
    border: none;
    background: #f0f0f0;
  }
  
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  
  .show {
    display: none;
  }
  
  .selectBox {
    margin-bottom: 10px;
  }
  
  .selectBox .el-select {
    width: 193px;
  }
  
  >>>.custom-tree-node:hover .show {
    display: block;
  }
  
  .el-main {
    height: 100%;
    margin-left: 10px;
    border: 1px solid #e8e8e8;
    overflow: hidden;
    padding: 0;
    border-radius: 3px;
  }
  
  .waitCheck {
    height: 50%;
    width: 100%;
  }
  
  .hasCheck {
    height: 50%;
    width: 100%;
    border-top: 1px solid #f5f5f5;
  }
  
  .CheckHead {
    height: 30px;
    width: 100%;
    background: #f5f5f5;
    padding: 0 15px;
    line-height: 30px;
    color: #333;
    display: flex;
    justify-content: space-between
  }
  
  .CheckHead .el-button {
    padding: 0;
  }
  
  .el-select {
    width: 100%;
  }
  
  .controlIcon {
    position: absolute;
    left: 312px;
    top: 11px;
    font-size: 12px;
    display: inline-block;
    height: 22px;
    width: 12px;
    text-align: center;
    line-height: 22px;
    background: #f5f5f5;
    cursor: pointer;
  }
  
  .controlIcon:hover {
    background: #e4e4e4;
  }
  
  .hidden {
    left: -2px;
    top: 5px;
  }
  
  .tree-box {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .checked-number {
    color: red;
  }
  
  .panel-content {
    padding: 8px 15px;
  }
  
  .dep-item {
    display: inline-block;
    margin-right: 30px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .dep-item>>>.el-checkbox__label {
    padding-left: 5px;
  }
  
  .dep-item-checked {
    position: relative;
    transition: transform .1s linear;
    padding: 2px 12px;
  }
  
  .dep-item-checked:hover {
    background: #f5f7fa;
    color: #409EFF;
    transform: scale(1.1);
  }
  
  .dep-item-checked:hover .dep-item-delete {
    display: block;
  }
  
  .dep-item-delete {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
  }
</style>