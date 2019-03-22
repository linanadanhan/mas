/**
 * Created by shencq on 2017/12/15.
 */
import * as types from './mutations_types'
import Vue from 'vue'
import _ from 'underscore'

export default {
  [types.UPDATE_SITE] (state, site) {
    Vue.set(state.sites, site.name, site)
    state.site = site.name
  },

  [types.UPDATE_PAGE_GROUP] (state, {site, group}) {
    state.site = site
    state.group = group
  },

  [types.UPDATE_NAVS] (state, {navs, subNavs}) {
    if (!navs && !subNavs && state.navs[state.site]) { // 清除私有导航页面及子导航信息
      let privateNavs = state.navs[state.site]['private']
      Vue.set(state.navs[state.site], 'private', navs)
      if (privateNavs) {
        _.each(privateNavs, (nav) => {
          Vue.set(state.subnavs, nav.path, subNavs)
        })
      }
    }
    if (!state.navs[state.site]) {
      Vue.set(state.navs, state.site, {})
    }
    Vue.set(state.navs[state.site], state.group, navs)
    _.each(subNavs, (value, key) => {
      Vue.set(state.subnavs, key, value)
    })
  },

  [types.UPDATE_TOP_NAV] (state, path) {
    state.topNav = path
  },

  [types.UPDATE_PAGE] (state, page) {
    state.path = page.path
    Vue.set(state.pageDatas, page.path, page)
  },

  [types.ADD_PAGE_COMPONENT] (state, {name, type, mode, component}) {
    type += 's'
    if (mode) {
      if (!state.pageComponents[type][name]) {
        Vue.set(state.pageComponents[type], name, {})
      }
      Vue.set(state.pageComponents[type][name], mode, component)
    } else {
      Vue.set(state.pageComponents[type], name, component)
    }
  },

  [types.UPDATE_THEME] (state, theme) {
    Vue.set(state.sites[state.site], state.group + 'Theme', theme)
  },

  [types.UPDATE_LAYOUT] (state, {page, layout, portNum}) {
    Vue.set(page, 'layout', layout)
    let len = page.widgets.length
    // 以下方法即使未改变数组，也将触发对widgets的变更监听
    let widgets = page.widgets.splice(portNum, len - portNum)
    widgets = _.flatten(widgets)
    _.each(widgets, (widget, index) => {
      page.widgets[index % portNum].push(widget)
    })
  },

  [types.UPDATE_WIDGET] (state, {rootPage, page, i, j, widget, params}) {
    if (!page.widgets) {
      Vue.set(page, 'widgets', [])
    }
    let len = i + 1 - page.widgets.length
    for (let k = 0; k < len; k++) {
      page.widgets.push([])
    }
    page.widgets[i].splice(j, 0, widget)
    if (params) {
      rootPage.widgetParams[widget.id] = params
    }
  },

  [types.UPDATE_WIDGET_PARAMS] (state, {rootPage, widgetId, params}) {
    // rootPage.widgetParams[widgetId] = params
    Vue.set(rootPage.widgetParams, widgetId, params)
  },

  [types.UPDATE_WIDGET_MAXIMIZED] (state, widget) {
    let page = state.pageDatas[state.path]
    let maxpage = {
      mode: page.mode,
      title: page.title,
      path: page.path,
      maximized: true,
      widgetParams: page.widgetParams,
      layout: 'default',
      widgets: [[widget]]
    }
    state.maximized = maxpage
  },

  [types.UPDATE_WIDGET_ORIGINAL] (state) {
    if (state.maximized) {
      state.maximized = null
    }
  },

  [types.UPDATE_DIALOG_CONTENT] (state, dialog) {
    if (dialog) {
      dialog.visible = true
      dialog.width = dialog.width || '640px'
      dialog.top = dialog.top || '5%'
      state.dialogs.push(dialog)
    } else {
      state.dialogs.pop()
    }
  },

  [types.CLEAR_DIALOG_CONTENT] (state) {
    state.dialogs = []
  },

  [types.UPDATE_PAGE_EDIT_MODE] (state, flag) {
    state.pageEditMode = flag
  },

  [types.UPDATE_PAGE_DIY_MODE] (state, flag) {
    state.pageDiyMode = flag
  },

  [types.UPDATE_PAGE_CONF_MODE] (state, flag) {
    state.pageConfMode = flag
  },

  [types.UPDATE_DRAG_WIDGET] (state, widget) {
    state.dragWidget = widget
  },

  [types.UPDATE_WIDGET_CREATED] (state, widgetId) {
    if (state.createdWidgets[widgetId] > 0) {
      state.createdWidgets[widgetId] += 1
    } else {
      Vue.set(state.createdWidgets, widgetId, 1)
    }
  },

  [types.UPDATE_WIDGET_DESTROYED] (state, widgetId) {
    if (state.createdWidgets[widgetId] > 1) {
      state.createdWidgets[widgetId] -= 1
    } else {
      Vue.delete(state.createdWidgets, widgetId)
    }
  },

  [types.UPDATE_WIDGET_DELETE] (state, widgetId) {
    if (widgetId === null) {
      for (let k in state.delWidgets) {
        Vue.delete(state.delWidgets, k)
      }
    } else {
      Vue.set(state.delWidgets, widgetId, 1)
    }
  }
}
