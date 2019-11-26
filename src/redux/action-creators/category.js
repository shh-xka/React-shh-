import {
  GETCATEGORY,
  ADDCATEGORY,
  UPDATECATEGORY,
  DELECATEGORY
} from '../action-types'
import {
  reqCategory,
  reqAddCategory,
  reqUpdateCategory,
  reqDeleCategory 

} from '../../api/index'



const getCategory = (category) => ({
  type: GETCATEGORY,
  data: category
})

const addCategory = (category) => ({
  type: ADDCATEGORY,
  data: category
})

const updateCategory = (category) => ({
  type: UPDATECATEGORY,
  data: category
})


const deleCategory = (category) => ({
  type: DELECATEGORY,
  data: category
})

export const getCategoryAsncy = () => {
  return (dispatch) => {
    return reqCategory()
      .then((response) => {
        const action = getCategory(response)
        dispatch(action)
      })
  }
}


export const addCategoryAsncy = (categoryName) => {
  return (dispatch) => {
    return reqAddCategory(categoryName)
      .then((response) => {
        const action = addCategory(response)
        dispatch(action)
      })
  }
}


export const updateCategoryAsncy = (categoryId, categoryName) => {
  return (dispatch) => {
    return reqUpdateCategory(categoryId, categoryName)
      .then((response) => {
        console.log(response)
        dispatch(updateCategory(response))
      })
  }
}

export const DeleCategoryAsncy = (categoryId) => {
  return (dispatch) => {
    return  reqDeleCategory (categoryId)
      .then((response) => {
        dispatch(deleCategory(response))
      })
  }
}