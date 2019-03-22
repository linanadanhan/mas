import {gbs} from 'config'
export default function (to, from, next) {
  if (document.domain && !this.$store.getters.site) {
    let site = (to.params && to.params.site) ? to.params.site : gbs.default_site
    // 远程获取站点信息
    this.$api_site_siteInfo({
      data: {
        site: site,
        domain: document.domain
      },
      fn: (data) => {
        // 全局存储站点信息
        this.$store.dispatch('update_site', data)
        sessionStorage.setItem('customerCode', data.C_CUSTORMER_CODE || '')
        let type = this.$store.getters.userinfo ? 'private' : 'public'
        if (site !== data.name) {
          if (to.params && to.params.path) {
            next(`/${data.site}/${type}/${to.params.path}`)
          } else {
            next(`/${data.site}/${type}`)
          }
        } else {
          if (to.params && to.params.path) {
            next(`/${site}/${type}/${to.params.path}`)
          } else {
            next(`/${site}/${type}`)
          }
        }
      }
    })
  } else {
    next()
  }
}
