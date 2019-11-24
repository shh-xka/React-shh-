import {GETCATEGORY} from '../action-types'
import {reqCategory} from '../../api/index'
const getCategory=(categorys)=>({
  type:GETCATEGORY,
  data:categorys
})
export const getCategoryAsncy=()=>{
  return (dispatch)=>{
      return reqCategory()
              .then((response)=>{
                const action = getCategory(response)
                dispatch(action)
              })
  }
}
