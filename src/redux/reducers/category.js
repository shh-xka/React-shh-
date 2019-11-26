import {
  GETCATEGORY,
  ADDCATEGORY,
  UPDATECATEGORY,
  DELECATEGORY
} from '../action-types'
const init = [];

export default function category(prevState = init, action) {
  switch (action.type) {
    case GETCATEGORY:
      return action.data
    case ADDCATEGORY:
      return [...prevState, action.data]
    case UPDATECATEGORY:
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          return action.data
        }
        return category;
      })

    case DELECATEGORY:
      return prevState.filter((category) => category._id !== action.data)

    default:
      return prevState
  }

}