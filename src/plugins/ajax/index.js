import Vue from 'vue'
import axios from 'axios'
import Ajax from './ajax.js'

// 导入封装的回调函数
import {
  gbs
} from 'config/'

// 动态设置本地和线上接口域名
axios.defaults.baseURL = gbs.api_host

Vue.use(Ajax, { axios, gbs })
