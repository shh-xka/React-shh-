import {
  GETUSERMESSAGE
} from '../action-types'
export default function user(prevState = '', action) {
  switch (action.type) {
    case GETUSERMESSAGE:
      return action.data;
    default:
      return prevState
  }
}