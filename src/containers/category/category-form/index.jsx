import React, { Component } from 'react'
import {Form,Input} from 'antd'

@Form.create()
class CategoryForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form  onSubmit={this.handleSubmit}>
        <Form.Item label="品类名称">
          {getFieldDecorator('categoryName', {
            rules: [
              {
                required: true,
                message: '请输入分类名称',
              },
            ],
          })(<Input  placeholder="请输入分类名称"/>)}
        </Form.Item>
        </Form>
        
      </div>
    )
  }
}

export default CategoryForm
