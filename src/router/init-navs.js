import _ from 'underscore'

function createSubNavs (navs, subNavs) {
  _.each(navs, function (item) {
    if (item.children && item.children.length > 0) {
      if (item.submenu) {
        createSubNavs(item.children, subNavs)
      } else {
        subNavs[item.path] = item.children
      }
    }
  })
}

function getTopNav (path, navs) {
  for (let i = 0; i < navs.length; i++) {
    let item = navs[i]
    if (item.hidden) {
      // 隐藏项
    } else if (!item.submenu || !item.children || item.children.length === 0) {
      // 菜单项
      if (item.path) {
        if (path === item.path) {
          return item.path
        } else {
          let append = item.path.charAt(item.path.length - 1) === '/' ? '' : '/'
          if (path.indexOf(item.path + append) === 0) {
            return item.path
          }
        }
      }
    } else {
      // 子菜单
      let nav = getTopNav(path, item.children)
      if (nav) {
        return nav
      }
    }
  }
}

export default function (to, from, next) {
  // 设置页面组名称
  if (to.params && to.params.type) {
    if (!this.$store.getters.navs) {
      // 初始化页面组菜单
      this.$api_site_pages({
        data: {
          site: `/${to.params.site}/${to.params.type}`
        }
      }).then(navs => {
        let subNavs = {}
        createSubNavs(navs, subNavs)
        this.$store.dispatch('update_navs', {
          navs,
          subNavs
        }).then(() => {
          // 初始化当前菜单
          if (to.params.path) {
            this.$store.dispatch('update_top_nav', getTopNav(to.path, navs)).then(next)
          } else {
            next()
          }
        })
      })
    } else {
      // 已经有菜单，只需初始化当前菜单
      if (to.params.path) {
        this.$store.dispatch('update_top_nav', getTopNav(to.path, this.$store.getters.navs)).then(next)
      } else {
        next()
      }
    }
  } else {
    next()
  }
}
