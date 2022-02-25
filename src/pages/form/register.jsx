import React, { Component } from "react";
import {
	Card,
	Form,
	Button,
	Input,
	Checkbox,
	Radio,
	Select,
	Switch,
	DatePicker,
	TimePicker,
	Upload,
	message,
	InputNumber,
} from "antd";
import {LoadingOutlined,PlusOutlined} from '@ant-design/icons';
import moment from "moment";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

export default class FormRegister extends Component {

	state = {}

	normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
		  return e;
		}
		return e && e.fileList;
	  };

	regOk = (value)=>{
		message.success(`您已通过注册表单的学习，密码为 ${value.password}`);
	}

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	  }

	handleChange = info => {
		if (info.file.status === 'uploading') {
		  this.setState({ loading: true });
		  return;
		}
		if (info.file.status === 'done') {
		  // Get this url from response in real world.
		  this.getBase64(info.file.originFileObj, imageUrl =>
			this.setState({
			  imageUrl,
			  loading: false,
			}),
		  );
		}
	  };

	render() {

		let { imageUrl,loading } = this.state;
		let { regOk,handleChange,normFile } = this;

        const fromItemLayout = {
            labelCol:{
                xs:24,
                sm:6
            },
            wrapperCol:{
                xs:24,
                sm:8
            }
        }
		const offsetLayout = {
			wrapperCol:{
				xs:24,
				sm:{
					span:8,
					offset:6
				}
			}
		}
		const rowObject = {
			minRows: 4, maxRows: 6
		}
		const uploadButton = (
			<div>
				{
					loading ? 
					<LoadingOutlined /> : 
					<PlusOutlined />
				}
			  	<div style={{ marginTop: 8 }}>
					上传
				</div>
			</div>
		  );

		return (
			<div>
				<Card title="注册表单">
					<Form onFinish={regOk}>
						<FormItem
                            {...fromItemLayout}
							label="用户名"
							name="userName"
							initialValue=""
							rules={[
								{
									required: true,
									message: "用户名不能为空",
								},
							]}
						>
							<Input placeholder="请输入用户名" />
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="密码"
							name="password"
							initialValue=""
							rules={[{}]}
						>
							<Input type='password' placeholder="请输入密码" />
						</FormItem>
                        <FormItem
                            {...fromItemLayout}
							label="性别"
							name="sex"
							initialValue="1"
						>
							<RadioGroup>
                                <Radio value='1'>男</Radio>
                                <Radio value='2'>女</Radio>
                            </RadioGroup>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="年龄"
							name="age"
							initialValue="20"
						>
							<InputNumber/>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="目前状态"
							name="status"
							initialValue="1"
						>
							<Select
								showSearch
							>
								<Option value='1'>咸鱼一条</Option>
								<Option value='2'>风华浪子</Option>
								<Option value='3'>北大才子一枚</Option>
								<Option value='4'>小心我讹你</Option>
								<Option value='5'>创业者</Option>
							</Select>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="爱好"
							name="interest"
							initialValue={['2','3']}
						>
							<Select 
								showSearch
								mode="multiple"
							>
								<Option value='1'>阴阳师</Option>
								<Option value='2'>英雄联盟</Option>
								<Option value='3'>反恐精英</Option>
								<Option value='4'>地下城与勇士</Option>
								<Option value='5'>穿越火线</Option>
							</Select>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="是否已婚"
							name="isMarried"
							valuePropName="checked"
							initialValue={true}
						>
							<Switch />
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="生日"
							name="birthday"
							initialValue={moment("1999-08-23")}
						>
							<DatePicker 
								showTime
								format="YYYY-MM-DD HH:mm:ss"
							/>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="联系地址"
							name="address"
							initialValue='海南省三亚市'
						>
							<TextArea
								autoSize={rowObject}
							/>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="早起时间"
							name="time"
						>
							<TimePicker/>
						</FormItem>
						<FormItem
                            {...fromItemLayout}
							label="头像"
							name="userImg"
							valuePropName="fileList"
							getValueFromEvent={normFile} 
						>
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								onChange={handleChange}
								
							>
								 {
									imageUrl ? 
										<img 
											src={imageUrl} 
											showUploadList={true}
											alt="avatar" 
											style={{ width: '100%' }} 
										/> : uploadButton
								}
							</Upload>
						</FormItem>
						<FormItem
                            {...offsetLayout}
							valuePropName="checked"
						>
							<Checkbox>
								我已阅读过
								<a href="#">慕课协议</a>
							</Checkbox>
						</FormItem>
						<FormItem
                            {...offsetLayout}
						>
							<Button 
								type="primary"
								htmlType="submit"
							>注册</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		);
	}
}
