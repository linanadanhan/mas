/**
 * Created by sailengsi on 2017/5/10.
 */

export default {
  dialogs (state) {
    return state.dialogs
  },

  site (state) {
    return state.sites[state.site]
  },

  path (state) {
    return state.path
  },

  theme (state) {
    return state.sites[state.site][state.group + 'Theme']
  },

  editMode (state) {
    return state.pageEditMode
  },

  diyMode (state) {
    return state.pageDiyMode
  },

  confMode (state) {
    return state.pageConfMode
  },

  dragWidget (state) {
    return state.dragWidget
  },

  createdWidgets (state) {
    return state.createdWidgets
  },

  page (state) {
    if (state.maximized) {
      return state.maximized
    }
    return state.pageDatas[state.path]
  },

  pageComponents (state) {
    return state.pageComponents
  },

  topNav (state) {
    return state.topNav
  },

  navs (state) {
    return state.navs[state.site] ? state.navs[state.site][state.group] : null
  },

  subnavs (state) {
    return state.subnavs[state.topNav]
  },

  delWidgets (state) {
    return state.delWidgets
  }
}
