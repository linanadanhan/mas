function getFirstItem (navs) {
  for (let i = 0; i < navs.length; i++) {
    let item = navs[i]
    if (item.hidden) {
      // 隐藏项
      continue
    } else if (!item.submenu || !item.children || item.children.length === 0) {
      // 菜单项
      if (item.path) {
        return item.path
      } else {
        continue
      }
    } else {
      // 子菜单
      return getFirstItem(item.children)
    }
  }
}
export default function (to, from, next) {
  let subnavs = this.$store.getters.subnavs
  if (to.path === this.$store.getters.topNav && subnavs) {
    next(getFirstItem(subnavs))
  } else if (to.params && to.params.type && !to.params.path) {
    let navs = this.$store.getters.navs
    if (navs) {
      let path = getFirstItem(navs)
      this.$store.dispatch('update_top_nav', path).then(() => next(path))
    } else {
      next()
    }
  } else {
    next()
  }
}
