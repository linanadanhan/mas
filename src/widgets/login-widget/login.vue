<template>
	<decorator :i="i" :j="j" :widget="widget" :page="page">
		<div class="widget" v-if="!userInfo">
			<el-form label-width="50px" v-loading="login_actions.disabled" :element-loading-text="'正在'+(register===true ? '注册' : '登录')+'...'" :model='data' :rules="rule_data" ref='data'>
				<el-form-item label="账号" :size="size" prop='username'>
					<el-input class="login-form-input" type="text" :size="size" auto-complete="off" placeholder="账号" v-model='data.username'></el-input>
				</el-form-item>
				<el-form-item label="密码" :size="size" prop='password'>
					<el-input class="login-form-input" type="password" :size="size" auto-complete="off" placeholder="密码" v-model='data.password' @keyup.native.enter="onLogin('data',true)"></el-input>
				</el-form-item>
				<el-form-item :size="size" v-if="register===true" prop='repassword'>
					<el-input class="login-form-input" type="password" :size="size" auto-complete="off" placeholder="确认密码" v-model='data.repassword' @keyup.native.enter="onRegister('data')"></el-input>
				</el-form-item>
				<el-form-item v-if="register===false" :size="size">
					<el-checkbox :size="size" :checked='remumber.remumber_flag' v-model='remumber.remumber_flag'>记住密码</el-checkbox>
				</el-form-item>
				<el-form-item :size="size">
					<el-button type="primary" :size="size" v-if="register===false" @click='onLogin("data")'>登录
					</el-button>
					<el-button type="primary" :size="size" v-if="register===true" @click='onRegister("data")'>注册
					</el-button>
					<el-button :size="size" @click='resetForm("data")'>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-else>
			 <span style="color: red;font-size: 12px;">【{{userInfo.username}}】</span> 已登录,<el-button type="text" @click="handleLoginOut">退出</el-button> 登录
		</div>
	</decorator>
</template>

<script>
	var qs = require('qs')
	export default {
		name: 'login-widget',
		props: ['page', 'params', 'widget', 'i', 'j'],
		data() {
			return {
				size: 'mini',
				remumber: this.$store.state.user.remumber,
				register: false,
				login_actions: {
					disabled: false
				},
				data: {
					username: '',
					password: ''
					// token: ''
				},
				rule_data: {
					username: [{
						validator: (rule, value, callback) => {
							if(value === '') {
								callback(new Error('请输入用户名'))
							} else {
								if(/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
									callback()
								} else {
									callback(new Error('用户名至少6位,由大小写字母和数字,-,_组成'))
								}
							}
						},
						trigger: 'blur'
					}],
					password: [{
						validator: (rule, value, callback) => {
							if(value === '') {
								callback(new Error('请输入密码'))
							} else {
								if(!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
									callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'))
								} else {
									if(this.register === true) {
										if(this.data.repassword !== '') {
											this.$refs.data.validateField('repassword')
										}
									}
									callback()
								}
							}
						},
						trigger: 'blur'
					}],
					repassword: [{
						validator: (rule, value, callback) => {
							if(value === '') {
								callback(new Error('请再次输入密码'))
							} else if(value !== this.data.password) {
								callback(new Error('两次输入密码不一致!'))
							} else {
								callback()
							}
						},
						trigger: 'blur'
					}]
				},guideData:[]
			}
		},
		computed: {
			userInfo () {
		      return this.$store.getters.userinfo
		    }
		},
		methods: {
			onLogin(ref, type) {
				if(type && this.register === true) {
					this.$message.error('请输入确认密码')
					return
				}
				this.$refs[ref].validate((valid) => {
					if(valid) {
						this.login_actions.disabled = true
						// 如果记住密码，提交的信息包括真实token，密码则是假的
						// 服务端登录验证优先级：用户名必须，其次先取token，不存在时再取密码
						var params = this[ref]
						params.front = '1'
						params.customerCode = sessionStorage.getItem('customerCode')
						this.$api_user_login({
							data: qs.stringify(params),
							method: 'post',
							beforeErrorHandle: () => {
								this.login_actions.disabled = false
								return true
							},
							tokenFlag: true
						}).then(data => {
							// 登录成功之后，验证是否记住密码，如果记住密码，本地保存记住信息
							// 如果没有记住，就初始化本地记住信息
							if(this.remumber.remumber_flag === true) {
								this.$store.dispatch('update_remumber', {
									remumber_flag: this.remumber.remumber_flag,
									remumber_login_info: {
										username: this[ref].username,
										password: this[ref].password
									}
								})
							} else {
								this.$store.dispatch('remove_remumber')
							}
							this.$store.dispatch('update_userinfo', {
								userinfo: data.userinfo
							}).then(() => {
								this.login_actions.disabled = false
								let site = this.$store.getters.site
								if(site) {
									this.$router.push(`/${site.name}/private`)
								} else {
									this.$router.push('/')
								}
							})
							// 打开系统引导界面   判断是否需要显示
							this.checkSiteGuideShow(this.$store.getters.site.name,this.data.username);
						})
					}
				})
			},
			onRegister(ref) {
				this.$refs[ref].validate((valid) => {
					if(valid) {
						this.login_actions.disabled = true
						this.$http({
							url: '/user/login',
							methods: 'post',
							data: this[ref],
							fn: data => {
								this.login_actions.disabled = false
								this.$message.success('注册成功，请登录。')
								this.toggleStatus(false)
							},
							errFn: () => {
								this.login_actions.disabled = false
							},
							tokenFlag: true
						})
					}
				})
			},
			resetForm(ref) {
				this.$refs[ref].resetFields()
			},
			toggleStatus(type) {
				this.register = type
				if(this.register === true) {
					this.$set(this.data, 'repassword', '')
				} else {
					this.$delete(this.data, 'repassword')
				}
			},
      handleLoginOut() {
        this.$store.dispatch('remove_userinfo')
        sessionStorage.clear()
        let site = this.$store.getters.site
        this.$router.push(`/${site.name}/public`)
      },
      initDialogWelcome(guideData, siteName, userName) {
        let body = require('./view/welcome.vue')
        let title = '系统引导'
        let dlg = this
        let options = {
          title: title,
          width: '700px',
          body: body.default,
          data: {
            guideData: this.guideData,
            siteName: siteName,
            userName: userName
          },
          'before-close': function (done) {
            done()
          },
          buttons: [{
            text: '关闭',
            handle: function (options, dlg) {
              dlg.close()
            }
          }, {
            type: 'primary',
            text: '不再显示',
            handle: function (options, dlg) {
              let opt = {
                data: {
                  siteCode: options.data.siteName,
                  owner: options.data.userName
                }
              }
              //获取导引数据
              dlg.$api_site_saveSitePageHelpHide(opt).then(res => {
                if (res) {
                  dlg.close()
                }
              }).catch(err => {
                console.info(err)
              }).finally(() => {
              })
            }
          }]
        }
        this.$dialog(options)
      }, checkSiteGuideShow(siteName, userName) {
        let options = {
          data: {
            siteCode: siteName,
            owner: userName
          }
        }
        //获取导引数据
        this.$api_site_querySiteHelp(options).then(res => {
          if (res) {
            this.guideData = res
            if (res.length > 0) {
              this.initDialogWelcome(this.guideData, siteName, userName)
            }
          } else {
            console.log('不再显示')
          }
        }).catch(err => {
          console.info(err)
        }).finally(() => {
        })
      }, doNotRemindAgain(siteName, userName, options) {
        let opt = {
          data: {
            siteCode: siteName,
            owner: userName
          }
        }
        //获取导引数据
        this.$api_site_saveSitePageHelpHide(opt).then(res => {
          if (res) {
            dlg.close()
          }
        }).catch(err => {
          console.info(err)
        }).finally(() => {
        })
      }
    },
		created() {
		},
		mounted() {
			// 如果上次登录选择的是记住密码并登录成功，则会保存状态，用户名以及token
			if(this.remumber.remumber_flag === true) {
				this.data.username = this.remumber.remumber_login_info.username
				this.data.password = this.remumber.remumber_login_info.password
				this.$set(this.data, 'password', this.remumber.remumber_login_info.password)
			}
		}
	}
</script>

<style scoped>
	.widget {
		min-height: 100px;
	}

	.login-form-input {
		width:100%;
	}
	.el-button+.el-button{
		margin-left: 0;
	}
</style>
