import React,{Component} from 'react';
import { Card,Form,Input,Button,message,Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
export default class FormLogin extends Component{

    onFinish = (value)=>{
        message.success(`恭喜${value.userName}校验成功，您当前的密码为${value.password}`);
    }

    render(){

        let {onFinish} = this;

        return(
            <div>
                <Card 
                    title="登录行内表单"
                >
                    <Form
                        layout='inline'
                    >
                        <FormItem>
                            <Input placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码'/>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card 
                    title="登录水平表单"
                    style={{marginTop:20}} 
                >
                    <Form
                        onFinish={onFinish}
                        style={{width:300}}
                    >
                        <FormItem
                            label='用户名'
                            name='userName'
                            initialValue=''
                            rules={[
                                {
                                    required:true,
                                    message:'用户名不能为空'
                                },
                                {
                                    min: 5, max: 10,
                                    message: "长度不在范围内"
                                },
                                {
                                    pattern: /^\w/g,
                                    message: "用户名必须为数字或字母"
                                }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined/>} 
                                placeholder='请输入用户名'
                            />
                        </FormItem>
                        <FormItem
                            label='密码'
                            name='password'
                            initialValue=''
                            rules={[
                                {
                                    required:true,
                                    message:'密码不能为空'
                                },
                            ]}
                        >
                            <Input 
                                prefix={<LockOutlined/>}
                                type="password" 
                                placeholder='请输入密码'
                            />
                        </FormItem>
                        <FormItem>
                            <Button type='primary' htmlType="submit">登录</Button>
                        </FormItem>
                        <FormItem
                            name='remember'
                            valuePropName='checked'
                            initialValue={true}
                        >
                            <Checkbox>记住密码</Checkbox>
                            <a href="./lossWord" style={{ float: "right" }}>
                                忘记密码
                            </a>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    };
}