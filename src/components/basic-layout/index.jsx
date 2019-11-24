import { Layout} from 'antd';
import React ,{Component} from 'react'
import LayoutSider from './sider/index'
import {withCheckLogin} from '../../containers/with-check-login/withchecklogin'
import HeaderMain from '../headermain/index'
const { Header, Content, Footer, Sider } = Layout;
@withCheckLogin
 class BaseLayout extends Component {
  state = {
    collapsed: false,
    isHidden:true
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ 
      collapsed,
      isHidden:!this.state.isHidden
     });
  };

  render() {
    const {isHidden} = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LayoutSider isHidden={isHidden}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <HeaderMain/>
          </Header>
          <Content style={{ margin: '40px 16px 0 16px' }}>
          <div style={{padding:24,background:"#ffff",minHeight:360}}>
            {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout