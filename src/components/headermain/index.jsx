import React, { Component } from 'react'
import './index.less'
import {Button,Icon,Modal} from 'antd'
import {removeUser} from '../../redux/action-creators/user'
import {removeItem} from '../../utils/storage'
import {connect} from 'react-redux'
import menus  from '../../config/menus.js'
import screenfull from 'screenfull'
import {withRouter } from 'react-router-dom'
import dayjs from 'dayjs'

@withRouter
@connect((state)=>({username:state.user.user.username}),{removeUser})
class HeaderMain extends Component {
  state={
    isFullScreen:false,
    pathname:'',
    title:'',
    date:dayjs().format("YYYY/MM/DD HH:mm:ss")
  }

  logout=()=>{
    Modal.confirm({
      title: '你确定退出登录吗',
      onOk:()=> {
        removeItem('user');
        this.props.removeUser()
        this.props.history.replace('/login')
      },
      onCancel() {

      },
    });
  }
  toggleScreenfull=()=>{
    screenfull.toggle();
  }

  change=()=>{
    this.setState({
      isFullScreen:!this.state.isFullScreen
    })
  }


  //为什么要把图标的切换放在放在生命周期函数里面
  componentDidMount(){
    screenfull.on('change',this.change )
  }

  componentWillUnmount(){
    screenfull.off('change',this.change)
  }
  static getDerivedStateFromProps(nextProps,prevState){
    const {pathname} = nextProps.location
    if(pathname === prevState.pathname){
      return prevState
    }

   let title = ''
    for(var index=0;index<menus.length;index++){
      const menu = menus[index]
      if(menu.children){
        const cmenu= menu.children.find((cmenu)=>cmenu.path === pathname)
        if(cmenu){
          title = cmenu.title
          break;
        }

      }else{
        if(menu.path === pathname){
          title = menu.title;
          break;
        }

      }
    }
      //这里为什么将pathname以及title的值返回出去就能够在状态里面获取？？
    return{
      pathname,
      title
    }
  }

  render() {
    const {username} = this.props
    const {title,isFullScreen,date } = this.state

    return (
      <div className='header-main'>
        <div className= 'header-main-top'>
          <Button size='small' onClick={this.toggleScreenfull} >
           <Icon type={ isFullScreen ? 'fullscreen' : 'fullscreen-exit'}/>
          </Button>
          <Button size='small' className='lang-btn '>
            English
          </Button>
  <span>欢迎，{username}</span>
          <Button size='small' type='link' onClick={this.logout}>
            退&nbsp;出
          </Button>

        </div>
        <div className= 'header-main-bottom'>
         <h3>{title}</h3>
          <span>{date}</span>
        </div>

      </div>
    )
  }
}

export default HeaderMain
