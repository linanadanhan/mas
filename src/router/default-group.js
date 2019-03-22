export default function (to, from, next) {
  // 设置页面组名称
  if (to.params && to.params.type) {
    this.$store.dispatch('update_page_group', {
      site: to.params.site,
      group: to.params.type
    }).then(() => next())
  } else {
    next()
  }
}
