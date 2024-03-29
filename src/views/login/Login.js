/**
 * Created by sailengsi on 2017/5/11.
 */
import css from '!css-loader!sass-loader!../../assets/scss/elementDefault.scss'
// import loginImg from './login.jpg'

var qs = require('qs')
export default {
  name: 'login',
  props: ['dialog'],
  data () {
    return {
      // winSize: {
      //   width: '',
      //   height: ''
      //   // backgroundImage: 'url(' + loginImg + ')'
      // },
      // formOffset: {
      //   position: 'absolute',
      //   left: '',
      //   top: ''
      // },

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
            if (value === '') {
              callback(new Error('请输入用户名'))
            } else {
              if (/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
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
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
                callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'))
              } else {
                if (this.register === true) {
                  if (this.data.repassword !== '') {
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
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.data.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  apis: [{
    name: 'login',
    path: 'user/login',
    type: 'get'
  }, {
    name: 'logout',
    path: 'user/logout',
    type: 'get'
  }],
  methods: {
    // setSize () {
    //   this.$jquery().then(jquery => {
    //     if (this.dialog) {
    //       this.winSize.background = '#fff'
    //       this.winSize.width = this.dialog.options.width - 30
    //       this.winSize.height = this.dialog.options.height
    //       this.formOffset.left = (parseInt(this.dialog.options.width) / 2 - 195) + 'px'
    //       this.formOffset.top = (parseInt(this.dialog.options.height) / 2 - 180) + 'px'
    //     } else {
    //       // this.winSize.background = 'pink'
    //       this.winSize.width = jquery(window).width() + 'px'
    //       this.winSize.height = jquery(window).height() + 'px'

    //       this.formOffset.left = (parseInt(this.winSize.width) / 2 - 240) + 'px'
    //       this.formOffset.top = (parseInt(this.winSize.height) / 2 - 260) + 'px'
    //     }
    //   })
    // },

    onLogin (ref, type) {
      if (type && this.register === true) {
        this.$message.error('请输入确认密码')
        return
      }
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.login_actions.disabled = true
          // 如果记住密码，提交的信息包括真实token，密码则是假的
          // 服务端登录验证优先级：用户名必须，其次先取token，不存在时再取密码
          var params = this[ref]
          params.customerCode = sessionStorage.getItem('customerCode')
          params.front = '1'
          this.$api_user_login({
            data: qs.stringify(params),
            method: 'post',
            beforeErrorHandle: () => {
              this.login_actions.disabled = false
              return true
            },
            tokenFlag: true
          }).then(data => {
            let site = this.$store.getters.site
            this.$store.dispatch('update_userinfo', {
              userinfo: data.userinfo
            }).then(() => {
              if (site) {
                this.$router.push(`/${site.name}/private`)
              } else {
                this.$router.push('/')
              }
            })
          }).finally(() => {
            // 登录成功之后，验证是否记住密码，如果记住密码，本地保存记住信息
            // 如果没有记住，就初始化本地记住信息
            if (this.remumber.remumber_flag === true) {
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
            this.login_actions.disabled = false
            if (this.dialog) {
              this.dialog.visible = false
            }
          })
        }
      })
    },

    onRegister (ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
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

    resetForm (ref) {
//    this.$refs[ref].resetFields()
      if (this.dialog) {
        this.dialog.visible = false
      }
      let site = this.$store.getters.site
      this.$router.push(`/${site.name}/public`)
    },

    toggleStatus (type) {
      this.register = type
      if (this.register === true) {
        this.$set(this.data, 'repassword', '')
      } else {
        this.$delete(this.data, 'repassword')
      }
    }
  },
  created () {
    // this.setSize()
  },
  mounted () {
    // this.$jquery().then($ => {
    //   $(window).resize(() => {
    //     this.setSize()
    //   })
    // })

    // this.toggleStatus(true);
    // console.log(this.remumber);
    document.getElementById('_theme_').innerHTML = css.toString()

    // 如果上次登录选择的是记住密码并登录成功，则会保存状态，用户名以及token
    if (this.remumber.remumber_flag === true) {
      this.data.username = this.remumber.remumber_login_info.username
      this.data.password = this.remumber.remumber_login_info.password
      this.$set(this.data, 'password', this.remumber.remumber_login_info.password)
    }
  },
  beforeDestroy () {
    this.$jquery().then($ => {
      $(window).unbind('resize')
    })
  }
}
