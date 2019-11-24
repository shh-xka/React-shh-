import React, { Component } from 'react'
import { Card,Table,Button,Icon } from 'antd';
import {connect} from 'react-redux'
import {getCategoryAsncy} from '../../redux/action-creators/category'

@connect((state)=>({category:state.category}),{getCategoryAsncy})
 class Category extends Component {
   componentDidMount(){
     this.props.getCategoryAsncy()
   }
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render:()=>{
        return <div>
          <Button type='link'>修改分类</Button>
          <Button type='link'>删除分类</Button>
        </div>
      } ,
    },
  
  ];
  
  data=[
    {
      "_id": "5c2ed631f352726338607046",
      "name": "分类001",
    },
    {
      "_id": "5c2ed647f352726338607047",
      "name": "分类2",
    },
    {
      "_id": "5c2ed64cf352726338607048",
      "name": "1分类3",
    }
  ]
  render() {
    const {category} = this.props
    return (
      <div>
        <Card
         title="分类列表" 
         extra={<Button type="primary"><Icon type="plus" />分类列表</Button>}> 
          <Table
            columns={this.columns}
            dataSource={category}
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              defaultPageSize: 3
          }}
            bordered
          />
        </Card>
        
      </div>
    )
  }
}

export default Category
