var qs = require('qs')
export default function (to, from, next) {
  if (to.query.hasOwnProperty('token')) {
    let params = {jwt_auth: to.query.token, front: '1'}
    console.info(params)
    this.$api_user_login({
      data: qs.stringify(params),
      method: 'post',
      beforeErrorHandle: () => {
        return true
      },
      tokenFlag: true
    }).then(data => {
      console.info(data)
      this.$store.dispatch('update_userinfo', {
        userinfo: data.userinfo
      }).then(() => {
        next({ path: to.path })
      })
    })
  } else {
    next()
  }
}
