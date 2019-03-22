<template>
  <decorator :i="i" :j="j" :widget="widget" :page="page">
    <div class="widget">
      <div class="panel">
        <i class="controlIcon el-icon-d-arrow-left" :class="[!asideShow?'hidden el-icon-d-arrow-right':'']" @click="controlAside"></i>
        <el-container>
          <el-aside width='325px' v-show="asideShow">
            <div class="asideHead">
              <el-autocomplete v-model="search" size="mini" :fetch-suggestions="querySearchAsync" placeholder="搜索用户" :trigger-on-focus="false" @select="handleSelect">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                <template slot-scope="props" v-show="search && search.length>0">
                  <div :title="props.item.label">{{ props.item.user.name}}({{props.item.label}})</div>
                </template>
              </el-autocomplete>
            </div>
            <div class="asideContent">
              <aside-org :initDimension="initDimension" :attributes="attributes" :selPerson="selPerson" :personGroup="personGroup" @judgeCheckAllPerson="judgeCheckAllPerson" @handleFileBack="handleFileBack"></aside-org>
            </div>
          </el-aside>
          <el-main>
            <selected-persons @getData="getData" :attributes="attributes" :userData="userData" :selPerson="selPerson" :personGroup="personGroup" @judgeCheckAllPerson="judgeCheckAllPerson" @handleFileBack="handleFileBack"></selected-persons>
          </el-main>
        </el-container>
      </div>
    </div>
  </decorator>
</template>

<script>
import SelectedPersons from './page/SelectedPerson.vue'
import AsideOrg from './page/AsideOrg.vue'
export default {
  props: ['page', 'params', 'widget', 'i', 'j', 'data'],
  components: { SelectedPersons, AsideOrg },
  data () {
    return {
      asideShow: true,  // 左侧箭头
      search: '', // 搜索
      userData: { // 属性，回填数据
        oldUsers: this.params.userData.oldUsers
      },
      attributes: { // 属性, 扩展参数
        dimension: this.params.attributes && this.params.attributes.dimension ? this.params.attributes.dimension : '', //纬度
        isSingle: this.params.attributes && this.params.attributes.isSingle == true ? this.params.attributes.isSingle : false, //单选还是多选
        orgShow: this.params.attributes && this.params.attributes.orgShow == false ? this.params.attributes.orgShow : true, //机构
        orgIscascade: this.params.attributes && this.params.attributes.orgIscascade ? this.params.attributes.orgIscascade : true,
        orgData: this.params.attributes && this.params.attributes.orgData ? this.params.attributes.orgData : '', //多个逗号分割
        roleShow: this.params.attributes && this.params.attributes.roleShow == false ? this.params.attributes.roleShow : true, //角色
        roleData: this.params.attributes && this.params.attributes.roleData ? this.params.attributes.roleData : '',
        groupShow: this.params.attributes && this.params.attributes.groupShow == false ? this.params.attributes.groupShow : true, //群组
        groupData: this.params.attributes && this.params.attributes.groupData ? this.params.attributes.groupData : '',
        jobShow: this.params.attributes && this.params.attributes.jobShow == false ? this.params.attributes.jobShow : true, //岗位
        jobData: this.params.attributes && this.params.attributes.jobData ? this.params.attributes.jobData : '',
        pingShow: this.params.attributes && this.params.attributes.pingShow == false ? this.params.attributes.pingShow : true, //拼音
        exPersons: this.params.attributes && this.params.attributes.exPersons ? this.params.attributes.exPersons : '', //扩展待选人员
      },
      initDimension: this.params.attributes.dimension, // 初始纬度;如果有，就不显示选择纬度框;
      selPerson: {
        radioChecked: false,
        checkAllPerson: false, // 待选区全选
        optionalList: [],  // 待选人员
        hasOptionalList: [], // 已选人员
      },
      personGroup: {  // 群组
        allGroupOpts: [], // 包括系统与个人
        singleGroupOpts: [], // 个人群组
      }
    }
  },
  created () {
  },
  methods: {
    getData (data) {
      this.$emit('getData', data)
    },
    querySearchAsync (queryString, cb) {
      if (!this.search || this.search.length == 0) {
        cb([])
        return false
      }
      let params = {
        data: {
          personName: this.search,
          dimension: this.attributes.dimension
        }
      }
      this.$api_form_getPersonListByAllOrgs(params).then(res => {
        if (res) {
          cb(res)
        }
      })
    },
    handleSelect (item) { // 搜索选中
      let orgItem = this.selPerson.hasOptionalList.find((hasItem) => {
        return hasItem.orgId == item.orgId
      })
      if (orgItem) {
        let user = orgItem.userList.find((userItm) => {
          return userItm.id == item.user.id
        })
        if (!user) {
          orgItem.userList.push(item.user)
        }
      } else {
        let tmpItem = {}
        let nUserList = []
        tmpItem.orgId = item.orgId
        tmpItem.label = item.label
        tmpItem.expand = true
        nUserList.push(item.user)
        tmpItem.userList = nUserList
        this.selPerson.hasOptionalList.push(tmpItem)
      }
      this.handleFileBack()
    },
    controlAside () {
      this.asideShow = !this.asideShow
    },
    //---------------------------------------------------------公共--回填勾选
    handleFileBack () { // 回填自动勾选效果
      if (!this.selPerson.hasOptionalList || this.selPerson.hasOptionalList.length == 0) {
        this.selPerson.radioChecked = false
        this.selPerson.optionalList.forEach((optItem, index) => {
          optItem.checkedUsers = []
          optItem.checkAll = false
          optItem.indeterminate = false
        })
        return false
      }
      if (this.selPerson.hasOptionalList && this.selPerson.hasOptionalList.length > 0) {
        if (this.attributes.isSingle) { //单选
          this.selPerson.optionalList.forEach((optItem, index) => {
            this.selPerson.hasOptionalList.forEach((hasOptItem, index) => {
              if (optItem.orgId == hasOptItem.orgId) {
                if (hasOptItem.userList) {
                  hasOptItem.userList.forEach((uItem, index) => {
                    this.selPerson.radioChecked = uItem.id //单选人
                  })
                }
              }
            })
          })
        } else { //复选框
          this.selPerson.optionalList.forEach((optItem, index) => {
            let checkedUsers = []
            this.selPerson.hasOptionalList.forEach((hasOptItem, index) => {
              if (optItem.orgId == hasOptItem.orgId) {
                if (hasOptItem.userList) {
                  hasOptItem.userList.forEach((uItem, index) => {
                    checkedUsers.push(uItem.id)
                  })
                }
              }
            })
            let checkedCount = checkedUsers.length
            optItem.checkAll = checkedCount === optItem.userList.length
            optItem.indeterminate = checkedCount > 0 && checkedCount < optItem.userList.length;
            optItem.checkedUsers = checkedUsers
          })
          this.judgeCheckAllPerson()
        }
      }
    },
    judgeCheckAllPerson () { // 判断全选人员chk是否勾选
      let i = 0
      for (let orgItem of this.selPerson.optionalList) {
        if (orgItem.checkAll) {
          i++
        }
      }
      if (i == this.selPerson.optionalList.length && i != 0) {
        this.selPerson.checkAllPerson = true
      } else {
        this.selPerson.checkAllPerson = false
      }
    },
  }
}
</script>

<style scoped>
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
  overflow: hidden;
}
.asideContent {
  padding: 10px;
}
.el-aside .el-autocomplete {
  display: block;
}
.show {
  display: none;
}
.el-main {
  height: 100%;
  margin-left: 10px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  padding: 0;
  border-radius: 3px;
}
.asideHead {
  width: 100%;
  padding: 10px 20px 0px 10px;
  color: #333;
}
.controlIcon {
  position: absolute;
  left: 312px;
  top: 13px;
  font-size: 12px;
  display: inline-block;
  height: 22px;
  width: 12px;
  text-align: center;
  line-height: 22px;
  background: #d9d9d9;
  cursor: pointer;
  z-index: 100;
}
.controlIcon:hover {
  background: #d3d3d3;
}
.hidden {
  left: -2px;
  top: 5px;
}
.widget {
  min-height: 50px;
}
</style>