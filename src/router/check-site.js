export default function (to, from, next) {
  if (to.params && to.params.site) {
    // 校验站点信息（该站点是否对应域名站点，对应next，不对应再判断是否属于同一租户，若属于则
    // 返回站点的域名，若不属于则注销登录信息并重新跳转）
    this.$api_site_checkSite({
      data: {
        site: to.params.site,
        domain: document.domain
      },
      fn: (data) => {
        console.info(data)
        // this.$store.dispatch('update_site', data)
        next()
      }
    })
  } else {
    next()
  }
}
