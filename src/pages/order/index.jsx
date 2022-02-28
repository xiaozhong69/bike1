import React,{Component} from 'react';
import {Card,Form,Option,Modal,Button, Select ,Table} from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
export default class Order extends Component{

    state = {

    }

    columns = [
        {
            title: '订单编号',
            dataIndex: 'order_sn'
        }
    ]

    render(){
        return(
            <div>

                <Card>
                    <FilterForm></FilterForm>
                </Card>

                <Card style={{marginTop:10}}>
                    <Button>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>

                <div className='content-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>

            </div>
        )
    }
};

class FilterForm extends Component{
    render(){
        return(
            <Form layout="inline">
                <FormItem 
                    label="城市"
                    name='city_id'
                >
                    <Select
                        placeholder='全部'
                        style={{width:100}}
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>秦皇岛市</Option>
                        <Option value='2'>天津市</Option>
                        <Option value='3'>海口市</Option>
                    </Select>
                </FormItem>

                <FormItem 
                    label="用车模式"
                    name='mode'
                >
                    <Select
                        placeholder='全部'
                        style={{width:140}}
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>指定停车点模式</Option>
                        <Option value='2'>禁停区模式</Option>
                    </Select>
                </FormItem>

                <FormItem 
                    label="营运模式"
                    name='op_mode'
                >
                    <Select
                        placeholder='全部'
                        style={{width:80}}
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>自营</Option>
                        <Option value='2'>加盟</Option>
                    </Select>
                </FormItem>

                <FormItem 
                    label="加盟商授权状态"
                    name='auth_status'
                >
                    <Select
                        placeholder='全部'
                        style={{width:110}}
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>已授权</Option>
                        <Option value='2'>未授权</Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{magin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}