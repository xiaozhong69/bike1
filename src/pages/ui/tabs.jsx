import React, { Component } from 'react'
import { Card, message, Tabs, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

export default class Message extends Component {
  newTabIndex = 0; 
  UNSAFE_componentWillMount() {
    const panes = [
      {
        title: 'Tab1',
        content: 'Tab1',
        key: '1'
      },
      {
        title: 'Tab2',
        content: 'Tab2',
        key: '2'
      },
      {
        title: 'Tab3',
        content: 'Tab3',
        key: '3'
      }
    ]
    this.setState({
      panes,
      activeKey:panes[0].key
    })
  }
  
  callback(key) {
    message.info(`你选择了页签${key}`);
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <div>
        <Card title="Tab页签" className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<PlusOutlined />} key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab={<EditOutlined />} key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab={<DeleteOutlined />} key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab可编辑的页签" className='card-wrap'>
          <div style={{ marginBottom: 16 }}>
            <Button onClick={this.add}>ADD</Button>
          </div>
          <Tabs
            hideAdd
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key}>
                {pane.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    )
  }
}
