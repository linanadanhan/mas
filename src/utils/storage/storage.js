import {
  gbs
} from 'config/'

class Storage {
  constructor () {
    this.storage = window.sessionStorage
    this.prefix = gbs.db_prefix
  }

  set (key, value, fn) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
    }

    this.storage.setItem(this.prefix + key, value)

    fn && fn()
  }

  get (key, fn) {
    if (!key) {
      throw new Error('没有找到key。')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。')
    }
    var value = this.storage.getItem(this.prefix + key)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
      }
    }

    return value
  }

  remove (key) {
    this.storage.removeItem(this.prefix + key)
  }
}

export default new Storage()
