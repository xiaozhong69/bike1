import React, { Component } from "react";
import { Card, Table, Modal, Button, message,Badge } from "antd";
import axios from "../../axios";
// import Utils from "../../utils/utils";

export default class HighTable extends Component {

	state = {
		dataSource: [],
	};

	params = {
		page: 1,
	};

	requsetDataSource() {
		axios.ajax({
				url: "https://www.fastmock.site/mock/345bb7fbd5e9f9b818261edc3cc27195/table/high/list",
				data: {
					params: {
						page: this.params.page,
					},
					isShowLoading: true,
				},
			})
			.then((res) => {
				if (res.code === 0) {
					res.result.list.map((item, index) => {
						return item.key = index;
					});
					this.setState({
						dataSource: res.result.list,
						selectedRowKeys: [],
						selectedRows: null,
					});
				}
			});
	}

	handleChange = (pagination, filters, sorter)=>{
		this.setState({
			sortOrder: sorter.order
		})
	}

	handleDelete = (item)=>{
		let id = item.id;
		let userName = item.userName;
		Modal.confirm({
			title:'确认',
			content:`您确认要删除(id:${id} 姓名:${userName})这条数据吗?`,
			onOk : () => {
				message.success('删除成功');
				this.requsetDataSource();
			}
		})
	}

	componentDidMount() {
		this.requsetDataSource();
	}

	render() {
		const columns = [
			{
				title: "用户名",
				dataIndex: "userName",
			},
			{
				title: "性别",
				dataIndex: "sex",
			},
			{
				title: "状态",
				dataIndex: "status",
			},
			{
				title: "爱好",
				dataIndex: "interest",
			},
			{
				title: "生日",
				dataIndex: "birthday",
			},
			{
				title: "地址",
				dataIndex: "address",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
		];

		const columns2 = [
			{
				title: "用户名",
				dataIndex: "userName",
				fixed: "left",
			},
			{
				title: "性别",
				dataIndex: "sex",
				fixed: "left",
			},
			{
				title: "状态",
				dataIndex: "status",
			},
			{
				title: "爱好",
				dataIndex: "interest",
			},
			{
				title: "生日",
				dataIndex: "birthday",
			},
			{
				title: "地址",
				dataIndex: "address",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
			{
				title: "早起时间",
				dataIndex: "time",
				fixed:"right"
			},
			{
				title: "早起时间",
				dataIndex: "time",
				fixed:"right"
			},
		];

		const column3 = [
			{
				title: "用户名",
				dataIndex: "userName",
			},
			{
				title: "性别",
				dataIndex: "sex",
			},
			{
				title: "年龄",
				dataIndex: "age",
				sorter:(a,b)=>{
					console.log()
					return a.age - b.age;
				},
				sortOrder: this.state.sortOrder
			},
			{
				title: "状态",
				dataIndex: "status",
			},
			{
				title: "爱好",
				dataIndex: "interest",
			},
			{
				title: "生日",
				dataIndex: "birthday",
			},
			{
				title: "地址",
				dataIndex: "address",
			},
			{
				title: "早起时间",
				dataIndex: "time",
			},
		];

		const column4 = [
			{
				title: "用户名",
				dataIndex: "userName",
			},
			{
				title: "性别",
				dataIndex: "sex",
			},
			{
				title: "年龄",
				dataIndex: "age",
			},
			{
				title: "状态",
				dataIndex: "status",
				render(abc){
					let config = {
						'开心':<Badge status="success" text='开心' />,
						'伤心':<Badge status="error" text='伤心' />,
						'郁闷':<Badge status="default" text='郁闷' />,
						'愤怒':<Badge status="processing" text='愤怒' />,
						'丧':<Badge status="warning" text='丧' />,
					}
					return config[abc];
				}
			},
			{
				title: "爱好",
				dataIndex: "interest",
			},
			{
				title: "生日",
				dataIndex: "birthday",
			},
			{
				title: "地址",
				dataIndex: "address",
			},
			{
				title: "操作",
				render:(text,item)=>{
					<Button size="small" onClick={()=>this.handleDelete(item)}>删除</Button>
				}
			},
		];

		columns.map((item, index) => {
			return item.key = index;
		});

		columns2.map((item, index) => {
			return item.key = index;
		});

		return (
			<div>
				<Card title="头部固定">
					<Table
						bordered
						columns={columns}
						dataSource={this.state.dataSource}
						pagination={false}
						scroll={{y:240}}
					/>
				</Card>

				<Card title="左侧固定" style={{ marginTop: 20 }}>
					<Table
						bordered
						columns={columns2}
						dataSource={this.state.dataSource}
						pagination={false}
						scroll={{x:2440}}
					/>
				</Card>

				<Card title="表格排序" style={{ marginTop: 20 }}>
					<Table
						bordered
						columns={column3}
						dataSource={this.state.dataSource}
						pagination={false}
						onChange={this.handleChange}
					/>
				</Card>

				<Card title="操作按钮" style={{ marginTop: 20 }}>
					<Table
						bordered
						columns={column4}
						dataSource={this.state.dataSource}
						pagination={false}
					/>
				</Card>
			</div>
		);
	}
}
