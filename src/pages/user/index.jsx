import React,{Component} from 'react';
import {Card, Button, Modal, Form, Input, Radio, DatePicker, Select, message} from "antd";
import {SmileTwoTone,EditTwoTone,CloseCircleTwoTone,PieChartTwoTone} from '@ant-design/icons';
import moment from "moment";
import axios from "../../axios";
import Utils from "../../utils/utils";
import ETable from "../../components/ETable";
import BaseForm from "../../components/BaseForm";
const FormItem = Form.Item;
const RadioGroud = Radio.Group;
const TextArea = Input.TextArea;
const {Option} = Select;
export default class User extends Component{

    state = {
        list:[],
        isVisible:false,
        type:'',
        title:''
    }
    params = {
        page:1
    }

    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名称',
            width:130,
        },
        {
            type:'INPUT',
            label:'手机号',
            field:'user_mobile',
            placeholder:'请输入手机号',
            width:130,
        },
        {
            type:'DATE',
            label:'请选择入职时间',
            field:'user_date',
            width:150,
        }
    ]

    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        }
        else if(type === 'edit'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:'请选择一条数据'
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            });
        }
        else if(type === 'detail'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:'请选择一条数据'
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            })
        }
        else if(type === 'delete'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:'请选择一条数据'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:`确定删除id为 ${item.id} ,名字为 ${item.userName} 这条数据吗`,
                onOk:()=>{
                    axios.ajax({
                        url:'https://www.fastmock.site/mock/92e9f9dbfd0e75344f81919e706dc771/user/delete',
                        data:{
                            params:{
                                id : item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code === 0){
                            _this.setState({
                                isVisible:false
                            });
                            message.success('删除成功');
                            _this.requestList();
                        }else{
                            message.error('请求失败');
                        }
                    })
                }
            })
        }
    }

    //创建员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.myForm1.myForm2.getFieldsValue();
        const url = 'https://www.fastmock.site/mock/92e9f9dbfd0e75344f81919e706dc771/user/';
        axios.ajax({
            url:type==='create'?url+'add':url+'edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code === 0){
                this.myForm1.myForm2.resetFields();
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }

    filterSubmit = (params)=>{
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        axios.requestList(this,'https://www.fastmock.site/mock/c20d56cecbc589f400ebb4580883a435/table/list1',this.params,true);
    }

    componentDidMount() {
        this.requestList();
    }

    render(){
        let {formList,filterSubmit} = this;
        const columns = [
            {
                title:'用户名',
                dataIndex:'userName',
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex ===1 ?'男':'女'
                }
            },{
                title:'状态',
                dataIndex:'status',
            },{
                title:'爱好',
                dataIndex:'interest',
            },{
                title:'生日',
                dataIndex:'birthday',
            },{
                title:'地址',
                dataIndex:'address',
            },{
                title:'早起时间',
                dataIndex:'time',
            }
        ]
        let footer = {};
        if( this.state.type === 'detail' ){
            footer = {
                footer : null
            }
        }
        return(
            <div>
                <Card>
                    <BaseForm formList={formList} filterSubmit={filterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }} className='operate-wrap'>
                    <Button
                        onClick={()=>this.handleOperate('create')}
                        type="primary" icon={<SmileTwoTone twoToneColor='#0f0'/>} >创建员工</Button>
                    <Button
                        onClick={()=>this.handleOperate('edit')}
                        type="primary" icon={<EditTwoTone twoToneColor='#0ff' />}>编辑员工</Button>
                    <Button
                        onClick={()=>this.handleOperate('detail')}
                        type="primary" icon={<PieChartTwoTone twoToneColor='#ff0' />}>员工详情</Button>
                    <Button
                        onClick={()=>this.handleOperate('delete')}
                        type="primary" icon={<CloseCircleTwoTone twoToneColor='#f00'/>}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.UpdateSelectedItem.bind(this)}
                        columns={columns}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.myForm1.myForm2.resetFields();
                        this.setState({
                            isVisible:false,
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm
                        type={this.state.type}
                        userInfo={this.state.userInfo}
                        ref={c=>this.myForm1=c}
                    />
                </Modal>
            </div>
        )
    }
}
class UserForm extends Component{
    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};

        const formItemLayout = {
            labelCol:{span:7},
            wrapperCol:{span:12}
        }

        let name = {};
        const detailForName = (formItemName)=>{
            if(type === 'detail'){
                return {...name};
            }else{
                name = {
                    name : formItemName
                }
                return {...name};
            }

        }
        return (
            <Form layout="horizontal" ref={c=>this.myForm2=c}>
                <FormItem
                    {...detailForName('user_name')}
                    label='用户名'
                    initialValue={userInfo.userName}
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.userName:
                        <Input type='text' placeholder='请输入用户名'/>
                    }
                </FormItem>
                <FormItem
                    {...detailForName('sex')}
                    label='性别'
                    initialValue={userInfo.sex}
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.sex === 1 ? '男' : '女' :
                        <RadioGroud>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroud>
                    }
                </FormItem>
                <FormItem
                    {...detailForName('status')}
                    label='状态'
                    initialValue={userInfo.status}
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.status:
                        <Select>
                            <Option value={1}>开心</Option>
                            <Option value={2}>伤心</Option>
                            <Option value={3}>悠闲</Option>
                            <Option value={4}>郁闷</Option>
                            <Option value={5}>纠结</Option>
                        </Select>
                    }
                </FormItem>
                <FormItem
                    {...detailForName('birth')}
                    label='生日'
                    initialValue={moment(userInfo.birthday)}
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.birthday:
                        <DatePicker/>
                    }

                </FormItem>
                <FormItem
                    {...detailForName('address')}
                    label='地址'
                    initialValue={userInfo.address}
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.address:
                        <TextArea rows={3} placeholder='请输入联系地址'/>
                    }
                </FormItem>
            </Form>
        )
    }
}