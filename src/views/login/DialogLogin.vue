<template>
  <div class="login">
        <div class="content">
          <el-form label-position="left"  label-width="0px" v-loading="login_actions.disabled" :element-loading-text="'正在'+(register===true ? '注册' : '登录')+'...'"  :model='data' :rules="rule_data" ref='data'>
            <h3 class="login-title">
              <span @click="toggleStatus(false)">系统登录</span>
            </h3>
            <el-form-item prop='username'>
              <el-input type="text" auto-complete="off" placeholder="账号" v-model='data.username'></el-input>
            </el-form-item>

            <el-form-item
              prop='password'>
              <el-input type="password" auto-complete="off" placeholder="密码" v-model='data.password' @keyup.native.enter="onLogin('data',true)"></el-input>
            </el-form-item>

            <el-form-item
              v-if="register===true"
              prop='repassword'>
              <el-input type="password" auto-complete="off" placeholder="确认密码" v-model='data.repassword' @keyup.native.enter="onRegister('data')"></el-input>
            </el-form-item>

            <el-checkbox style="margin:0px 0px 35px 0px;" v-if="register===false" :checked='remumber.remumber_flag' v-model='remumber.remumber_flag'>记住密码</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button type="primary"
                         v-if="register===false"
                         @click='onLogin("data")'>登 录
              </el-button>
              <el-button type="primary"
                         v-if="register===true"
                         @click='onRegister("data")'>注 册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
  </div>
</template>

<script>
  import LoginJs from './Login.js'

  export default LoginJs
</script>

// <style scoped lang='less'>
//   @import url(Login.less);
// </style>
<style scoped>
.content{padding:10px 40px;background:#fff;}
.login{background:#fff;}
.login-title{text-align: center;margin-bottom:35px;font-size: 16px;font-weight:bold;}
.el-button{display:block;width:100%;font-size:16px}
</style>