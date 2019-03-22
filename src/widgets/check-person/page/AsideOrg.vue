<template>
  <div class="aside">
    <el-select v-if="!initDimension" size="mini" v-model="dimension" placeholder="请选择纬度" @change="changeDimension">
      <el-option v-for="item in dimensionOptions" :key="item.value" :label="item.text" :value="item.value">
      </el-option>
    </el-select>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-if="attributes.orgShow" label="机构" name="first">
        <el-tree ref="orgTree" :props="defaultProps" node-key="id" :default-checked-keys="defChkOrgKeys" :data="organizationData" @check="(node,nodeObj)=>CheckTree(nodeObj.checkedKeys,'org')" show-checkbox>
        </el-tree>
      </el-tab-pane>
      <el-tab-pane v-if="attributes.groupShow" label="群组" name="second">
        <el-tree ref="groupTree" :props="groupProps" node-key="id" :data="personGroup.allGroupOpts" @check="(node,nodeObj)=>CheckTree(nodeObj.checkedKeys,'group')" show-checkbox>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="data.groupType==2">
              <i class="el-icon-delete show" @click="() => removeGroup(node, data)">
              </i>
            </span>
          </span>
        </el-tree>
      </el-tab-pane>
      <el-tab-pane v-if="attributes.roleShow" label="角色" name="third">
        <el-tree ref="roleTree" :props="roleProps" node-key="id" :data="roleData" @check="(node,nodeObj)=>CheckTree(nodeObj.checkedKeys,'role')" show-checkbox>
        </el-tree>
      </el-tab-pane>
      <!-- TODO: 岗位暂时去掉 -->
      <!-- <el-tab-pane v-if="attributes.jobShow" label="岗位" name="fourth">
        <el-tree ref="postTree" :props="postProps" node-key="postId" :data="postData" @check="(node,nodeObj)=>CheckTree(nodeObj.checkedKeys,'post')" show-checkbox>
        </el-tree>
      </el-tab-pane> -->
      <el-tab-pane v-if="attributes.exPersons && attributes.exPersons.length>0" label="人员" name="six">
        <div v-if="attributes.dimension" class="letterDiv" style="padding-left:24px;color:#606266">
          <el-checkbox v-model="exPersonChecked" @change="checkExtPerson"></el-checkbox>
          <span>特殊人员</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="拼音" name="five">
        <div class="letterDiv">
          <span v-for="(letter,index) in letters" :key="index" class="pinyin msc-textColor-hover" :class="{'msc-text-color':letter.isActive,'msc-border-color':letter.isActive}" @click="activeClass(letter)">{{letter.name}}</span>
        </div>
        <div class="selLetterDiv">
          <el-tag v-if="selLetters.length > 0" type="info">{{selLetters.join('')}}</el-tag>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ['initDimension', 'attributes', 'selPerson', 'personGroup'],
  components: {},
  data () {
    return {
      exPersonChecked: false,  // 特殊人员复选框勾选
      dimensionOptions: [],  // 纬度options
      dimension: '', // 纬度
      defChkOrgKeys: [],
      activeName: '',
      defaultProps: {
        label: 'text',
        children: 'children'
      },
      groupProps: {
        label: 'groupName',
        children: 'children'
      },
      roleProps: {
        label: 'name',
        children: 'children'
      },
      postProps: {
        label: 'postName',
        children: 'children'
      },
      organizationData: [],
      roleData: [],
      postData: [],
      selLetters: [],
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    }
  },
  created () {
    if (!this.attributes.dimension) {
      this.getOrgDimension()
    }
    this.initActiveName()
    this.letters = this.letters.map(item => ({
      name: item,
      isActive: false
    }))
  },
  methods: {
    initActiveName () { // 激活的tab
      let name = 'five'
      if (this.attributes.orgShow) {
        name = "first"
        if(this.attributes.dimension){
            this.asideOrg()
        }
      } else if (this.attributes.groupShow) {
        name = "second"
        if(this.attributes.dimension){
            this.asideGroup()
        }
      } else if (this.attributes.roleShow) {
        name = "third"
        if(this.attributes.dimension){
            this.asideRole()
        }
      } else if (this.attributes.jobShow) {
        name = "fourth"
      } else if (this.attributes.exPersons) {
        name = "six"
      }
      this.activeName = name
    },
    getOrgDimension () { //查询组织维度
      this.$api_form_getDimensionList({ data: { dicKey: 'org_dimension' } }).then(res => {
        if (res) {
          this.dimensionOptions = res
          // 初始默认给一纬度
          this.dimension = res[0].value
          this.changeDimension(this.dimension)
        }
      })
    },
    changeDimension (val) { // 选择维度
      this.attributes.dimension = val
      this.asideOrg()
      this.asideGroup()
      this.asideRole()
      //				this.asidePost()  //TODO: 暂时不加岗位
    },
    handleClick (tab) { // Tab 标签页点击切换
      if (!this.attributes.dimension) {
        this.$message('必须先选择一个纬度!')
        return false
      }
      if (tab.name == 'first') { // 机构
        this.$refs.orgTree.setCheckedKeys([])
        this.defChkOrgKeys = []
        this.asideOrg()
      } else if (tab.name == 'second') { // 群组
        this.$refs.groupTree.setCheckedKeys([])
        this.asideGroup()
      } else if (tab.name == 'third') { // 角色
        this.$refs.roleTree.setCheckedKeys([])
        this.asideRole()
      } else if (tab.name == 'fourth') { // 岗位
        this.$refs.postTree.setCheckedKeys([])
        // this.asidePost()
      } else if (tab.name == 'six') { // 人员
        this.exPersonChecked = false
      }
      this.activeName = tab.name
    },
    asideOrg () { // 查询机构树
      let params = {
        data: {
          dimension: this.attributes.dimension,
          orgIds: this.attributes.orgData,
          isCascade: this.attributes.orgIscascade
        }
      }
      this.$api_form_getAsideOrgTree(params).then(res => {
        if (res) {
          this.organizationData = res
          this.$emit('handleFileBack')
        } else {
          this.organizationData = []
        }
      })
    },
    asideGroup () { // 查询群组信息
      this.$api_form_getPersonGroupOpts().then(res => {
        if (res) {
          this.$set(this.personGroup, 'allGroupOpts', res)
        } else {
          this.$set(this.personGroup, 'allGroupOpts', [])
        }
      })
    },
    asideRole () { // 查询所有角色信息
      let param = {
        data: {
          roleIds: this.attributes.roleData
        }
      }
      this.$api_form_getAllRolesByIds(param).then(res => {
        if (res) {
          this.roleData = res
        } else {
          this.roleData = []
        }
      })
    },
    asidePost () { // 查询所有岗位信息
      this.$api_form_asidePost().then(res => {
        if (res) {
          this.postData = res
        } else {
          this.postData = []
        }
      })
    },
    CheckTree (checkedKeys, flag) { // 勾选tree
      this.setOptionalList([]) //清空
      if (checkedKeys && checkedKeys.length > 0) {
        let ids = checkedKeys.join(",")
        if (flag == 'org') {
          this.checkOrg(ids)
        } else if (flag == 'group') {
          this.checkGroup(ids)
        } else if (flag == 'role') {
          this.checkRole(ids)
        } else if (flag == 'post') {
          //  this.checkPost(ids) // TODO:岗位暂时先不要
        }
      } else {
        this.$emit('handleFileBack')
      }
    },
    setOptionalList (result) {
      this.$set(this.selPerson, "optionalList", result)
    },
    checkOrg (ids) { // 机构树checkbox点击事件
      this.$api_form_getPersonTreeByOrgIds({ data: { orgIds: ids } }).then(res => {
        this.setOptionalList(res)
        this.$emit('handleFileBack')
      })
    },
    checkGroup (ids) { // 自定义群组树checkbox点击事件
      this.$api_form_getPersonTreeByGroupIds({ data: { chkGroupIds: ids } }).then(res => {
        this.setOptionalList(res)
        this.$emit('handleFileBack')
      })
    },
    checkRole (ids) { // 角色树checkbox点击事件
      let params = {
        data: {
          roleIds: ids,
          dimension: this.attributes.dimension
        }
      }
      this.$api_form_getPersonTreeByRoleIds(params).then(res => {
        this.setOptionalList(res)
        this.$emit('handleFileBack')
      })
    },
    checkPost (ids) { // 自定义岗位树checkbox点击事件
      let params = {
        data: {
          chkPostIds: ids,
          treeData: this.organizationData
        }
      }
      this.$api_form_getPersonTreeByPostIds(params).then(res => {
        this.setOptionalList(res)
        this.$emit('handleFileBack')
      })
    },
    checkExtPerson (val) { // 勾选扩展人员
      if(!val){
        this.setOptionalList([])
        return false
      }
      let param = {
        data: {
          dimension: this.attributes.dimension,
          personIds: this.attributes.exPersons
        }
      }
      this.$api_form_getExPersons(param).then(res => {
        this.setOptionalList(res)
        this.$emit('handleFileBack')
      })
    },
    activeClass (item) { // 点击拼音
      if (!this.attributes.dimension) {
        this.$message('必须先选择一个纬度!')
        return false
      }
      this.setOptionalList([])
      item.isActive = !item.isActive
      if (this.selLetters.indexOf(item.name, 0) != -1) {
        if (!item.isActive) {
          this.selLetters.splice(this.selLetters.indexOf(item.name, 0), 1)
        }
      } else {
        if (item.isActive) {
          this.selLetters.push(item.name)
        }
      }
      if (this.selLetters.length > 0) {
        let params = {
          data: {
            letters: this.selLetters.join(''),
            dimension: this.attributes.dimension
          }
        }
        this.$api_form_getPersonTreeByLetters(params).then(res => {
          if (res) {
            this.setOptionalList(res)
            this.$emit('handleFileBack')
          }
        })
      }
    },
    removeGroup (node, data) { // 删除群组
      this.$confirm('确认要删除该群组吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          groupId: data.id
        }
        this.$api_form_delPersonGroup({
          data: params
        }).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.asideGroup()
          this.setOptionalList([])  // 清除可选人员和已选人员数据
        })
      })
    },
  }
}
</script>

<style scoped>
.el-checkbox-group .el-checkbox {
  margin-left: 22px;
}
.aside >>> .el-tabs__content {
  height: 316px;
  overflow: auto;
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
.aside >>> .custom-tree-node:hover .show {
  display: block;
}
.letterDiv {
  width: 100%;
  overflow: hidden;
  padding: 0 10px;
}
.selLetterDiv {
  margin-top: 20px;
  text-align: center;
}
.pinyin {
  float: left;
  padding: 0;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #fff;
  color: #333;
}
.el-select {
  width: 100%;
}
.asideContent .el-select {
  width: 100%;
  padding-right: 10px;
}
</style>