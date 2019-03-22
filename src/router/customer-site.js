
export default function (to, from, next) {
  if (document.domain && to.path === '/') {
    // 远程获取域名对应站点信息
    this.$api_site_getSiteInfoByDomain({
      data: {
        domain: document.domain
      },
      fn: (data) => {
        if (data && data.C_SITE_CODE) {
          // 获取站点信息并跳转对应站点
          sessionStorage.setItem('customerCode', data.C_CUSTORMER_CODE)
          next(`/${data.C_SITE_CODE}`)
        } else {
          // 站点不存在
          this.$router.push('/noSite')
        }
      }
    })
  } else {
    next()
  }
}
