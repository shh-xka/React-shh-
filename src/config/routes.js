import Home from "../components/home";
import Login from "../containers/login";
import NotMatch from "../components/not-match";
import Product from "../components/product"
import category  from '../containers/category'
import AddProductForm  from '../components/product/addproductform/index'



const authRoutes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/category",
    component: category ,
    exact: true
  },
  {
    path: "/product",
    component: Product ,
    exact: true
  },

  {
    path: "/product/add",
    component: AddProductForm  ,
    exact: true
  },

  {
    component: NotMatch
  }
]

const noAuthRoutes = [
  {
    path: "/login",
    component: Login,
    exact: true
  }
]

export  {
  authRoutes,
  noAuthRoutes
}