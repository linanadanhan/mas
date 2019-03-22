import Mock from 'mockjs'
import Private from './navs-private.js'
import Public from './navs-public.js'

Mock.mock(/site\/pages/, function (options) {
  if (/\/private/.test(options.body)) {
    return Mock.mock(Private)
  } else {
    return Mock.mock(Public)
  }
})
