import Mock from 'mockjs'
import pages from './pages'

const pageMap = {
  '/web/public/index': pages.Home,
  '/web/public/blank': pages.Blank,

  '/web/private/index': pages.Home,
  '/web/private/blank': pages.Blank,
  '/web/private/appfactory/form/browser': pages.FormBrowser,
  '/web/private/appfactory/form/designer': pages.FormDesigner,
  '/web/private/appfactory/table/browser': pages.TableBrowser,
  '/web/private/appfactory/table/designer': pages.TableDesigner,
  '/web/private/appfactory/tree/browser': pages.TreeBrowser,
  '/web/private/appfactory/tree/designer': pages.TreeDesigner,
  '/web/private/appfactory/winw': pages.WidgetInWidget
}

Mock.mock(/site\/pageInfo/, function (option) {
  let body = JSON.parse(option.body || '')
  let page = pageMap[body.path]
  return page || pages.random()
})
