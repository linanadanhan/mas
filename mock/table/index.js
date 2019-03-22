import Mock from 'mockjs'
import Config from './config'
import Data from './data'
Mock.mock(/table\/getConfig/, Config)
Mock.mock(/table\/getData/, Data)
