import React,{Component} from 'react';
import {Card,Form,Button, Select ,Table, DatePicker,Modal,message} from 'antd';
import axios from "../../axios";
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const { Option } = Select;
export default class Order extends Component{

    state = {
        orderInfo:{},
        orderConfirmVisible: false,
    }

    params = {
        page:1
    }

    componentDidMount(){ 
        this.requestList();
    }

        //默认请求的接口数据
        requestList = ()=>{
            let _this = this;
            axios.ajax({
                url:'https://www.fastmock.site/mock/cd130387dae9bcda66a3b5f4a56fe7a0/order/list',
                data:{
                    params:{
                        page: this.params.page
                    }
                }
            }).then((res)=>{
                this.setState({
                    list: res.result.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.requestList();
                    })
                })
            })
        }

        //结束订单
        handleConfirm = ()=>{
            let item = this.state.selectedItem;
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一条订单进行结束！'
                })
                return;
            }
            axios.ajax({
                url:'https://www.fastmock.site/mock/cd130387dae9bcda66a3b5f4a56fe7a0/order/ebike_info',
                data:{
                    params: {
                        orderId: item.id
                    }
                }
            }).then((res)=>{
                if(res.code == 0){
                    this.setState({
                        orderInfo:res.result,
                        orderConfirmVisible:true
                    })
                }
            })
        }

        //结束订单 OK
        handleFinishOrder = ()=>{
            let item = this.state.selectedItem;
            axios.ajax({
                url:'https://www.fastmock.site/mock/cd130387dae9bcda66a3b5f4a56fe7a0/order/finish_order',
                data:{
                    params: {
                        orderId: item.id
                    }
                }
            }).then((res)=>{
                if(res.code == 0){
                    message.success('订单结束成功');
                    this.setState({
                        orderConfirmVisible:false
                    });
                    this.requestList();
                }
            })
        }

        onRowClick(record,index){
            let selectKey = [index];
            this.setState({
                selectedRowKeys: selectKey,
                selectedItem: record
            })
        }

    render(){
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },{
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },{
                title: '用户名',
                dataIndex: 'user_name'
            },{
                title: '手机号',
                dataIndex: 'mobile'
            },{
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'KM';
                }
            },{
                title: '行驶时长',
                dataIndex: 'total_time',
            },{
                title: '状态',
                dataIndex: 'status',
                render(status){
                    return status == 1 ? '进行中':'行程结束'
                }
            },{
                title: '开始时间',
                dataIndex: 'start_time'
            },{
                title: '结束时间',
                dataIndex: 'end_time'
            },{
                title: '订单金额',
                dataIndex: 'total_fee'
            },{
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol:{span:5},
            warpperCol:{span:19}
        }

        let {selectedRowKeys} = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        return(
            <div>
                <Card>
                    <FilterForm></FilterForm>
                </Card>

                <Card style={{marginTop:10}}>
                    <Button type='primary'>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10} } onClick={this.handleConfirm}>结束订单</Button>
                </Card>

                <div className='content-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick: ()=>{
                                  this.onRowClick(record,index);
                              }, // 点击行
                            };
                          }}
                    />
                </div>

                <Modal
                    title='结束订单'
                    visible={this.state.orderConfirmVisible}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisible:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form 
                        {...formItemLayout}
                        layout='horizontal'
                    >
                        <FormItem label="车辆编号">
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量">
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间">
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置">
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
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
                    label="订单时间"
                    name='start_time'
                >
                    <DatePicker />
                </FormItem>
                <FormItem 
                    label="~"
                    colon={false}
                    name='end_time'
                >
                    <DatePicker showTime/>
                </FormItem>

                <FormItem 
                    label="订单状态"
                    name='order_status'
                >
                    <Select
                        placeholder='全部'
                        style={{width:120}}
                    >
                        <Option value=''>全部</Option>
                        <Option value='1'>进行中</Option>
                        <Option value='2'>行程结束</Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <span style={{margin:'0 10px'}}>
                        <Button type="primary">查询</Button>
                    </span>
                        <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}