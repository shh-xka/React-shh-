import React, { Component,Suspense } from 'react'
import {authRoutes,noAuthRoutes} from './config/routes'
import {Route ,Switch } from 'react-router-dom'
import { Router} from 'react-router'
import history from './utils/history.js'
import { Spin } from 'antd';
// import {createBrowserHistory} from 'history'
import BaseLayout from './components/basic-layout'
import './index.less'

//  const history = createBrowserHistory()
 export default class App extends Component {
  render() {

    return (
      <Suspense fallback={ <Spin size="small"  className="spin-c"/>}>
      <Router history={history}>
        <Switch>
          {
            noAuthRoutes.map((route,index)=>{
              return <Route {...route} key={index} />
            })
          }
          <BaseLayout>
            <Switch>
              {
                authRoutes.map((route,index)=>{
                  return <Route {...route} key={index}/>
                })
              }
            </Switch>
          </BaseLayout>
        </Switch>
      </Router>
      </Suspense>
    )
  }
}


