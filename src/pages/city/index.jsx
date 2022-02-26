import React, { Component } from "react";
import { Card, Table, Button,Form, Input ,Select ,Modal,message} from "antd";
import axios from "../../axios";
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const {Option} = Select;
export default class City extends Component{

    state = {
        list: [],
        isShowOpenCity: false
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
            url:'https://www.fastmock.site/mock/b31f2232e4dd80ae3dc92766eb0dc473/city/list',
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

    //开通城市
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity: true
        })
    }

    //城市开通提交
    handleSubmit = ()=>{
        let cityInfo = this.cityForm.cityForm.getFieldsValue();
		axios.ajax({
				url: "https://www.fastmock.site/mock/b31f2232e4dd80ae3dc92766eb0dc473/city/open",
				data: {
					params: cityInfo,
				},
			})
			.then((res) => {
				if (res.code === 0) {
					message.success("开通成功");
					this.setState({
						isShowOpenCity: false,
					});
                    this.requestList();
				}
			});
    }

    render(){

        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            },{
                title:'城市名称',
                dataIndex:'name'
            },{
                title:'用车模式',
                dataIndex:'mode',
                render(config){
                    let ob = {
                        '1' : '指定停车点模式',
                        '2' : '禁停区模式'
                    }
                    return ob[config];
                }
            },{
                title:'营运模式',
                dataIndex:'op_mode',
                render(config){
                    let ob = {
                        '1' : '自营',
                        '2' : '加盟'
                    }
                    return ob[config];
                }
            },{
                title:'授权加盟商',
                dataIndex:'auth_status_name'
            },{
                title:'城市管路员',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            },{
                title:'城市开通时间',
                dataIndex:'open_time'
            },{
                title:'操作时间',
                dataIndex:'update_time'
            },{
                title:'操作人',
                dataIndex:'sys_user_name'
            }
        ]

        return(
            <div>
                <Card>
                    <FilterForm></FilterForm>
                </Card>

                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>

                <div className="content-wrap">
                    <Table 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                
                <Modal
                    title='开通城市'
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm 
                        ref={ inst => this.cityForm = inst }
                    />
                </Modal>
            </div>
        );
    }
}

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

class OpenCityForm extends Component{

    formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 19
        }
    }

    render(){
        return(
            <Form
                layout="horizontal" 
                {...this.formItemLayout}
                ref={ inst => this.cityForm = inst }
            >
                
                <FormItem 
                    label='选择城市'
                    name='city_id'
                    initialValue='1'
                >
                    <Select style={{width:120}}>
                        <Option value='1'>秦皇岛市</Option>
                        <Option value='2'>天津市</Option>
                        <Option value='3'>海口市</Option>
                    </Select>
                </FormItem>

                <FormItem 
                    label='营运模式'
                    name='op_mode'
                    initialValue='1'
                >
                    <Select>
                        <Option value='1'>自营</Option>
                        <Option value='2'>加盟</Option>
                    </Select>
                </FormItem>
                <FormItem 
                    label='用车模式'
                    name='use_mode'
                    initialValue='1'
                >
                    <Select>
                        <Option value='1'>指定停车点</Option>
                        <Option value='2'>禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        )
    }
}