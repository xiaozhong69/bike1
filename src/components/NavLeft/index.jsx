import React, { Component } from 'react'
import MenuConfig from './../../config/menuConfig'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less'
const { SubMenu } = Menu;


export default class Navleft extends Component {
    UNSAFE_componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    theme='dark'
                    className='left-menu'
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
