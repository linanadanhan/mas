<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      <div class="panel">
        <el-container>
          <el-main>
            <div class="waitCheck">
              <div class="CheckHead waitHeader">
                <span>可选角色</span>
                <div>
                  <el-select v-model="dimension" clearable size="mini" @change="chooseDimension" placeholder="请选择维度">
                    <el-option v-for="(item,index) in dimensionOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="type" clearable size="mini" @change="chooseType" placeholder="请选择类型">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                  <el-autocomplete v-model="searchName" size="mini" :fetch-suggestions="querySearchAsync" placeholder="搜索角色" @select="handleSelect">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <template slot-scope="props" v-show="search && search.length>0">
                      <div :title="props.item.label">{{ props.item.name}}</div>
                    </template>
                  </el-autocomplete>
                  <el-checkbox v-model="checkAll" class="btn-check" @change="handleChangeCheckAll">全选</el-checkbox>
                </div>
              </div>
              <el-row class="panel-content">
                <el-checkbox-group v-model="checkList" @change="(val) => handleChangekRole(val,roleData)">
                  <el-checkbox class="role-item" v-for="(item,index)  in roleData" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-row>
            </div>
            <div class="hasCheck">
              <div class="CheckHead hasHeader">
                <span>已选角色（<i class="checked-number">{{this.checkRoles.length}}</i> / 项）</span>
                <el-button type="text" :disabled="checkRoles.length == 0" icon="el-icon-delete" @click="handleCancelAll">取消选择</el-button>
              </div>
              <el-row class="panel-content">
                <span class="role-item role-item-checked" v-for="(item,index) in checkRoles" v-bind="item.checkRole" :key="index">
								{{item.name}}
								<i class="el-icon-error role-item-delete" @click="handleRoleItemDelete(item,index)"></i>
							</span>
              </el-row>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </decorator>
</template>
<script>
  import { object } from 'utils'
  import _ from 'underscore'

  export default {
    name: 'check-role',
    props: ['page', 'params', 'widget', 'i', 'j'],
    data() {
      return {
        searchName: '', // 搜索条件
        checkRoles: [], // 已选角色
        checkAll: false, // 是否全选
        type: '', // 类型
        typeOptions: [], // 根据类型查询角色下拉数组
        dimension: '', // 纬度
        dimensionOptions: [], // 根据维度查询角色下拉数组
        checkList: [], // 已勾选角色数组
        AllRoleData: [], // 所有角色信息
        roleData: [], // 根据条件查询角色信息
      }
    },
    computed: {},
    created() {
      this.checkList = []
      this.checkRoles = []
      this.AllRoleData = []
      this.roleData = []
      this.checkAll = false
      this.searchName = ''
      this.type = ''
      this.dimension = ''

      if(this.params.rolesData && this.params.rolesData.length > 0) {
        this.params.rolesData.forEach((roleItem, key) => {
          this.checkRoles.push(roleItem)
          this.checkList.push(roleItem.id)
        })
      }
      // 获取角色纬度(数据字典机构纬度)下拉列表数据
      this.getRoleDimensions()
      // 查询所有角色信息列表
      this.getAllRoleList()
      // 查询待选角色列表
      this.getRoleList()
    },
    methods: {
      getRoleDimensions() { // 获取角色纬度下拉列表
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
      getAllRoleList() {
        let params = {
          data: {
            type: '',
            role_dimension: '',
            roleName: ''
          }
        }
        this.$api_form_getRolesByTypeAndDemensionAndName(params)
          .then(data => {
            if(data) {
              this.AllRoleData = data
              // 组装所有角色分类信息
              data.forEach((item, index) => {
                var bool = this.typeOptions.indexOf(item.type)
                if(item.type && bool === -1) {
                  this.typeOptions.push(item.type)
                }
              })
            }
          })
      },
      getRoleList() { // 获取待选角色列表
        if (this.type != '' || this.dimension != '' ) {
          let params = {
            data: {
              type: this.type,
              role_dimension: this.dimension,
              roleName: this.searchName
            }
          }
          this.$api_form_getRolesByTypeAndDemensionAndName(params)
            .then(data => {
              if(data) {
                this.roleData = data
                // 根据处理待选及已选数据信息
                this.handleParmsData()
              }
            })          
        } else {
          this.roleData = []
        }
      },
      handleParmsData() {
        this.checkRoles.forEach((hasItem, index) => {
          this.roleData.forEach((hasNoItem, index1) => {
            if(hasItem.id == hasNoItem.id) {
              this.checkList.push(hasItem.id)
            }
          })
        })
        this.checkList = [...new Set(this.checkList)]
        if(this.checkList.length == this.roleData.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      chooseDimension(val) { // 纬度选择change
        this.getRoleList()
      },
      chooseType(val) { // 类型选择change
        this.getRoleList()
      },
      handleChangekRole(val, role) { // 待选角色选择
        this.checkRoles = []
        this.checkList = [...new Set(this.checkList)]
        this.roleData.forEach((roleItem, index) => {
          this.checkList.forEach((id) => {
            if(id == roleItem.id) {
              this.checkRoles.push(roleItem)
            }
          })
        })
        if(this.checkList.length == this.roleData.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      handleRoleItemDelete(role, index) { // 已选角色删除
        this.checkRoles.splice(index, 1)
        let idx = this.checkList.indexOf(role.id)
        this.checkList.splice(idx, 1)
        this.checkList = [...new Set(this.checkList)]
        if(this.checkList.length == this.roleData.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      handleCancelAll() { // 取消选择
        this.checkRoles = []
        this.checkList = []
        this.checkAll = false
      },
      handleChangeCheckAll(val) { // 全选
        if(val) {
          this.checkRoles = object.deepcopy(this.roleData)
          this.checkList = []
          this.checkRoles.forEach((item, index) => {
            this.checkList.push(item.id)
          })
        } else {
          this.checkRoles = []
          this.checkList = []
        }
      },
      querySearchAsync(queryString, cb) { // 异步加载搜索对应角色
        let params = {
          data: {
            type: this.type,
            role_dimension: this.dimension,
            roleName: this.searchName
          }
        }
        this.$api_form_getRolesByTypeAndDemensionAndName(params)
          .then(res => {
            if(res) {
              cb(res)
            }
          })
      },
      createStateFilter(queryString) {
        return(state) => {
          return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(role) { // 搜索选中
        if(this.checkRoles.length > 0) {
          let flag = true;
          this.checkRoles.forEach(item => {
            if(item.id === role.id) {
              flag = false
            }
          })
          if(flag) {
            this.checkRoles.push(role)
            this.checkList.push(role.id)
          }
        } else {
          this.checkRoles.push(role)
          this.checkList.push(role.id)
        }
        this.checkList = [...new Set(this.checkList)]
        if(this.checkList.length == this.roleData.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
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
  
  >>>.custom-tree-node:hover .show {
    display: block;
  }
  
  .el-main {
    height: 100%;
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
    width: 100%;
    background: #f5f5f5;
    padding: 5px 15px;
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
  
  .panel-content {
    padding: 8px 15px;
  }
  
  .role-item {
    display: inline-block;
    margin-right: 30px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .role-item:first-child {
    margin-left: 30px;
  }
  
  .role-item>>>.el-checkbox__label {
    padding-left: 5px;
  }
  
  .btn-check {
    margin-left: 30px;
  }
  
  .reset-button {
    background: #409EFF;
    color: #f5f7fa;
    width: 55px;
    height: 25px
  }
  
  .checked-number {
    color: red;
  }
  
  .checked-role {
    color: #8bc34a
  }
  
  .role-item-checked {
    position: relative;
    transition: transform .1s linear;
    padding: 2px 12px;
  }
  
  .role-item-checked:hover {
    background: #f5f7fa;
    color: #409EFF;
    transform: scale(1.1);
  }
  
  .role-item-checked:hover .role-item-delete {
    display: block;
  }
  
  .role-item-delete {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
  }
  
  .waitHeader .el-select.el-select--mini {
    width: 120px;
  }
</style>