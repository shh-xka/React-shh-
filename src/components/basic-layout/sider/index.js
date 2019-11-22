import React, { Component } from 'react'
import logo from '../../../assets/logo.png'
import './index.less'
import menus from '../../../config/menus'
import { Menu, Icon } from 'antd';
import {Link,withRouter} from 'react-router-dom'
const { SubMenu } = Menu;

@withRouter
 class LayoutSider extends Component {
  state={
    menus:[]
  }

  creatMenus=(menus)=>{
    return  menus.map((menu)=>{
      if(menu.children){
        return  <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.icon} />
              
              <span>{menu.title}</span>
            </span>
          }
        >
        {menu.children.map((menu)=>{
          return this.creatCmenus(menu)
        })}
      </SubMenu> 
      }else{
        return this.creatCmenus(menu)
      }
    })
  }

  creatCmenus =(menu)=>{
    return <Menu.Item key={menu.path}>
      <Link to={menu.path}>
     <Icon type={menu.icon} />
     <span>{menu.title}</span>
     </Link>
    </Menu.Item>
   }

   findMenus=(menus,pathname)=>{
     for(var index = 0;index<menus.length;index++){
      const menu = menus[index]
      if(menu.children){
        //获取能够得到路径的孙子元素
        const cmenu = menu.children.find((cmenu)=>cmenu.path === pathname)
        if(cmenu){
          return menu.path
        }
      }
    }
   }

  componentDidMount(){
    this.setState({
      menus:this.creatMenus(menus)
    })
  }



  render() {
    const {pathname} = this.props.location
     const pathName = this.findMenus(menus,pathname)
   return (
      <div>
      <div className="layout-logo" >
            <img src={logo} alt="logo"/>
            <h1>尚硅谷(shh)</h1>
     </div>
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[pathName]} mode="inline">
           {this.state.menus}
     </Menu>
    </div>
    )
  }
}

export default LayoutSider