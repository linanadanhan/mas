<template>
  <div>
    <el-form :model="passwordInfo" ref="passwordInfo" :rules="rules" label-width="90px">
      <el-form-item label="登录名">
        <el-input v-model="userName" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input placeholder="请输入旧密码" type="password" v-model="passwordInfo.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input placeholder="请输入新密码" type="password" v-model="passwordInfo.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="secondPassword">
        <el-input placeholder="请确认新密码" type="password" v-model="passwordInfo.secondPassword"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'changePwd',
    title: '修改密码',
    props: ['data'],
    data() {
      var validatorPwd = (rule, value, callback) => {
        if (value !== '') {
          if (!(/^[a-zA-Z0-9_-]{6,50}$/.test(value))) {
            callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'))
          } else {
            callback()
          }
        } else {
          callback(new Error('必填'))
        }
      }
      return {
        userName: '',
        passwordInfo: {
          id: '',
          oldPassword: '',
          newPassword: '',
          secondPassword: ''
        },
        rules: {
          oldPassword: [{
              required: true,
              message: '必填 ',
              trigger: 'blur'
            }
          ],
          newPassword: [
            {
              validator: validatorPwd, 
              trigger: 'blur'            
            }
          ],
          secondPassword: [
            {
              validator: validatorPwd, 
              trigger: 'blur'            
            }
          ],
        },
      }
    },
    methods: {
    },
    created() {
      // 登录用户名
      this.userName = this.data.userInfo.loginName
      this.passwordInfo.id = this.data.userInfo.id
    }
  }
</script>
<style scoped>

</style>
