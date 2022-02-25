import React,{Component} from 'react';
import { Row,Col } from 'antd';
import axios from 'axios';
import './index.less';
import Util from '../../utils/utils';
export default class Header extends Component{
    state={
        userName:'钟贞长',
        sysTime:'',
        weather:'',
    };
    UNSAFE_componentWillMount(){
        let{setTime,getWeatherAPIData} = this;

        setTime();
        setInterval(()=>{
            setTime()
        },1000);

        getWeatherAPIData();
        setInterval(()=>{
            getWeatherAPIData()
        },3600000);
        
    }
    setTime = ()=>{
        let sysTime = Util.formateDate(new Date().getTime());
        this.setState({
            sysTime
        })
    }
    getWeatherAPIData = ()=>{
        axios.get("https://devapi.qweather.com/v7/weather/now?key=acb6e33ca23647c6bf6b1d36323754b3&location=101091101")
             .then((res)=>{
                 let result = res.data.now.text;
                 this.setState({
                     weather:result,
                    })
             })
    }
    render(){
        let {userName,sysTime,weather} = this.state;
        return(
            <div className='header'>
                <Row className='header-top'>
                    <Col span='24'>
                        <span>欢迎,{userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span='4' className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span='20' className='weather'>
                        <span className='date'>{sysTime}</span>
                        <span className='weather-detail'>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    };
}