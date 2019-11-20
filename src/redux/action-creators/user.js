import reqLogin from '../../api/index'
import {
  GETUSERMESSAGE
} from '../action-types'

const getUser = (user) => ({
  type: GETUSERMESSAGE,
  data: user

})

export const getUserAsync = (username, password) => {
  return (dispatch) => {
    return reqLogin(username, password)
        .then((response) => {
          const action = getUser(response)
          dispatch(action)
        })
  }

}