import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import React,{Component} from 'react'
export const withCheckLogin = (WrappedComponent)=>{
  // return connect(
  //   (state)=>({token:state.user.token}),
  //   null
  // )(
  //  class extends Component {
  //    static displayName = `checkLogin(${WrappedComponent.displayName||WrappedComponent.name||'Component'})`
  //     render(){
  //       const {token, location,...rest } = this.props
  //       if(location.pathname === '/login'){
  //         if(token){
  //          return <Redirect to='/'/>
  //         }
  //       }else{
  //         if(!token){
  //          return <Redirect to='/login'/>
  //         }
  //       }
  //       return <WrappedComponent {...rest} location={location}/>
  //     }
  //   }
  // )

  return connect(
    (state)=>({user:state.user}),
    null
  )(
  class extends Component{
    render(){
      const {location,...reset} = this.props
      const token = this.props.user.token
      if(location.pathname === '/login'){
        if(token){
         return <Redirect to = '/'/>
        }
      }else{
        if(!token){
        return  <Redirect to = '/login'/>
        }

      }
      return <WrappedComponent {...reset} location = {location}/>
    }
  }
  )

}
//总结：在高阶组件中会拥有路由的三大属性history、location、map（this.props.history.push(这个是在非render里面实现的重定向要是再render里面的重定向就是Redirect路由组件)）
//在包括组件的高阶组件当中，高阶组件包括了三个路由属性之后，里面的子组件就不能获取路由属性，所以需要通过高阶组件传入