import React, { Component } from 'react'
import {Form,Select,Card,Input,Icon,InputNumber,Button} from 'antd'
import {getCategoryAsncy} from '../../../redux/action-creators/category.js'
import {connect} from 'react-redux'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './index.less'

@connect((state)=>({category:state.category}) ,{getCategoryAsncy})
@Form.create()
class AddProductForm extends Component {
  state = {
}


   componentDidMount(){
      if(!this.props.category.length){
        this.props.getCategoryAsncy()
      }
   }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Card title={
        <div>
        <Icon type="arrow-left"/>
        <span>添加商品</span>
      </div>
    } >
      
      <Form  labelCol={{ span:3 }}
          wrapperCol={{ span: 8 }}  onSubmit={this.handleSubmit}>
        <Form.Item label="商品名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入你的商品名称',
              },
            ],
          })(<Input placeholder="请输入你的商品名称"/>)}
        </Form.Item>
        <Form.Item label="商品描述">
          {getFieldDecorator('desc', {
            rules: [
              {
                required: true,
                message: '请输入你的商品描述',
              },
            ],
          })(<Input placeholder="请输入你的商品描述"/>)}
        </Form.Item>
        <Form.Item label="商品分类">
          {getFieldDecorator('categoryId', {
            rules: [
              {
                required: true,
                message: '请输入你的商品分类',
              },
            ],
          })(
          <Select placeholder="请选择商品分类">
            {
              this.props.category.map((categ)=>{
                return <Select.Option key={categ._id} value={categ._id}>
                  {categ.name}
                  </Select.Option>
                
              })
              
            }
          
          </Select>)}
        </Form.Item>
        <Form.Item label="商品价格">
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: '请输入你的商品价格',
              },
            ],
          })(<InputNumber min={0} max={100}/>)}
        </Form.Item>
        <Form.Item label="商品详情" wrapperCol={{span:18}}>
          {getFieldDecorator('editorState', {
            rules: [
              {
                required: true,
                message: '请输入你的商品详情',
              },
            ],
          })(<BraftEditor 
              placeholder="请输入你的商品详情"
              className="brafteditor"
          />)}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">提交</Button>
        </Form.Item>

      </Form>
      </Card>
      </div>
    )
  }
}

export default AddProductForm
