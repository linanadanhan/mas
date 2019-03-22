import Mock from 'mockjs'
import organization from './organization'
import group from './group'
import post from './post'
import role from './role'

Mock.mock(/selPerson\/getDicItemListByDicKey/, {
  status: 200,
  data: ''
})

Mock.mock(/person\/organization/, organization)

Mock.mock(/person\/group/, group)

Mock.mock(/person\/post/, post)

Mock.mock(/person\/role/, role)
