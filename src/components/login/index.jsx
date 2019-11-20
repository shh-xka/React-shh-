import React, { Component } from 'react'
import logo from './logo.png'
import { Form, Icon, Input, Button, message} from 'antd';
import axios from 'axios'
import './index.less'

@Form.create()
 class Login extends Component {
  //自定义表单的校验
  validator=(rule, value, callback)=>{
    console.log(rule)
    console.log(value)
    const name = rule.field === "username"?"用户名":"密码"
    if(!value){
      callback(`${name}不能为空`)
    }else if(value.length <4){
      callback(`${name}最小长度不能小于4`)
    }else if(value.length > 13){
      callback(`${name}最大长度不能大于13`)
    }else{
      callback()
    }

  }

  handleSubmit=(e)=>{
    const {form} = this.props
      e.preventDefault();
     form.validateFields((errors, values)=>{
          if(!errors){
            axios.post("http://localhost:5000/api/login",values)
            .then((response)=>{
              console.log(response)
              if(response.data.status === 0){
                this.props.history.push('/')
              }else{
                message.error(response.data.msg)
                form.resetFields(["password"]);
              }
            })
            .catch((err)=>{
              message.error("网络故障")
             form.resetFields(["password"]);
            })
          }
      })
  }
 
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={ logo} alt="1"/>
          <h1>React项目：管理登录系统(shh)</h1>
        </header>
        <section className="login-section">
          <h3>用户登录系统</h3>
        <Form className="login-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules:[{
                // {
                //  required: true,
                //   message: '请输入你的用户名!' 
                // },
                // {
                //   max:13,
                //   message:"最长不能超过13"
                // },
                // {
                //   min:4,
                //   message:"最小不能低于4"
                // }
               validator : this.validator

            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              className="login-input"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              //   { 
              //     required: true, 
              //     message: '请输入你的密码!'
              //  },
              //  {
              //    pattern:/\w/,
              //    message:'内容必须是数字、字母、或者下划线'
              //  },
              //  {
              //   max:13,
              //   message:"最长不能超过13"
              // },
              // {
              //   min:4,
              //   message:"最小不能低于4"
              // }
              validator:this.validator

            }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              className="login-input"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"  className="login-btn" >
           登录
          </Button>
        </Form.Item>
      </Form>
        </section>
        
      </div>
    )
  }
}




export default Login
