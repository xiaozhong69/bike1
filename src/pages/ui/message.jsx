import React, { Component } from 'react'
import { Card, Button, message } from 'antd';

export default class Message extends Component {
  
  handleClick = type => {
    message[type](`This is a ${type} message`)
  }

  render() {
    return (
      <div>
        <Card title="全局Message" className='card-wrap'>
          <Button type="primary" onClick={()=>this.handleClick("success")}>Success</Button>
          <Button type="primary" onClick={()=>this.handleClick("info")}>Info</Button>
          <Button type="primary" onClick={()=>this.handleClick("loading")}>Loading</Button>
          <Button type="primary" onClick={()=>this.handleClick("error")}>Error</Button>
          <Button type="primary" onClick={()=>this.handleClick("warning")}>Warning</Button>
        </Card>
      </div>
    )
  }
}
