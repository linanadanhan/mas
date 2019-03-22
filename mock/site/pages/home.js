import random from './random'
import { object } from 'utils'

const data = object.deepcopy(random())
data.data.mode = 'maximum'
export default data
