import React, { Component } from 'react'
import { Card,Table,Button,Icon,Modal } from 'antd';
import {connect} from 'react-redux'
import {getCategoryAsncy,addCategoryAsncy,updateCategoryAsncy,DeleCategoryAsncy} from '../../redux/action-creators/category'
import CategoryForm from './category-form'
import UpdatecategoryForm from './update-category-form'

@connect((state)=>({category:state.category}),{getCategoryAsncy,addCategoryAsncy,updateCategoryAsncy,DeleCategoryAsncy})
 class Category extends Component {
   state={
    categoryVisibale:false,
    updatecategoryVisibale:false,
    catename:{},
    delecategoryVisibale:false

   }


   componentDidMount(){
    if(!this.props.category.length){
      this.props.getCategoryAsncy()
    }
   }
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: catename=>{
        return <div>
          <Button type='link' onClick={this.updateShow(catename)}>修改分类</Button>
          <Button type='link' onClick={this.deleShow(catename)}>删除分类</Button>
        </div>
      
      } ,
    },
  
  ];

  
  show=()=>{
    this.setState({
      categoryVisibale:true
    })
  }

  updateShow=(catename)=>{
    //这里为什么要选择return出去呢，不return出去为什么获得的值就不是和点击相对应的name的值
    //当调用一个方法的时候，进行传参调用，就需要在这个方法里面加一个return
    //当一个函数里面有return的时候，在外面给他进行调用，就必须在传参调用的时候，在加一个括号
    return ()=>{
      console.log(catename)
      this.setState({
        updatecategoryVisibale:true,
        catename
      })
    }
  }

  hideCategory=(name)=>{
   return ()=>{
     this.setState({
       [name+'Visibale']:false
     })
     setTimeout(()=>{
      this[name + "Form"].props.form.resetFields();
     },500)
   }
  }

  hidedeleCategory=()=>{
    this.setState({
      delecategoryVisibale:false
    })
  }

  updateCategory=()=>{
      this.updatecategoryForm.props.form.validateFields(async(err,values)=>{
        if(!err){
          const {categoryName} = values
          const {_id} = this.state.catename
           await this.props.updateCategoryAsncy(_id,categoryName)
        }
        
        this.hideCategory('updatecategory')()
       

      })
  

   
  }

  deleCategory=()=>{
    const {_id} = this.state.catename
    this.props.DeleCategoryAsncy(_id)
    this.hidedeleCategory()

  }

  deleShow=(catename)=>{
    return()=>{
      this.setState({
        delecategoryVisibale:true,
        catename
      })

      
    }
  }

  addCategory=()=>{
  this.categoryForm.props.form.validateFields(async(errors, values)=>{
     const {categoryName} = values
        if(!errors){
         await this.props.addCategoryAsncy(categoryName)
          this.hideCategory('category')()//为什么会有async和await

        }


    })
  }
  
  render() {
    const {category} = this.props
    const {categoryVisibale,updatecategoryVisibale,catename,delecategoryVisibale} = this.state
    return (
      <div>
        <Card
         title="分类列表" 
         extra={<Button type="primary" onClick={this.show}><Icon type="plus" />分类列表</Button>}> 
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

        <Modal
          title="添加分类"
          visible={categoryVisibale}
          onOk={this.addCategory}
          onCancel={this.hideCategory('category')}
          width={300}
          okText="确认"
          cancelText="取消"
        >
         <CategoryForm  wrappedComponentRef={form => (this.categoryForm = form)} />
        </Modal>

        <Modal
          title="添加分类"
          visible={updatecategoryVisibale}
          onOk={this.updateCategory}
          onCancel={this.hideCategory('updatecategory')}
          width={300}
          okText="确认"
          cancelText="取消"
        >
         <UpdatecategoryForm 

         categoryValue= {catename.name}
         
         wrappedComponentRef={form => (this.updatecategoryForm = form)} />
        </Modal>
        

        <Modal
          title="删除分类"
          visible={delecategoryVisibale}
          onOk={this.deleCategory}
          onCancel={this.hidedeleCategory}
          width={300}
          okText="确认"
          cancelText="取消"
        >
        </Modal>

      </div>
    )
  }
}



export default Category
