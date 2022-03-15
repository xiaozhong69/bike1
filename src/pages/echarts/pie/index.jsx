import React, {Component} from 'react';
import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br>{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 80,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 2000,
                            name: '周二'
                        },
                        {
                            value: 3000,
                            name: '周三'
                        }, {
                            value: 4000,
                            name: '周四'
                        },
                        {
                            value: 5000,
                            name: '周五'
                        },
                        {
                            value: 6000,
                            name: '周六'
                        },
                        {
                            value: 7000,
                            name: '周日'
                        },
                    ],
                }
            ],
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br>{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 80,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius:['50%','70%'],
                    center:['30%','55%'],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 2000,
                            name: '周二'
                        },
                        {
                            value: 3000,
                            name: '周三'
                        }, {
                            value: 4000,
                            name: '周四'
                        },
                        {
                            value: 5000,
                            name: '周五'
                        },
                        {
                            value: 6000,
                            name: '周六'
                        },
                        {
                            value: 7000,
                            name: '周日'
                        },
                    ],
                }
            ],
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br>{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 80,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 2000,
                            name: '周二'
                        },
                        {
                            value: 3000,
                            name: '周三'
                        }, {
                            value: 4000,
                            name: '周四'
                        },
                        {
                            value: 5000,
                            name: '周五'
                        },
                        {
                            value: 6000,
                            name: '周六'
                        },
                        {
                            value: 7000,
                            name: '周日'
                        },
                    ].sort((a,b)=>{
                        return a.value - b.value;
                    }),
                    roseType:'radius'
                }
            ],
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="饼图表之一">
                    <ReactEcharts option={this.getOption()} style={{height: 400}}/>
                </Card>
                <Card title="饼图表之二" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} style={{height: 500}}/>
                </Card>
                <Card title="饼图表之三" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption3()} style={{height: 500}}/>
                </Card>
            </div>
        )
    }
}