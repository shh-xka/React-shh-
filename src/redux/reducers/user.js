import {
  GETUSERMESSAGE,
  REMOVEUSERMESSAGE
} from '../action-types'
import {
  getItem
} from '../../utils/storage'
//只有在获取响应之后才会有token的值所以初始值必须是空对象
const values = getItem('user') || {}

export default function user(prevState = values, action) {
  switch (action.type) {
    case GETUSERMESSAGE:
      return action.data;
    case REMOVEUSERMESSAGE:
      return {}
    default:
      return prevState
  }
}