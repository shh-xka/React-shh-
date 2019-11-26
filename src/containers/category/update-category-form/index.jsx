import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types';

@Form.create()
class UpdatecategoryForm extends Component {
  static propTypes={
    categoryValue:PropTypes.string.isRequired
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log(this.props)
    const {categoryValue} = this.props
    return (
      <div>
        <Form  onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('categoryName', {
            rules: [
              {
                required: true,
                message: '请输入分类名称',
              },
            ],
            initialValue:categoryValue
          })(<Input  placeholder="请输入分类名称"/>)}
        </Form.Item>
        </Form>
        
      </div>
    )
  }
}

export default UpdatecategoryForm
