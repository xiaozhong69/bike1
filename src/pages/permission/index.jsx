import React, {Component} from 'react';
import {Card, Form, Button, Modal, Select, Input, message, Tree, Transfer} from 'antd';
import ETable from "../../components/ETable";
import Utils from "../../utils/utils";
import axios from "../../axios";
import menuConfig from '../../config/menuConfig';

const FormItem = Form.Item;
const {Option} = Select;
export default class PermissionUser extends Component {

    state = {
        dataSource: [],
        isRoleVisible: false,
        isPermVisible: false,
        isUserVisible: false
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };

    //用户授权提交
    handleUserSubmit = () => {
        let data = {};
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: 'https://www.fastmock.site/mock/87e4b193d9088cfc62372f7a49ba2ca5/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    isUserVisible: false
                })
                this.requestList();
            }
        })
    }

    //筛选目标用户
    getAuthUserList = (data) => {
        const mockData = [];
        const targetKeys = [];
        if (data && data.length > 0) {
            data.map(item => {
                const data = {
                    key: item.user_id,
                    title: item.user_name,
                    status: item.status
                }
                if (item.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            })
        }
        this.setState({
            mockData,
            targetKeys
        })
    }

    getRoleUserList = (id) => {
        axios.ajax({
            url: 'https://www.fastmock.site/mock/87e4b193d9088cfc62372f7a49ba2ca5/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.getAuthUserList(res.result);
            }
        })
    }

    //打开用户授权框
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id);
    }

    //设置权限提交
    handlePermEditSubmit = () => {
        let data = this.myEditForm1.myEditForm2.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: 'https://www.fastmock.site/mock/87e4b193d9088cfc62372f7a49ba2ca5/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    isPermVisible: false
                })
                this.requestList();
            }

        })
    }

    //打开设置权限框
    handlePermission = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }

    //创建角色提交
    handleRoleSubmit = () => {
        let data = this.myForm1.myForm2.getFieldsValue();
        axios.ajax({
            url: 'https://www.fastmock.site/mock/87e4b193d9088cfc62372f7a49ba2ca5/role/create',
            data: {
                params: data
            }
        }).then(res => {
            if (res.code === 0) {
                message.success({
                    content: '请求成功'
                });
                this.setState({
                    isRoleVisible: false
                });
                this.myForm1.myForm2.resetFields();
                this.requestList();
            } else {
                message.error({
                    content: '请求失败'
                })
            }
        })
    }

    //打开创建角色弹框
    handleCreate = () => {
        this.setState({
            isRoleVisible: true
        })
    }

    requestList = () => {
        axios.requestList(this, 'https://www.fastmock.site/mock/87e4b193d9088cfc62372f7a49ba2ca5/role/list', {}, true);
    }

    componentDidMount() {
        this.requestList();
    }

    render() {

        const columns = [
            {
                title: "角色ID",
                dataIndex: "id"
            }, {
                title: "角色名称",
                dataIndex: "role_name"
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render(create_time) {
                    return Utils.formateDate(new Date(create_time))
                }
            }, {
                title: "使用状态",
                dataIndex: "status",
                render(status) {
                    return status === 1 ? "启用" : "停用"
                }
            }, {
                title: "授权时间",
                dataIndex: 'authorize_time',
                render(authorize_time) {
                    return Utils.formateDate(new Date(authorize_time))
                }
            }, {
                title: "授权人",
                dataIndex: 'authorize_user_name'
            }
        ]

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }

        let {
            handleCreate,
            handleRoleSubmit,
            handlePermission,
            handlePermEditSubmit,
            handleUserAuth,
            handleUserSubmit,
            handleChange,
            filterOption
        } = this;
        let {
            isRoleVisible,
            mockData,
            selectedRowKeys,
            list,
            isPermVisible,
            detailInfo,
            isUserVisible,
            menuInfo,
            targetKeys
        } = this.state;
        return (
            <div className='operate-wrap'>
                <Card>
                    <Button type='primary' onClick={handleCreate}>创建角色</Button>
                    <Button type='primary' onClick={handlePermission}>设置权限</Button>
                    <Button type='primary' onClick={handleUserAuth}>用户授权</Button>
                </Card>

                <div className='content-wrap'>
                    <ETable
                        updateSelectedItem={Utils.UpdateSelectedItem.bind(this)}
                        selectedRowKeys={selectedRowKeys}
                        dataSource={list}
                        columns={columns}
                    />
                </div>

                <Modal
                    title='创建角色'
                    visible={isRoleVisible}
                    onOk={handleRoleSubmit}
                    onCancel={() => {
                        this.myForm1.myForm2.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm ref={c => this.myForm1 = c}/>
                </Modal>

                <Modal
                    title='设置权限'
                    visible={isPermVisible}
                    width={600}
                    onOk={handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PerEditForm
                        ref={c => this.myEditForm1 = c}
                        detailInfo={detailInfo}
                        menuInfo={menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>

                <Modal
                    title='用户授权'
                    visible={isUserVisible}
                    width={800}
                    onOk={handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <Form {...formItemLayout}>
                        <FormItem label="角色名称" name="role_name">
                            <Input disabled placeholder={this.state.detailInfo ? this.state.detailInfo.role_name : ""}/>
                        </FormItem>
                        <FormItem label="选择用户">
                            <Transfer
                                listStyle={{width: 200, height: 400}}
                                dataSource={mockData}
                                titles={["待选用户", "已选用户"]}
                                showSearch
                                locale={{searchPlaceholder: '输入用户名'}}
                                filterOption={filterOption}
                                targetKeys={targetKeys}
                                onChange={handleChange}
                                render={item => item.title}
                            />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

class RoleForm extends Component {
    render() {

        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 12}
        }

        return (
            <Form layout="horizontal" ref={c => this.myForm2 = c}>
                <FormItem
                    name='user_name'
                    label='角色名称'
                    {...formItemLayout}
                >
                    <Input type='text' placeholder='请输入角色名称'/>
                </FormItem>

                <FormItem
                    name='status'
                    label='状态'
                    {...formItemLayout}
                >
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={2}>关闭</Option>
                    </Select>
                </FormItem>
            </Form>
        )
    }
}

class PerEditForm extends Component {

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }

    render() {
        const detailInfo = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const treeData = [
            {
                title: '平台权限',
                key: 'root',
                children: [...menuConfig]
            }
        ]

        return (
            <Form layout="horizontal" {...formItemLayout} ref={c => this.myEditForm2 = c}>
                <FormItem label='角色名称'>
                    <Input disabled placeholder={detailInfo.role_name}/>
                </FormItem>
                <FormItem
                    label='状态'
                    name='status'
                    initialValue='1'
                >
                    <Select placeholder={detailInfo.role_name}>
                        <Option value='1'>启用</Option>
                        <Option value='0'>停用</Option>
                    </Select>
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    treeData={treeData}
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys);
                    }}
                    checkedKeys={menuInfo}
                />
            </Form>
        );
    }
}