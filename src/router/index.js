/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue'
import Router from 'vue-router'
import filters from './filters'
import _ from 'underscore'

Vue.use(Router)

// import { Home } from 'layout/'
import { Login, Page, NoPage, NoSite, NotFound } from 'views/'

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/noPage',
      name: 'noPage',
      component: NoPage
    }, {
      path: '/noSite',
      name: 'noSite',
      component: NoSite
    }, {
      path: '/notFound',
      name: 'notFound',
      component: NotFound
    }, {
      path: '/:site',
      name: 'site'
    }, {
      path: '/:site/:type(public|private)/:path*',
      name: 'page',
      component: Page
    }
  ]
})
_.each(filters, (filter) => {
  console.log(filter)
  router.beforeEach((to, from, next) => {
    filter.call(router.app, to, from, next)
  })
})

export default router
