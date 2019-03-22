<template>
  <div>
    <!--未选人员-->
    <div class="Check waitCheck" :class="{'max':topMax,'min':bottomMax}">
      <div class="CheckHead waitHeader">
        <span>可选人员</span>
        <span>
          <el-checkbox v-if="!attributes.isSingle" v-model="selPerson.checkAllPerson" @change="handleCheckAllPerson">全选</el-checkbox>
        </span>
      </div>
      <i class="iconfont" :class="[topMax ? 'icon-zuixiaohua':'icon-zuidahua']" :title="topMax ? '最小化' : '最大化'" @click="() => topMax = !topMax"></i>

      <div :class="[topMax ? '' : 'kxry-box']">
        <div class="optionalDiv" v-for="(userItem, index) in selPerson.optionalList" :key="index">
          <div>
            <i style="cursor: pointer;" :class="[userItem.expand ? 'el-icon-caret-bottom':'el-icon-caret-right']" @click="() => userItem.expand = !userItem.expand"></i>
            <el-checkbox v-if="!attributes.isSingle" :indeterminate="userItem.indeterminate" v-model="userItem.checkAll" @change="(val) => handleCheckAllChange(val,userItem)">{{userItem.label}}</el-checkbox>
            <span v-if="attributes.isSingle">{{userItem.label}}</span>
          </div>
          <div v-if="!attributes.isSingle" class="userCard user-check" v-show="userItem.expand">
            <el-checkbox-group v-model="userItem.checkedUsers" @change="(val)=>handleCheckedChange(val,userItem)">
              <el-checkbox v-for="user in userItem.userList" :label="user.id" :key="user.id">{{user.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else class="userCard user-check" v-show="userItem.expand">
            <el-radio-group v-model="selPerson.radioChecked" @change="(val)=>handleCheckedChange(val,userItem)">
              <el-radio v-for="user in userItem.userList" :label="user.id" :key="user.id">{{user.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <!--已选人员-->
    <div class="Check hasCheck" :class="{'min':topMax,'max':bottomMax}">
      <div class="CheckHead hasHeader">
        <span>已选人员（分部门排列）</span>
        <span>
          <el-button type="text" :disabled="selPerson.hasOptionalList.length == 0" icon="el-icon-delete" @click="handleUnCheckedAll">取消全部</el-button>
          <el-button type="text" v-if="!attributes.isSingle" :disabled="selPerson.hasOptionalList.length == 0" icon="iconfont icon-qunzu" @click="getSingleGroupOpts"> 创建群组</el-button>
        </span>
      </div>
      <i class="iconfont" :class="[bottomMax?'icon-zuixiaohua':'icon-zuidahua']" :title="bottomMax?'最小化':'最大化'" @click="() => bottomMax = !bottomMax"></i>

      <div :class="[bottomMax ? '' : 'kxry-box']">
        <div class="optionalDiv" v-for="(userItem, index) in selPerson.hasOptionalList" :key="index">
          <div>
            <i style="cursor: pointer;" :class="[userItem.expand ? 'el-icon-caret-bottom':'el-icon-caret-right']" @click="() => userItem.expand = !userItem.expand"></i> {{userItem.label}}
          </div>
          <div class="userCard" v-if="userItem.expand">
            <div class="has-user-box" v-for="(user, uIndex) in userItem.userList" :key="uIndex">
              <div class="has-label-box msc-textColor-hover">
                  <span class="has-user-label" >
                  {{user.name}}
                  </span>
                  <i class="el-icon-error dep-item-delete" @click="handleDepItemDelete(userItem, user)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="保存个人群组" :visible.sync="groupDialog" append-to-body width="30%">
      <el-form ref="addGroupForm" :model="formGroup" :rules="addGroupRules" label-width="80px">
        <el-form-item label="群组名称" prop="groupName">
          <el-select v-model="formGroup.groupName" filterable allow-create default-first-option placeholder="">
            <el-option v-for="item in personGroup.singleGroupOpts" :key="item.id" :label="item.groupName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="groupDialog = false">关 闭</el-button>
        <el-button type="primary" @click="savePersonGroup">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: ['attributes', 'userData', 'selPerson', 'personGroup'],
  components: {},
  data () {
    return {
      topMax: false,
      bottomMax: false,
      formGroup: {
        groupName: ''
      },
      groupDialog: false,
      addGroupRules: {
        groupName: [{
          required: true,
          message: '必填 ',
          trigger: 'change'
        }]
      },
    }
  },
  computed: {
    hasOptionalList(){
      return this.selPerson.hasOptionalList
    }
  },
  watch: {
    hasOptionalList: {
      handler (val, oldVal) {
        if (!val || val.length == 0) {
          val = []
        }
        this.$emit('getData', val)
      },
      deep: true
    },
  },
  created () {
    if (this.userData.oldUsers) {
      this.setHasOptionalList(JSON.parse(JSON.stringify(this.userData.oldUsers)));
    } else {
      this.setHasOptionalList([])
    }
  },
  methods: {
    setHasOptionalList (result) {
      this.$set(this.selPerson, 'hasOptionalList', result)
    },
    //-------------------------------------------------待选人员
    handleCheckAllPerson (flag) { // 待选人员 全选
      this.selPerson.optionalList.forEach((orgItem, index) => {
        orgItem.checkAll = flag
        this.handleCheckAllChange(flag, orgItem)
      })
    },
    handleCheckAllChange (flag, orgItem) { // 可选人员列表 各分组全选
      orgItem.checkedUsers = []
      if (flag && orgItem.userList) {
        orgItem.userList.forEach((user, index) => {
          orgItem.checkedUsers.push(user.id)
        })
      }
      orgItem.indeterminate = false  // 控制分组的复选框的状态 
      this.$emit('judgeCheckAllPerson')
      this.handleHasOptionalList()
    },
    handleCheckedChange (val, item) { // 各分组checkBox勾选事件
      if (this.attributes.isSingle) {
        this.setHasOptionalList([])
        let userList = []
        for (let user of item.userList) {
          if (user.id == val) {
            userList.push(user)
            let tmpItem = {
              orgId: item.orgId,
              label: item.label,
              expand: item.expand,
              userList: userList
            }
            this.selPerson.hasOptionalList.push(tmpItem)
          }
        }
      } else {
        let checkedCount = val.length
        item.checkAll = checkedCount === item.userList.length  // 它控制勾选
        item.indeterminate = checkedCount > 0 && checkedCount < item.userList.length // 它控制不勾选与半勾选状态,false就是不勾选，true就是半勾选
        this.$emit('judgeCheckAllPerson')
        this.handleHasOptionalList() //操作已选人员列表
      }
    },
    handleHasOptionalList () { // 操作已选人员列表
      this.selPerson.optionalList.forEach((oItem, index) => {
        if (oItem.checkedUsers.length > 0) {
          let orgItem = this.selPerson.hasOptionalList.find((hasItem, index) => {
            return hasItem.orgId == oItem.orgId
          });
          if (orgItem) {
            oItem.userList.forEach((oUserItem, index) => {
              if (oItem.checkedUsers.indexOf(oUserItem.id, 0) != -1) {
                let user = orgItem.userList.find((userItm) => {
                  return userItm.id == oUserItem.id
                })
                if (!user) {
                  orgItem.userList.push(oUserItem)
                }
              } else {
                orgItem.userList.forEach((userItm, index) => {
                  if (userItm.id == oUserItem.id) {
                    orgItem.userList.splice(index, 1)
                  }
                })
              }
            })
          } else {
            let tmpItem = {}
            let nUserList = []
            tmpItem.orgId = oItem.orgId
            tmpItem.label = oItem.label
            tmpItem.expand = oItem.expand
            oItem.checkedUsers.forEach((userId, index) => {
              oItem.userList.forEach((oUserItem, index) => {
                if (userId == oUserItem.id) {
                  nUserList.push(oUserItem)
                }
              })
            })
            tmpItem.userList = nUserList
            this.selPerson.hasOptionalList.push(tmpItem)
          }
        } else {
          this.selPerson.hasOptionalList.forEach((orgItem, orgIndex) => {
            if (orgItem.orgId == oItem.orgId) {
              this.selPerson.hasOptionalList.splice(orgIndex, 1)
            }
          })
        }
      })
    },
    //-TOOD:----------------------------------------------已选人员
    handleUnCheckedAll () { // 取消全部已选择人员
      this.setHasOptionalList([])
      this.handleCheckAllPerson(false)
      this.$emit('handleFileBack')
    },
    handleDepItemDelete (orgItem, user) { // 删除已选人员
      this.selPerson.hasOptionalList.forEach((optItem, index) => {
        if (optItem.orgId == orgItem.orgId) {
          optItem.userList.forEach((userItm, index) => {
            if (userItm.id == user.id) {
              optItem.userList.splice(index, 1)
            }
          })
        }
        if (optItem.userList.length == 0) {
          this.selPerson.hasOptionalList.splice(index, 1)
        }
      })
      this.$emit('handleFileBack')
    },
    //---------------------------------------------------------dialog--创建群组
    getSingleGroupOpts () { // 打开查询个人群组信息
      this.$api_form_getPersonGroupOpts({data:{groupType: 2}}).then(res => {
        if (res) {
          this.$set(this.personGroup,'singleGroupOpts',res)
        }
        this.formGroup.groupName=''
        this.groupDialog = true
      })
    },
    savePersonGroup () { // 创建用户自定义群组
      this.$refs.addGroupForm.validate((valid) => {
        if (valid) {
          let obj = this.personGroup.singleGroupOpts.find((pitem) => {
            return pitem.id == this.formGroup.groupName
          })
          let params = {
            data: {
              groupType: 2,
              groupId: obj ? obj.id : null,
              groupName: this.formGroup.groupName,
              userJson: JSON.stringify(this.selPerson.hasOptionalList)
            }
          }
          this.$api_form_savePersonGroup(params).then(res => {
            this.$message({
              'message': '保存成功！',
              'type': 'success'
            });
            this.groupDialog = false
            this.updataAllGroup() // 左侧的群组树重新加载
          })
        }
      })
    },
    updataAllGroup () { // 更新左侧的群组树
      if(!this.attributes.groupShow){
        return false
      }
      this.$api_form_getPersonGroupOpts().then(res => {
        if (res) {
           for(let resItem of res){
             let flag=false
            for(let item of this.personGroup.allGroupOpts){
              if(resItem.id==item.id){
                flag=true
              }
            }
            if(!flag){ //追加resItem
              this.personGroup.allGroupOpts.push(resItem)
            }
          }
        }
      })
    },
  }
}
</script>

<style scoped>
.has-user-box {
  min-width: 90px;
  float: left;
}
.has-user-box .has-label-box:hover{
  transform: scale(1.1);
}

.has-user-box .has-label-box{
  display: inline-block;
  position: relative;
  transition: transform 0.1s linear;
}
.has-user-box .has-user-label{
  display: inline-block;
  padding: 5px 10px;
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.has-user-box .has-user-label:hover
,.has-user-box .has-label-box:hover .has-user-label  {
  background: #f5f7fa;
  border-radius: 5px;
}
.has-user-box .has-label-box:hover .dep-item-delete {
  display: block;
}
.dep-item-delete {
  display: none;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
}
.kxry-box {
  height: 180px;
  padding: 10px;
  overflow-y: auto;
}
.el-checkbox-group .el-checkbox {
  margin-left: 22px;
}
.optionalDiv {
  padding-left: 10px;
}
.userCard {
  padding:10px 10px 10px 20px;
  overflow: hidden;
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
.el-main .max {
  height: 100%;
}
.el-main .min {
  display: none;
}
.Check {
  position: relative;
}
.Check .iconfont {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 14px;
  cursor: pointer;
  color: #999;
}
.Check .iconfont:hover {
  color: #333;
}
.CheckHead {
  height: 30px;
  width: 100%;
  background: #f5f5f5;
  padding: 0 35px 0 15px;
  line-height: 30px;
  color: #333;
  display: flex;
  justify-content: space-between;
}
.CheckHead .el-button {
  padding: 0;
}
.el-select {
  width: 100%;
}
.dialog-footer >>> {
  text-align: right;
  margin-top: 15px;
}

.user-check .el-checkbox,.user-check .el-radio{
  margin-bottom: 10px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>