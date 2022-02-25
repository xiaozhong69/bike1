import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ui.less';

export default class Buttons extends Component {
  state = {
    loading: true,
    value: 'default'
  }

  handleCloseLoading = () => {
    this.setState({
      loading: false
    })
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { loading, value } = this.state;
    return (
      <div>
        <Card title="基础按钮" className='card-wrap'>
          <Button type="primary">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="primary" danger>Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        <Card title="图标按钮" className='card-wrap'>
          <Button icon={<PlusOutlined />}>创建</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button icon={<DeleteOutlined />}>删除</Button>
          <Button shape='circle' icon={<SearchOutlined />}></Button>
          <Button type='primary' icon={<SearchOutlined />}>搜索</Button>
          <Button type='primary' icon={<DownloadOutlined />}>下载</Button>
        </Card>
        <Card title="Loading按钮" className='card-wrap'>
          <Button type="primary" loading={loading}>确定</Button>
          <Button type="primary" shape='circle' loading={loading} />
          <Button loading={loading}>点击加载</Button>
          <Button shape='circle' loading={loading} />
          <Button type="primary" onClick={() => this.handleCloseLoading()}>关闭</Button>
        </Card>
        <Card title='按钮组'>
          <Button.Group>
            <Button type='primary' icon={<LeftOutlined />}>返回</Button>
            <Button type='primary' icon={<RightOutlined />}>前进</Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className='card-wrap'>
          <Radio.Group onChange={this.onChange} value={value}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={value}>Imooc</Button>
          <Button size={value}>Imooc</Button>
          <Button type="dashed" size={value}>Imooc</Button>
          <Button type="primary" danger size={value}>Imooc</Button>
        </Card>
      </div>
    )
  }
}
