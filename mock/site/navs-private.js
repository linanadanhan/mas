export default {
  'status': 200,
  'data': [{
    title: '首页',
    path: '/web/private/index',
    iconCls: 'icon-liebiao'
  }, {
    title: '公文管理',
    path: '/web/private/gwgl',
    iconCls: 'icon-user',
    folder: true,
    hidden: false,
    submenu: true,
    children: [{
      title: '公文流转',
      path: '/web/private/gwgl/gwlz',
      folder: true,
      hidden: false,
      submenu: false,
      children: [{
        title: '厅发文',
        path: '/web/private/gwgl/gwlz/tfw',
        folder: true,
        hidden: false,
        submenu: true,
        children: [{
          title: '待办',
          path: '/web/private/gwgl/gwlz/tfw/db',
          badgeNames: ['test.a']
        }, {
          title: '已办',
          path: '/web/private/gwgl/gwlz/tfw/yb',
          badgeNames: ['test.b']
        }]
      }, {
        title: '交办件',
        path: '/web/private/gwgl/gwlz/jbj',
        badgeNames: ['test.a', 'test.b']
      }]
    }, {
      title: '公文查阅',
      path: '/web/private/gwgl/gwcy'
    }]
  }, {
    title: '档案管理',
    path: '/web/private/dagl',
    folder: true,
    hidden: false,
    submenu: true,
    children: [{
      title: '档案管理',
      path: '/web/private/dagl/dagl'
    }, {
      title: '档案查阅',
      path: '/web/private/dagl/dacy'
    }]
  }, {
    title: '应用工厂',
    path: '/web/private/appfactory',
    folder: true,
    hidden: false,
    submenu: false,
    children: [{
      title: '表单部件',
      iconCls: 'icon-icon-mylibrarybooks',
      path: '/web/private/appfactory/form',
      folder: true,
      hidden: false,
      submenu: true,
      children: [{
        iconCls: 'icon-shixiang',
        title: '表单浏览器',
        path: '/web/private/appfactory/form/browser'
      }, {
        iconCls: 'icon-icon-noteadd',
        title: '表单设计器',
        path: '/web/private/appfactory/form/designer'
      }]
    }, {
      title: '表格部件',
      iconCls: '',
      path: '/web/private/appfactory/table',
      folder: true,
      hidden: false,
      submenu: true,
      children: [{
        title: '表格浏览器',
        path: '/web/private/appfactory/table/browser'
      }, {
        title: '表格设计器',
        path: '/web/private/appfactory/table/designer'
      }]
    }, {
      title: '树部件',
      iconCls: 'icon-liucheng',
      path: '/web/private/appfactory/tree',
      folder: true,
      hidden: false,
      submenu: true,
      children: [{
        title: '树部件浏览器',
        iconCls: 'icon-sortascending',
        path: '/web/private/appfactory/tree/browser'
      }, {
        title: '树部件设计器',
        iconCls: 'icon-icon-signpost',
        path: '/web/private/appfactory/tree/designer'
      }]
    }, {
      title: 'Widget in Widget',
      iconCls: 'icon-mokuai',
      path: '/web/private/appfactory/winw'
    }]
  }, {
    title: '系统管理',
    path: '/web/private/admin',
    folder: true,
    hidden: true,
    submenu: false,
    children: [{
      title: '用户管理',
      path: '/web/private/admin/yhgl'
    }, {
      title: '站点管理',
      path: '/web/private/admin/zdgl'
    }]
  }, {
    title: '设置',
    path: '/web/private/setting'
  }]
}
