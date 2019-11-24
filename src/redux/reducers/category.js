import {GETCATEGORY} from '../action-types'
const init = [];

export default function category(prevState=init,action){
  switch(action.type){
    case GETCATEGORY:
      return action.data
    default:
      return prevState
  }

}