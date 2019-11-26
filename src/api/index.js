import axiosInstance from './request'

export const reqLogin = (username, password) => {
  return axiosInstance({
    method: 'POST',
    url: '/login',
    data: {
      username,
      password
    },
  })
}


export const reqCategory = () => {
  return axiosInstance({
    method: 'GET',
    url: '/category/get',
  })
}

export const reqAddCategory = (categoryName) => {
  return axiosInstance({
    method: 'POST',
    url: '/category/add',
    data:{
      categoryName
    }
  })
}

export const reqUpdateCategory = (categoryId,categoryName) => {
  return axiosInstance({
    method: 'POST',
    url: '/category/update',
    data:{
      categoryId,
      categoryName
    }
  })
}


export const reqDeleCategory = (categoryId) => {
  return axiosInstance({
    method: 'POST',
    url: '/category/delete',
    data:{
      categoryId
      
    }
  })
}


export const getProductCategory = (pageNum,pageSize) => {
  return axiosInstance({
    method: 'GET',
    url: '/product/list',
    params:{
      pageNum,
      pageSize
      
    }
  })
}






