import React,{Component} from 'react';
import {Card,Table,Modal,Button, message} from 'antd';
import axios from './../../axios';

export default class BasicTable extends Component{
    state = {
        dataSource2:[],
        list:[]
    };

    params ={
        page:1
    }

    requsetDataSource2(){
       axios.requestList(this,'https://www.fastmock.site/mock/c20d56cecbc589f400ebb4580883a435/table/list1',this.params,true);
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
            return ids.push(item.id);
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
            return item.key = index;
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
            },{
                title:'性别',
                dataIndex:'sex',
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
        columns.map((item,index)=>{
            return item.key = index;
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
                        dataSource={this.state.list}
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
                        dataSource={this.state.list}
                        pagination={false}
                    />
                </Card>

                <Card title='Mock-多选' style={{marginTop:20}}>
                    <Button onClick={()=>this.onDelete()}>删除</Button>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={false}
                    />
                </Card>

                <Card title='Mock-表格分页' style={{marginTop:20}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    };
}