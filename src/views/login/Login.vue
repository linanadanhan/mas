<template>
  <div class="login" >
        <div class="content" >
          <div class="system-title"> Tangram <span>协同工作门户平台</span></div>
          <el-form label-position="left"  label-width="0px" class="demo-ruleForm card-box loginform" v-loading="login_actions.disabled" :element-loading-text="'正在'+(register===true ? '注册' : '登录')+'...'"  :model='data' :rules="rule_data" ref='data'>
            <h3 class="title">
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
              <!-- <el-button @click='resetForm("data")'>取消</el-button> -->
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
.login {
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background:url(./login.jpg) no-repeat ;
  background-size:100% 100%;
}
.content{
  position: absolute;
  top:50%;
  left:50%;
  margin-top: -240px;
  margin-left: -240px;
}
.login  .system-title{
    font-size:26px;
    font-weight:bold;
    text-align:center;
    color:#fff;
    margin-bottom:60px;
    letter-spacing:2px;
}
.login  .system-title  span{
      letter-spacing:6px;
}
.login  .card-box {
    -webkit-border-radius: 15px;
    border-radius: 15px;
    -moz-border-radius: 15px;
    background-color: rgba(255,255,255,0.2);
  }

.login  .title {
    margin: 10px auto 35px auto;
    text-align: center;
    color: #fff;
    letter-spacing:2px;
    font-weight: normal;
    font-size: 16px;
  }

.login  .loginform {
    width: 480px;
    padding: 25px 75px 25px 75px;
  }






 >>>.el-input__inner{background-color:transparent;color:#fff}
 .el-button{display:block;width:100%;font-size:16px}
 .el-button--primary{background:#1d60bb;border-color:#1d60bb}
 .el-button--primary:hover{background:#1c5bb0;border-color:#1c5bb0}
 .el-checkbox{color:#fff}
 >>>.el-checkbox__input.is-checked + .el-checkbox__label{color:#fff}
</style>