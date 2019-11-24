import React, { Component } from 'react'
import './index.less'
import {Button,Icon,Modal} from 'antd'
import {removeUser} from '../../redux/action-creators/user'
import {removeItem} from '../../utils/storage'
import {connect} from 'react-redux'
import menus  from '../../config/menus.js'
import screenfull from 'screenfull'
import {  withTranslation } from 'react-i18next';
import {withRouter } from 'react-router-dom'
import dayjs from 'dayjs'

@withTranslation()
@withRouter
@connect((state)=>({username:state.user.user.username}),{removeUser})
class HeaderMain extends Component {
  state={
    isFullScreen:false,
    pathname:'',
    title:'',
    isEnglish:this.props.i18n.language === 'en'? true : false,
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


  //用来控制显示是否切换中英文显示，以及中英文图标的显示
  //如果是中文的话就切换成英文，如果是英文就切换成中文
  changeLan=()=>{
      const isEnglish = !this.state.isEnglish
        this.setState({
        isEnglish
    })
    this.props.i18n.changeLanguage(isEnglish ?'en':'zh');
   
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
    const {title,isFullScreen,date,isEnglish } = this.state

    return (
      <div className='header-main'>
        <div className= 'header-main-top'>
          <Button size='small' onClick={this.toggleScreenfull} >
           <Icon type={ isFullScreen ? 'fullscreen' : 'fullscreen-exit'}/>
          </Button>
          <Button size='small' className='lang-btn ' onClick={this.changeLan}>
            {isEnglish === true ?"中文":"English"}
          </Button>
  <span>欢迎，{username}</span>
          <Button size='small' type='link' onClick={this.logout}>
            退&nbsp;出
          </Button>

        </div>
        <div className= 'header-main-bottom'>
         <h3>{this.props.t("layout.leftNav."+title)}</h3>
          <span>{date}</span>
        </div>

      </div>
    )
  }
}

export default HeaderMain



//国际化：中英文切换：
//1、npm react-i18n,修改public，在src里面增加i8n.js,在总的页面加上一个外部的包裹元素，给包裹元素加上一个spin
//2、引入高阶组件，引入t以及i8n，通过t给侧边列表title进行更换名称，来实现能够和public里面的translation进行匹配，一方面需要修改侧边栏的title还需要修改能够用的上menus这个配置项的地址
//index。js中的引入
//最后一步就是给按钮绑定click事件，来实现语言的切换，文字的切换显示
