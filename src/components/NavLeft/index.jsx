import React, { Component } from 'react'
import {connect} from "react-redux";
import MenuConfig from './../../config/menuConfig'
import {switchMenu} from '../../redux/action';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less'
const { SubMenu } = Menu;

class Navleft extends Component {

    state = {
        currentKey:''
    }

    handleClick = ({item,key})=>{
        const {dispatch} = this.props;
        dispatch(switchMenu(item.props.title));
        this.setState({
            currentKey:key
        })
    }

    UNSAFE_componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        const currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
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
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}
                    theme='dark'
                    className='left-menu'
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default connect()(Navleft);