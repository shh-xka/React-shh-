import React, { Component } from 'react'
import {Table,Card,Select,Button,Input,Icon} from 'antd'
import {getProductCategory} from '../../api/index'



export default class Product extends Component {
  state={
    products:[],
    total:0

  }
  
  addProduct=()=>{
    this.props.history.push("/product/add")
  }

  getProduct=async(pageNum,pageSize)=>{
    const result = await getProductCategory(pageNum,pageSize)
    console.log(result)
    this.setState({
      products:result.list,
      total:result.total
    })


    
  }

  componentDidMount(){
    this.getProduct(1,3)
  }

  
 columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render:()=>{
      return(
        <div>
        <Button size="small" type="primary">上架</Button>
        已下架
      </div>
      )
    }
  },
  {
    title: '操作',
    render:()=>{
      return(
        <div>
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
        </div>
      )
    }
  },
];




  render() {
    const {products,total} = this.state
    return (
      <div>
    <Card title={
      <div>
        <Select value={1}>
          <Select.Option value={1}>根据商品名称</Select.Option>
          <Select.Option value={2}>根据商品描述</Select.Option>
        </Select>
        <Input placeholder="关键字" style={{width:200}}></Input>
        <Button type="primary" style={{marginLeft:10}}>搜素</Button>
      </div>
    } 
      extra={
        <Button type="primary" onClick={this.addProduct}>
          <Icon type="plus"/>
          添加商品
        </Button>
      } 
      >
        <Table
    columns={this.columns}
    dataSource={products}
    rowKey="_id"
    bordered
    pagination={
      {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["3", "6", "9", "12"],
        defaultPageSize: 3,
        total, // 总数
        onChange: this.getProduct, // 页码发生改变事件
        onShowSizeChange: this.getProduct// pageSize 变化的回调
      
      }
    }
  />,
      
    </Card>
      </div>
    )
  }
}
