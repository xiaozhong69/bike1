import React, { Component } from 'react'
import { Card, Modal, Button } from 'antd';

export default class modals extends Component {

  state = {
    isModalVisible1: false,
    isModalVisible2: false,
    isModalVisible3: false,
    isModalVisible4: false,
  }

  handleClick = type => {
    this.setState({
      [type]: true,
    })
  }

  handleOk = type => {
    this.setState({
      [type]: false,
    })
  }

  handleCancel = type => {
    this.setState({
      [type]: false,
    })
  }

  handleConfirm = type => {
    Modal[type]({
      title: '确认？',
      content: (
        <div>
          <p>你确定你学会了React了吗?</p>
        </div>
      )
    });
  }

  render() {
    const { isModalVisible1, isModalVisible2, isModalVisible3, isModalVisible4 } = this.state;
    const { handleCancel, handleOk, handleClick, handleConfirm } = this;
    return (
      <div>
        <Card title="基础模态框" className='card-wrap'>
          <Button type="primary" onClick={()=>handleClick("isModalVisible1")}>open</Button>
          <Button type="primary" onClick={()=>handleClick("isModalVisible2")}>自定义页脚</Button>
          <Button type="primary" onClick={()=>handleClick("isModalVisible3")}>顶部20px弹框</Button>
          <Button type="primary" onClick={()=>handleClick("isModalVisible4")}>水平垂直居中</Button>
        </Card>
        <Card title="信息确认框" className='card-wrap'>
          <Button type="primary" onClick={()=>handleConfirm("confirm")}>confirm</Button>
          <Button type="primary" onClick={()=>handleConfirm("info")}>info</Button>
          <Button type="primary" onClick={()=>handleConfirm("success")}>success</Button>
          <Button type="primary" onClick={()=>handleConfirm("warning")}>warning</Button>
          <Button type="primary" onClick={()=>handleConfirm("error")}>error</Button>
        </Card>
        <Modal 
          title="react" 
          visible={isModalVisible1} 
          onOk={()=>handleOk("isModalVisible1")} 
          onCancel={()=>handleCancel("isModalVisible1")}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal 
          title="react" 
          okText="好的"
          cancelText="算了"
          visible={isModalVisible2} 
          onOk={()=>handleOk("isModalVisible2")}  
          onCancel={()=>handleCancel("isModalVisible2")}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal 
          title="react" 
          style={{top:20}}
          visible={isModalVisible3} 
          onOk={()=>handleOk("isModalVisible3")} 
          onCancel={()=>handleCancel("isModalVisible3")}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal 
          title="react" 
          visible={isModalVisible4} 
          wrapClassName='vertical-center-modal'
          onOk={()=>handleOk("isModalVisible4")} 
          onCancel={()=>handleCancel("isModalVisible4")}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
      </div>
    )
  }
}
