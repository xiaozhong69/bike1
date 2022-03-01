import React,{Component} from 'react';
import {Card,Table,Modal,Button, message} from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';

export default class BasicTable extends Component{
    state = {
        dataSource2:[]
    };

    params ={
        page:1
    }

    requsetDataSource2(){
        let _this = this;
        axios.ajax({
            url:'',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code == 0){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.requsetDataSource2()
                    })
                })
            }
        })
    }

    onRowClick(record,index){
        Modal.info({
            title:'信息',
            content:`用户名:${record.userName} 地址:${record.address}`
        })
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    onDelete(){
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗?${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.requsetDataSource2();
            }
        })
    }

    componentDidMount(){
        const data = [
            {
                userName:'tom',
                sex:'1',
                status:'1',
                interest:'1',
                birthday:'1999-08-23',
                address:'海南省三亚市',
                time:'08:00'
            },{
                userName:'jarry',
                sex:'1',
                status:'1',
                interest:'1',
                birthday:'1999-08-23',
                address:'海南省海口市',
                time:'08:00'
            },{
                userName:'susan',
                sex:'1',
                status:'1',
                interest:'1',
                birthday:'1999-08-23',
                address:'海南省儋州市',
                time:'08:00'
            }
        ]
        data.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            dataSource:data
        })
        this.requsetDataSource2();
    };

    render(){
        const columns = [
            {
                title:'用户名',
                dataIndex:'userName',
                // key:'userName',
            },{
                title:'性别',
                dataIndex:'sex',
                // key:'sex',
                // render(sex){
                //     return sex == 1 ?'男':'女'
                // }
            },{
                title:'状态',
                dataIndex:'status',
                // key:'status',
                // render(status){
                //     let config = {
                //         '1':'咸鱼一条',
                //         '2':'风华浪子',
                //         '3':'北大才子',
                //         '4':'百度FE',
                //         '5':'创业者',
                //     }
                //     return config[status]
                // }
            },{
                title:'爱好',
                dataIndex:'interest',
                // key:'interest',
                // render(interest){
                //     let config = {
                //         '1':'篮球',
                //         '2':'足球',
                //         '3':'排球',
                //         '4':'乒乓球',
                //         '5':'橄榄球',
                //     }
                //     return config[interest]
                // }
            },{
                title:'生日',
                dataIndex:'birthday',
                // key:'birthday'
            },{
                title:'地址',
                dataIndex:'address',
                // key:'address'
            },{
                title:'早起时间',
                dataIndex:'time',
                // key:'time'
            }
        ]
        columns.map((item,index)=>{
            item.key = index;
        })

        let {selectedRowKeys} = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        const rowCheckSelection ={
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        return(
            <div>
                <Card title='基础表格'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>

                <Card title='动态数据渲染表格' style={{marginTop:20}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title='Mock-单选' style={{marginTop:20}}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick: ()=>{
                                  this.onRowClick(record,index);
                              }, // 点击行
                            };
                          }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title='Mock-多选' style={{marginTop:20}}>
                    <Button onClick={()=>this.onDelete()}>删除</Button>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title='Mock-表格分页' style={{marginTop:20}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    };
}