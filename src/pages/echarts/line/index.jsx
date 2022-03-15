import React, {Component} from 'react';
import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis:{
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis:{
                type:'value'

            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1800, 2500, 2700, 1500, 800]
                }
            ],
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis:{
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis:{
                type:'value'
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [1000, 2000, 1800, 2500, 2700, 1500, 800]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [2000, 3000, 2800, 3500, 3700, 2500, 1800]
                }
            ],
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis:{
                type:'category',
                boundaryGap:false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis:{
                type:'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1800, 2500, 2700, 1500, 800],
                    areaStyle:{}
                },
            ],
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="折线图表之一">
                    <ReactEcharts option={this.getOption()} style={{height: 400}}/>
                </Card>
                <Card title="折线图表之二">
                    <ReactEcharts option={this.getOption2()} style={{height: 400}}/>
                </Card>
                <Card title="折线图表之三">
                    <ReactEcharts option={this.getOption3()} style={{height: 400}}/>
                </Card>
            </div>
        )
    }
}