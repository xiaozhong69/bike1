import React, {Component} from 'react';
import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLabel: {
                    fontSize: 14,
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 15,
                    color: 'red'
                }
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    data: [1000, 2000, 1800, 2500, 2700, 1500, 800]
                },
            ]
        };
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLabel: {
                    fontSize: 14
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 15,
                    color: 'red'
                }
            },
            legend: {
                data: ['OFO', '摩拜', '哈罗']
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000],
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                },
                {
                    name: '哈罗',
                    type: 'bar',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                },
            ],
        };
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()} style={{height: 600}}/>
                </Card>
                <Card title="柱形图表之二" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} style={{height: 600}}/>
                </Card>
            </div>
        )
    }
}