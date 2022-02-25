import React, { Component } from 'react'
import { Card, Button, notification } from 'antd';

export default class Notice extends Component {

  openNotificationWithIcon = (type,placement) => {
    notification[type]({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  }

  render() {
    const { openNotificationWithIcon } = this
    return (
      <div>
        <Card title="通知提醒框" className='card-wrap'>
          <Button type="primary" onClick={() => openNotificationWithIcon('success')}>Success</Button>
          <Button type="primary" onClick={() => openNotificationWithIcon('info')}>Info</Button>
          <Button type="primary" onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
          <Button type="primary" onClick={() => openNotificationWithIcon('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框" className='card-wrap'>
          <Button type="primary" onClick={() => openNotificationWithIcon('success','topLeft')}>Success</Button>
          <Button type="primary" onClick={() => openNotificationWithIcon('info','topRight')}>Info</Button>
          <Button type="primary" onClick={() => openNotificationWithIcon('warning','bottomLeft')}>Warning</Button>
          <Button type="primary" onClick={() => openNotificationWithIcon('error','bottomRight')}>Error</Button>
        </Card>
      </div>
    )
  }
}
